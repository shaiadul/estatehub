package service

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strings"
	"time"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/repository/redis"
)

type PropertyService struct {
	repo  domain.PropertyRepository
	cache *redis.CacheService
}

func NewPropertyService(repo domain.PropertyRepository, cache *redis.CacheService) *PropertyService {
	return &PropertyService{
		repo:  repo,
		cache: cache,
	}
}

type PropertyListResponse struct {
	Properties []domain.Property `json:"properties"`
	Total      int64             `json:"total"`
	Cached     bool              `json:"cached"`
}

func (s *PropertyService) ListProperties(ctx context.Context, filter domain.PropertyFilter) (*PropertyListResponse, error) {
	// Generate cache key
	cacheKey := s.buildCacheKey(filter)
	var cached PropertyListResponse
	if s.cache.Get(ctx, cacheKey, &cached) {
		cached.Cached = true
		return &cached, nil
	}

	properties, total, err := s.repo.List(ctx, filter)
	if err != nil {
		return nil, err
	}

	resp := PropertyListResponse{
		Properties: properties,
		Total:      total,
		Cached:     false,
	}

	// Cache results for 10 minutes
	_ = s.cache.Set(ctx, cacheKey, resp, 10*time.Minute)

	return &resp, nil
}

func (s *PropertyService) GetBySlug(ctx context.Context, slug string) (*domain.Property, error) {
	cacheKey := fmt.Sprintf("property:slug:%s", strings.ToLower(slug))
	var prop domain.Property
	if s.cache.Get(ctx, cacheKey, &prop) {
		return &prop, nil
	}

	p, err := s.repo.FindBySlug(ctx, slug)
	if err != nil {
		return nil, err
	}

	_ = s.cache.Set(ctx, cacheKey, p, 15*time.Minute)
	return p, nil
}

func (s *PropertyService) GetByID(ctx context.Context, id string) (*domain.Property, error) {
	cacheKey := fmt.Sprintf("property:id:%s", id)
	var prop domain.Property
	if s.cache.Get(ctx, cacheKey, &prop) {
		return &prop, nil
	}

	p, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	_ = s.cache.Set(ctx, cacheKey, p, 15*time.Minute)
	return p, nil
}

func (s *PropertyService) Create(ctx context.Context, prop *domain.Property) error {
	if prop.Slug == "" {
		prop.Slug = strings.ToLower(strings.ReplaceAll(prop.Title, " ", "-"))
	}
	if err := s.repo.Create(ctx, prop); err != nil {
		return err
	}
	_ = s.cache.InvalidatePrefix(ctx, "properties:list:")
	return nil
}

func (s *PropertyService) Update(ctx context.Context, prop *domain.Property) error {
	if err := s.repo.Update(ctx, prop); err != nil {
		return err
	}
	_ = s.cache.InvalidatePrefix(ctx, "properties:list:")
	_ = s.cache.Delete(ctx, fmt.Sprintf("property:id:%s", prop.ID))
	_ = s.cache.Delete(ctx, fmt.Sprintf("property:slug:%s", strings.ToLower(prop.Slug)))
	return nil
}

func (s *PropertyService) Delete(ctx context.Context, id string) error {
	p, _ := s.repo.FindByID(ctx, id)
	if err := s.repo.Delete(ctx, id); err != nil {
		return err
	}
	_ = s.cache.InvalidatePrefix(ctx, "properties:list:")
	_ = s.cache.Delete(ctx, fmt.Sprintf("property:id:%s", id))
	if p != nil {
		_ = s.cache.Delete(ctx, fmt.Sprintf("property:slug:%s", strings.ToLower(p.Slug)))
	}
	return nil
}

func (s *PropertyService) ToggleBookmark(ctx context.Context, userID, propertyID string) (bool, error) {
	isBookmarked, err := s.repo.IsBookmarked(ctx, userID, propertyID)
	if err != nil {
		return false, err
	}

	if isBookmarked {
		if err := s.repo.Unbookmark(ctx, userID, propertyID); err != nil {
			return false, err
		}
		return false, nil
	}

	if err := s.repo.Bookmark(ctx, userID, propertyID); err != nil {
		return false, err
	}
	return true, nil
}

func (s *PropertyService) GetBookmarked(ctx context.Context, userID string) ([]domain.Property, error) {
	return s.repo.ListBookmarked(ctx, userID)
}

func (s *PropertyService) buildCacheKey(f domain.PropertyFilter) string {
	raw := fmt.Sprintf("%s|%s|%s|%s|%s|%v|%v|%v|%s|%d|%d",
		f.Query, f.City, f.PropertyType, f.TransactionType, f.SortBy,
		f.MinBeds, f.MinPrice, f.MaxPrice,
		strings.Join(f.Amenities, ","),
		f.Limit, f.Offset,
	)
	h := sha256.Sum256([]byte(raw))
	return "properties:list:" + hex.EncodeToString(h[:8])
}
