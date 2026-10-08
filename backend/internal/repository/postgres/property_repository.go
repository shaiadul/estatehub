package postgres

import (
	"context"
	"errors"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type PropertyRepository struct {
	db *gorm.DB
}

func NewPropertyRepository(db *gorm.DB) *PropertyRepository {
	return &PropertyRepository{db: db}
}

func (r *PropertyRepository) Create(ctx context.Context, property *domain.Property) error {
	return r.db.WithContext(ctx).Create(property).Error
}

func (r *PropertyRepository) FindByID(ctx context.Context, id string) (*domain.Property, error) {
	var prop domain.Property
	err := r.db.WithContext(ctx).Preload("Agent").First(&prop, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &prop, nil
}

func (r *PropertyRepository) FindBySlug(ctx context.Context, slug string) (*domain.Property, error) {
	var prop domain.Property
	err := r.db.WithContext(ctx).Preload("Agent").First(&prop, "LOWER(slug) = LOWER(?)", slug).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &prop, nil
}

func (r *PropertyRepository) Update(ctx context.Context, property *domain.Property) error {
	return r.db.WithContext(ctx).Save(property).Error
}

func (r *PropertyRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&domain.Property{}, "id = ?", id).Error
}

func (r *PropertyRepository) List(ctx context.Context, filter domain.PropertyFilter) ([]domain.Property, int64, error) {
	var properties []domain.Property
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.Property{}).Preload("Agent")

	if filter.ApprovedOnly == nil || *filter.ApprovedOnly {
		q = q.Where("approved = ?", true)
	}
	if filter.FeaturedOnly != nil && *filter.FeaturedOnly {
		q = q.Where("featured = ?", true)
	}
	if filter.PropertyType != "" && filter.PropertyType != "all" {
		q = q.Where("property_type = ?", filter.PropertyType)
	}
	if filter.TransactionType != "" && filter.TransactionType != "all" {
		q = q.Where("transaction_type = ?", filter.TransactionType)
	}
	if filter.MinBeds != nil {
		q = q.Where("beds >= ?", *filter.MinBeds)
	}
	if filter.MinPrice != nil {
		q = q.Where("price >= ?", *filter.MinPrice)
	}
	if filter.MaxPrice != nil {
		q = q.Where("price <= ?", *filter.MaxPrice)
	}
	if filter.City != "" {
		q = q.Where("city ILIKE ?", "%"+filter.City+"%")
	}
	if filter.State != "" {
		q = q.Where("state ILIKE ?", "%"+filter.State+"%")
	}
	if filter.AgentID != nil {
		q = q.Where("agent_id = ?", *filter.AgentID)
	}
	if filter.Query != "" {
		s := "%" + filter.Query + "%"
		q = q.Where("title ILIKE ? OR address ILIKE ? OR city ILIKE ? OR description ILIKE ?", s, s, s, s)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	// Order
	switch filter.SortBy {
	case "price_asc":
		q = q.Order("price ASC")
	case "price_desc":
		q = q.Order("price DESC")
	case "sqft_desc":
		q = q.Order("sqft DESC")
	case "views_desc":
		q = q.Order("views_count DESC")
	default:
		q = q.Order("created_at DESC")
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	err := q.Limit(limit).Offset(filter.Offset).Find(&properties).Error
	if err != nil {
		return nil, 0, err
	}

	return properties, total, nil
}

func (r *PropertyRepository) IncrementViews(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Model(&domain.Property{}).Where("id = ?", id).
		UpdateColumn("views_count", gorm.Expr("views_count + 1")).Error
}

func (r *PropertyRepository) Bookmark(ctx context.Context, userID, propertyID string) error {
	b := UserBookmark{UserID: userID, PropertyID: propertyID}
	return r.db.WithContext(ctx).FirstOrCreate(&b).Error
}

func (r *PropertyRepository) Unbookmark(ctx context.Context, userID, propertyID string) error {
	return r.db.WithContext(ctx).Delete(&UserBookmark{}, "user_id = ? AND property_id = ?", userID, propertyID).Error
}

func (r *PropertyRepository) ListBookmarked(ctx context.Context, userID string) ([]domain.Property, error) {
	var properties []domain.Property
	err := r.db.WithContext(ctx).
		Joins("JOIN user_bookmarks ON user_bookmarks.property_id = properties.id").
		Where("user_bookmarks.user_id = ?", userID).
		Preload("Agent").
		Find(&properties).Error
	return properties, err
}

func (r *PropertyRepository) IsBookmarked(ctx context.Context, userID, propertyID string) (bool, error) {
	var count int64
	err := r.db.WithContext(ctx).Model(&UserBookmark{}).
		Where("user_id = ? AND property_id = ?", userID, propertyID).
		Count(&count).Error
	return count > 0, err
}
