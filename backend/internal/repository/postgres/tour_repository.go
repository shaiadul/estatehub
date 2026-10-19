package postgres

import (
	"context"
	"errors"
	"strings"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type TourRepository struct {
	db *gorm.DB
}

func NewTourRepository(db *gorm.DB) *TourRepository {
	return &TourRepository{db: db}
}

func populateTour(tour *domain.TourBooking) {
	if tour == nil {
		return
	}
	if tour.VisitorName == "" && tour.ClientName != "" {
		tour.VisitorName = tour.ClientName
	}
	if tour.ClientName == "" && tour.VisitorName != "" {
		tour.ClientName = tour.VisitorName
	}
	if tour.SpecialRequests == "" && tour.Notes != "" {
		tour.SpecialRequests = tour.Notes
	}
}

func (r *TourRepository) Create(ctx context.Context, tour *domain.TourBooking) error {
	populateTour(tour)
	return r.db.WithContext(ctx).Create(tour).Error
}

func (r *TourRepository) FindByID(ctx context.Context, id string) (*domain.TourBooking, error) {
	var tour domain.TourBooking
	err := r.db.WithContext(ctx).Preload("Property").Preload("User").First(&tour, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	populateTour(&tour)
	return &tour, nil
}

func (r *TourRepository) Update(ctx context.Context, tour *domain.TourBooking) error {
	populateTour(tour)
	return r.db.WithContext(ctx).Save(tour).Error
}

func (r *TourRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&domain.TourBooking{}, "id = ?", id).Error
}

func (r *TourRepository) List(ctx context.Context, filter domain.TourFilter) ([]domain.TourBooking, int64, error) {
	var tours []domain.TourBooking
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.TourBooking{}).Preload("Property").Preload("User")

	if filter.UserID != nil {
		q = q.Where("user_id = ?", *filter.UserID)
	}
	if filter.PropertyID != nil {
		q = q.Where("property_id = ?", *filter.PropertyID)
	}
	if filter.Status != nil && *filter.Status != "" {
		st := strings.ToLower(string(*filter.Status))
		q = q.Where("LOWER(status) = ?", st)
	}
	if filter.TourType != nil && *filter.TourType != "" {
		q = q.Where("tour_type = ?", *filter.TourType)
	}
	if filter.Date != nil && *filter.Date != "" {
		q = q.Where("date = ?", *filter.Date)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&tours).Error
	if err != nil {
		return nil, 0, err
	}

	for i := range tours {
		populateTour(&tours[i])
	}

	return tours, total, nil
}
