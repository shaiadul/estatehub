package postgres

import (
	"context"
	"errors"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type VdrRepository struct {
	db *gorm.DB
}

func NewVdrRepository(db *gorm.DB) *VdrRepository {
	return &VdrRepository{db: db}
}

func (r *VdrRepository) CreateDocument(ctx context.Context, doc *domain.VdrDocument) error {
	return r.db.WithContext(ctx).Create(doc).Error
}

func (r *VdrRepository) FindDocumentByID(ctx context.Context, id string) (*domain.VdrDocument, error) {
	var doc domain.VdrDocument
	err := r.db.WithContext(ctx).First(&doc, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &doc, nil
}

func (r *VdrRepository) ListDocumentsByProperty(ctx context.Context, propertyID string, category *domain.VdrCategory) ([]domain.VdrDocument, error) {
	var docs []domain.VdrDocument
	q := r.db.WithContext(ctx).Where("property_id = ?", propertyID)
	if category != nil && *category != "all" {
		q = q.Where("category = ?", *category)
	}
	err := q.Order("created_at ASC").Find(&docs).Error
	return docs, err
}

func (r *VdrRepository) DeleteDocument(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&domain.VdrDocument{}, "id = ?", id).Error
}

func (r *VdrRepository) LogAccess(ctx context.Context, log *domain.VdrAccessLog) error {
	return r.db.WithContext(ctx).Create(log).Error
}

func (r *VdrRepository) ListAccessLogs(ctx context.Context, propertyID string, limit int) ([]domain.VdrAccessLog, error) {
	var logs []domain.VdrAccessLog
	if limit <= 0 || limit > 100 {
		limit = 50
	}
	err := r.db.WithContext(ctx).
		Joins("JOIN vdr_documents ON vdr_documents.id = vdr_access_logs.document_id").
		Where("vdr_documents.property_id = ?", propertyID).
		Order("vdr_access_logs.created_at DESC").
		Limit(limit).
		Find(&logs).Error
	return logs, err
}
