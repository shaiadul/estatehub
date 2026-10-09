package postgres

import (
	"context"
	"errors"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type OfferRepository struct {
	db *gorm.DB
}

func NewOfferRepository(db *gorm.DB) *OfferRepository {
	return &OfferRepository{db: db}
}

func (r *OfferRepository) Create(ctx context.Context, offer *domain.Offer) error {
	return r.db.WithContext(ctx).Create(offer).Error
}

func (r *OfferRepository) FindByID(ctx context.Context, id string) (*domain.Offer, error) {
	var offer domain.Offer
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").First(&offer, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &offer, nil
}

func (r *OfferRepository) FindByLoiNumber(ctx context.Context, number string) (*domain.Offer, error) {
	var offer domain.Offer
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").First(&offer, "loi_number = ?", number).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &offer, nil
}

func (r *OfferRepository) Update(ctx context.Context, offer *domain.Offer) error {
	return r.db.WithContext(ctx).Save(offer).Error
}

func (r *OfferRepository) List(ctx context.Context, filter domain.OfferFilter) ([]domain.Offer, int64, error) {
	var offers []domain.Offer
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.Offer{}).Preload("Property").Preload("Buyer")

	if filter.BuyerID != nil {
		q = q.Where("buyer_id = ?", *filter.BuyerID)
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

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&offers).Error
	if err != nil {
		return nil, 0, err
	}

	return offers, total, nil
}
