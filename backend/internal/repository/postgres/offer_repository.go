package postgres

import (
	"context"
	"errors"
	"strings"

	"github.com/estatehub/backend/internal/domain"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type OfferRepository struct {
	db *gorm.DB
}

func NewOfferRepository(db *gorm.DB) *OfferRepository {
	return &OfferRepository{db: db}
}

func populateOffer(o *domain.Offer) {
	if o == nil {
		return
	}
	if o.ContingencyDays == 0 && o.ContingencyPeriodDays > 0 {
		o.ContingencyDays = o.ContingencyPeriodDays
	}
	if o.ContingencyPeriodDays == 0 && o.ContingencyDays > 0 {
		o.ContingencyPeriodDays = o.ContingencyDays
	}
	if o.Notes == "" && o.Note != "" {
		o.Notes = o.Note
	}
	if o.Note == "" && o.Notes != "" {
		o.Note = o.Notes
	}
	if o.ID == "" {
		o.ID = uuid.NewString()
	}
	if o.LoiNumber == "" {
		if len(o.ID) >= 8 {
			o.LoiNumber = "LOI-" + strings.ToUpper(o.ID[:8])
		} else {
			o.LoiNumber = "LOI-" + strings.ToUpper(uuid.NewString()[:8])
		}
	}
}

func (r *OfferRepository) Create(ctx context.Context, offer *domain.Offer) error {
	populateOffer(offer)
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
	populateOffer(&offer)
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
	populateOffer(&offer)
	return &offer, nil
}

func (r *OfferRepository) Update(ctx context.Context, offer *domain.Offer) error {
	populateOffer(offer)
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
	if filter.Status != nil && *filter.Status != "" {
		st := strings.ToLower(string(*filter.Status))
		q = q.Where("LOWER(status) = ?", st)
	}
	if filter.FinancingType != nil && *filter.FinancingType != "" {
		q = q.Where("LOWER(financing_type) = ?", strings.ToLower(*filter.FinancingType))
	}
	if filter.MinAmount != nil {
		q = q.Where("offer_amount >= ?", *filter.MinAmount)
	}
	if filter.MaxAmount != nil {
		q = q.Where("offer_amount <= ?", *filter.MaxAmount)
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

	for i := range offers {
		populateOffer(&offers[i])
	}

	return offers, total, nil
}
