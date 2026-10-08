package storage

import (
	"context"
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	v4 "github.com/aws/aws-sdk-go-v2/aws/signer/v4"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Presigner struct {
	client          *s3.Client
	presignClient   *s3.PresignClient
	bucket          string
	presignDuration time.Duration
}

type PresignResult struct {
	URL       string    `json:"url"`
	Key       string    `json:"key"`
	Bucket    string    `json:"bucket"`
	ExpiresAt time.Time `json:"expires_at"`
	Method    string    `json:"method"`
}

func NewS3Presigner(endpoint, region, bucket, accessKey, secretKey string, usePathStyle bool, duration time.Duration) *S3Presigner {
	customResolver := aws.EndpointResolverWithOptionsFunc(func(service, reg string, options ...interface{}) (aws.Endpoint, error) {
		if endpoint != "" {
			return aws.Endpoint{
				URL:               endpoint,
				SigningRegion:     region,
				HostnameImmutable: usePathStyle,
			}, nil
		}
		return aws.Endpoint{}, &aws.EndpointNotFoundError{}
	})

	cfg := aws.Config{
		Region:                      region,
		Credentials:                 credentials.NewStaticCredentialsProvider(accessKey, secretKey, ""),
		EndpointResolverWithOptions: customResolver,
	}

	client := s3.NewFromConfig(cfg, func(o *s3.Options) {
		o.UsePathStyle = usePathStyle
	})

	presignClient := s3.NewPresignClient(client)

	return &S3Presigner{
		client:          client,
		presignClient:   presignClient,
		bucket:          bucket,
		presignDuration: duration,
	}
}

// GenerateUploadURL creates an authorized PUT presigned URL for direct client browser uploads
func (s *S3Presigner) GenerateUploadURL(ctx context.Context, key, contentType string) (*PresignResult, error) {
	req, err := s.presignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(s.bucket),
		Key:         aws.String(key),
		ContentType: aws.String(contentType),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = s.presignDuration
	})

	if err != nil {
		return nil, fmt.Errorf("failed to presign upload URL: %w", err)
	}

	return &PresignResult{
		URL:       req.URL,
		Key:       key,
		Bucket:    s.bucket,
		ExpiresAt: time.Now().Add(s.presignDuration),
		Method:    "PUT",
	}, nil
}

// GenerateDownloadURL creates an authorized GET presigned URL for secure document/media access
func (s *S3Presigner) GenerateDownloadURL(ctx context.Context, key string) (*PresignResult, error) {
	req, err := s.presignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(key),
	}, func(opts *s3.PresignOptions) {
		opts.Expires = s.presignDuration
	})

	if err != nil {
		return nil, fmt.Errorf("failed to presign download URL: %w", err)
	}

	return &PresignResult{
		URL:       req.URL,
		Key:       key,
		Bucket:    s.bucket,
		ExpiresAt: time.Now().Add(s.presignDuration),
		Method:    "GET",
	}, nil
}

var _ = (*v4.Signer)(nil)
