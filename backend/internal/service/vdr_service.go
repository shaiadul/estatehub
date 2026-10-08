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
	Document  *domain.VdrDocument    `json:"document"`
	Presigned *storage.PresignResult `json:"presigned"`
}

func (s *VdrService) ListDocuments(ctx context.Context, propertyID string, category *domain.VdrCategory) ([]domain.VdrDocument, error) {
	return s.repo.ListDocumentsByProperty(ctx, propertyID, category)
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

	if doc.IsRestricted && !user.Accredited {
		return nil, domain.ErrKycRequired
	}

	presigned, err := s.presigner.GenerateDownloadURL(ctx, doc.StorageKey)
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
		Details:   fmt.Sprintf("Downloaded %s (%s)", doc.Title, doc.Sha256),
		IPAddress: ip,
	})

	return &VdrDocumentDownloadResponse{
		Document:  doc,
		Presigned: presigned,
	}, nil
}
