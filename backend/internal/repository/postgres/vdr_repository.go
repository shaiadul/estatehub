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

func populateVdrDoc(doc *domain.VdrDocument) {
	if doc == nil {
		return
	}
	if doc.FileKey == "" && doc.StorageKey != "" {
		doc.FileKey = doc.StorageKey
	}
	doc.StorageKey = doc.FileKey
	doc.Sha256 = doc.Sha256Checksum
	if doc.FileSizeBytes > 0 && doc.SizeMB == 0 {
		doc.SizeMB = float64(doc.FileSizeBytes) / (1024 * 1024)
	} else if doc.SizeMB > 0 && doc.FileSizeBytes == 0 {
		doc.FileSizeBytes = int64(doc.SizeMB * 1024 * 1024)
	}
	if doc.Classification == "restricted" || doc.Classification == "confidential" {
		doc.IsRestricted = true
	}
}

func (r *VdrRepository) CreateDocument(ctx context.Context, doc *domain.VdrDocument) error {
	populateVdrDoc(doc)
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
	populateVdrDoc(&doc)
	return &doc, nil
}

func (r *VdrRepository) ListDocumentsByProperty(ctx context.Context, propertyID string, filter domain.VdrFilter) ([]domain.VdrDocument, error) {
	var docs []domain.VdrDocument
	q := r.db.WithContext(ctx).Where("property_id = ?", propertyID)

	if filter.Category != nil && *filter.Category != "" && *filter.Category != "all" {
		q = q.Where("category = ?", *filter.Category)
	}
	if filter.Classification != nil && *filter.Classification != "" && *filter.Classification != "all" {
		q = q.Where("classification = ?", *filter.Classification)
	}
	if filter.Search != "" {
		q = q.Where("title ILIKE ?", "%"+filter.Search+"%")
	}

	switch filter.SortBy {
	case "title_asc":
		q = q.Order("title ASC")
	case "date_desc":
		q = q.Order("created_at DESC")
	case "size_desc":
		q = q.Order("file_size_bytes DESC")
	default:
		q = q.Order("created_at ASC")
	}

	if filter.Limit > 0 {
		q = q.Limit(filter.Limit).Offset(filter.Offset)
	}

	err := q.Find(&docs).Error
	if err != nil {
		return nil, err
	}

	for i := range docs {
		populateVdrDoc(&docs[i])
	}

	return docs, nil
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
