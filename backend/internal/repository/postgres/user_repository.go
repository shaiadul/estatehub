package postgres

import (
	"context"
	"errors"

	"github.com/estatehub/backend/internal/domain"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(ctx context.Context, user *domain.User) error {
	return r.db.WithContext(ctx).Create(user).Error
}

func (r *UserRepository) FindByID(ctx context.Context, id string) (*domain.User, error) {
	var user domain.User
	err := r.db.WithContext(ctx).First(&user, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (*domain.User, error) {
	var user domain.User
	err := r.db.WithContext(ctx).First(&user, "LOWER(email) = LOWER(?)", email).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) Update(ctx context.Context, user *domain.User) error {
	return r.db.WithContext(ctx).Save(user).Error
}

func (r *UserRepository) Delete(ctx context.Context, id string) error {
	return r.db.WithContext(ctx).Delete(&domain.User{}, "id = ?", id).Error
}

func (r *UserRepository) List(ctx context.Context, filter domain.UserFilter) ([]domain.User, int64, error) {
	var users []domain.User
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.User{})

	if filter.Role != nil {
		q = q.Where("role = ?", *filter.Role)
	}
	if filter.KYCStatus != nil {
		q = q.Where("kyc_status = ?", *filter.KYCStatus)
	}
	if filter.Accredited != nil {
		q = q.Where("accredited = ?", *filter.Accredited)
	}
	if filter.Search != "" {
		s := "%" + filter.Search + "%"
		q = q.Where("full_name ILIKE ? OR email ILIKE ? OR entity_name ILIKE ?", s, s, s)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&users).Error
	if err != nil {
		return nil, 0, err
	}

	return users, total, nil
}

func (r *UserRepository) CountByRole(ctx context.Context) (map[domain.UserRole]int64, error) {
	type result struct {
		Role  domain.UserRole
		Count int64
	}
	var res []result
	err := r.db.WithContext(ctx).Model(&domain.User{}).Select("role, count(*) as count").Group("role").Scan(&res).Error
	if err != nil {
		return nil, err
	}

	counts := make(map[domain.UserRole]int64)
	for _, r := range res {
		counts[r.Role] = r.Count
	}
	return counts, nil
}
