package postgres

import (
	"context"
	"errors"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type ClosingRepository struct {
	db *gorm.DB
}

func NewClosingRepository(db *gorm.DB) *ClosingRepository {
	return &ClosingRepository{db: db}
}

func (r *ClosingRepository) Create(ctx context.Context, room *domain.ClosingRoom) error {
	return r.db.WithContext(ctx).Create(room).Error
}

func (r *ClosingRepository) FindByID(ctx context.Context, id string) (*domain.ClosingRoom, error) {
	var room domain.ClosingRoom
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").Preload("Seller").First(&room, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &room, nil
}

func (r *ClosingRepository) FindByContractNumber(ctx context.Context, contractNum string) (*domain.ClosingRoom, error) {
	var room domain.ClosingRoom
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").Preload("Seller").First(&room, "contract_number = ?", contractNum).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &room, nil
}

func (r *ClosingRepository) Update(ctx context.Context, room *domain.ClosingRoom) error {
	return r.db.WithContext(ctx).Save(room).Error
}

func (r *ClosingRepository) List(ctx context.Context, filter domain.ClosingFilter) ([]domain.ClosingRoom, int64, error) {
	var rooms []domain.ClosingRoom
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.ClosingRoom{}).Preload("Property").Preload("Buyer").Preload("Seller")

	if filter.UserID != nil {
		q = q.Where("buyer_id = ? OR seller_id = ?", *filter.UserID, *filter.UserID)
	}
	if filter.PropertyID != nil {
		q = q.Where("property_id = ?", *filter.PropertyID)
	}
	if filter.Status != nil {
		q = q.Where("status = ?", *filter.Status)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&rooms).Error
	if err != nil {
		return nil, 0, err
	}

	return rooms, total, nil
}
