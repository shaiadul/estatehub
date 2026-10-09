package service

import (
	"context"
	"fmt"
	"path/filepath"
	"strings"
	"time"

	"github.com/estatehub/backend/pkg/storage"
	"github.com/google/uuid"
)

type StorageService struct {
	presigner *storage.S3Presigner
}

func NewStorageService(presigner *storage.S3Presigner) *StorageService {
	return &StorageService{presigner: presigner}
}

type PresignUploadRequest struct {
	Folder      string `json:"folder"` // e.g. "properties", "vdr", "avatars", "proof-of-funds"
	Filename    string `json:"filename"`
	ContentType string `json:"content_type"`
}

func (s *StorageService) GenerateUploadPresign(ctx context.Context, req PresignUploadRequest) (*storage.PresignResult, error) {
	ext := filepath.Ext(req.Filename)
	if ext == "" {
		ext = ".bin"
	}

	folder := strings.Trim(req.Folder, "/")
	if folder == "" {
		folder = "uploads"
	}

	key := fmt.Sprintf("%s/%s/%s%s", folder, time.Now().Format("2006/01"), uuid.NewString(), ext)
	return s.presigner.GenerateUploadURL(ctx, key, req.ContentType)
}

func (s *StorageService) GenerateDownloadPresign(ctx context.Context, key string) (*storage.PresignResult, error) {
	return s.presigner.GenerateDownloadURL(ctx, key)
}
