package service

import (
	"context"
	"fmt"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/pkg/storage"
)

type VdrService struct {
	repo      domain.VdrRepository
	userRepo  domain.UserRepository
	presigner *storage.S3Presigner
	auditRepo domain.AuditRepository
}

func NewVdrService(
	repo domain.VdrRepository,
	userRepo domain.UserRepository,
	presigner *storage.S3Presigner,
	auditRepo domain.AuditRepository,
) *VdrService {
	return &VdrService{
		repo:      repo,
		userRepo:  userRepo,
		presigner: presigner,
		auditRepo: auditRepo,
	}
}

type VdrDocumentDownloadResponse struct {
	DownloadURL string                 `json:"download_url"`
	ExpiresIn   int64                  `json:"expires_in"`
	Document    *domain.VdrDocument    `json:"document"`
	Presigned   *storage.PresignResult `json:"presigned"`
}

func (s *VdrService) ListDocuments(ctx context.Context, propertyID string, filter domain.VdrFilter) ([]domain.VdrDocument, error) {
	return s.repo.ListDocumentsByProperty(ctx, propertyID, filter)
}

func (s *VdrService) CreateDocument(ctx context.Context, uploaderID string, doc *domain.VdrDocument) (*domain.VdrDocument, error) {
	doc.UploadedBy = uploaderID
	if doc.FileType == "" {
		doc.FileType = "application/pdf"
	}
	if doc.Classification == "" {
		doc.Classification = "restricted"
	}
	if doc.Sha256Checksum == "" {
		doc.Sha256Checksum = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	}
	if err := s.repo.CreateDocument(ctx, doc); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:   &uploaderID,
		Action:   "VDR_DOCUMENT_UPLOADED",
		Resource: fmt.Sprintf("vdr_doc:%s", doc.ID),
		Details:  fmt.Sprintf("Uploaded VDR document %s (%s)", doc.Title, doc.Category),
	})

	return doc, nil
}

func (s *VdrService) DeleteDocument(ctx context.Context, docID string) error {
	return s.repo.DeleteDocument(ctx, docID)
}

func (s *VdrService) ListAccessLogs(ctx context.Context, propertyID string, limit int) ([]domain.VdrAccessLog, error) {
	return s.repo.ListAccessLogs(ctx, propertyID, limit)
}

func (s *VdrService) GetDownloadURL(ctx context.Context, docID, userID, ip, ua string) (*VdrDocumentDownloadResponse, error) {
	doc, err := s.repo.FindDocumentByID(ctx, docID)
	if err != nil {
		return nil, domain.ErrNotFound
	}

	user, err := s.userRepo.FindByID(ctx, userID)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}

	if (doc.Classification == "restricted" || doc.Classification == "confidential") && !user.Accredited && user.Role != domain.RoleAdmin && user.Role != domain.RoleBroker {
		return nil, domain.ErrKycRequired
	}

	presigned, err := s.presigner.GenerateDownloadURL(ctx, doc.FileKey)
	if err != nil {
		return nil, fmt.Errorf("failed to generate secure presigned URL: %w", err)
	}

	_ = s.repo.LogAccess(ctx, &domain.VdrAccessLog{
		DocumentID: doc.ID,
		UserID:     userID,
		Action:     "download",
		IPAddress:  ip,
		UserAgent:  ua,
	})

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:    &userID,
		UserEmail: user.Email,
		Action:    "VDR_DOWNLOAD",
		Resource:  fmt.Sprintf("vdr_doc:%s", doc.ID),
		Details:   fmt.Sprintf("Downloaded %s (%s)", doc.Title, doc.Sha256Checksum),
		IPAddress: ip,
	})

	return &VdrDocumentDownloadResponse{
		DownloadURL: presigned.URL,
		ExpiresIn:   presigned.ExpiresIn,
		Document:    doc,
		Presigned:   presigned,
	}, nil
}
