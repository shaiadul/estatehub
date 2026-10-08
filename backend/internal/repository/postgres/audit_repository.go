package postgres

import (
	"context"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type AuditRepository struct {
	db *gorm.DB
}

func NewAuditRepository(db *gorm.DB) *AuditRepository {
	return &AuditRepository{db: db}
}

func (r *AuditRepository) Create(ctx context.Context, log *domain.AuditLog) error {
	return r.db.WithContext(ctx).Create(log).Error
}

func (r *AuditRepository) List(ctx context.Context, filter domain.AuditFilter) ([]domain.AuditLog, int64, error) {
	var logs []domain.AuditLog
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.AuditLog{})

	if filter.UserEmail != nil && *filter.UserEmail != "" {
		q = q.Where("user_email ILIKE ?", "%"+*filter.UserEmail+"%")
	}
	if filter.Action != nil && *filter.Action != "" {
		q = q.Where("action = ?", *filter.Action)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 50
	}

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&logs).Error
	if err != nil {
		return nil, 0, err
	}

	return logs, total, nil
}
