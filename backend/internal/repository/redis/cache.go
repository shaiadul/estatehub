package redis

import (
	"context"
	"encoding/json"
	"fmt"
	"log/slog"
	"time"

	"github.com/estatehub/backend/config"
	"github.com/redis/go-redis/v9"
)

type CacheService struct {
	client     *redis.Client
	enabled    bool
	defaultTTL time.Duration
}

func NewCacheService(cfg config.RedisConfig) *CacheService {
	if !cfg.Enabled {
		slog.Info("redis cache disabled by configuration")
		return &CacheService{enabled: false}
	}

	var opt *redis.Options
	if cfg.URL != "" {
		parsedOpt, err := redis.ParseURL(cfg.URL)
		if err == nil {
			opt = parsedOpt
		}
	}

	if opt == nil {
		opt = &redis.Options{
			Addr:     fmt.Sprintf("%s:%d", cfg.Host, cfg.Port),
			Password: cfg.Password,
			DB:       cfg.DB,
		}
	}

	client := redis.NewClient(opt)
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel()

	if err := client.Ping(ctx).Err(); err != nil {
		slog.Warn("redis ping failed, cache will run in bypass mode", "error", err)
		return &CacheService{
			client:     client,
			enabled:    false,
			defaultTTL: cfg.DefaultTTL,
		}
	}

	slog.Info("connected to redis cache successfully", "addr", opt.Addr)
	return &CacheService{
		client:     client,
		enabled:    true,
		defaultTTL: cfg.DefaultTTL,
	}
}

func (c *CacheService) IsEnabled() bool {
	return c.enabled && c.client != nil
}

func (c *CacheService) Get(ctx context.Context, key string, dest interface{}) bool {
	if !c.IsEnabled() {
		return false
	}

	val, err := c.client.Get(ctx, key).Bytes()
	if err != nil {
		return false
	}

	if err := json.Unmarshal(val, dest); err != nil {
		return false
	}

	return true
}

func (c *CacheService) Set(ctx context.Context, key string, val interface{}, ttl time.Duration) error {
	if !c.IsEnabled() {
		return nil
	}

	if ttl <= 0 {
		ttl = c.defaultTTL
	}

	bytes, err := json.Marshal(val)
	if err != nil {
		return err
	}

	return c.client.Set(ctx, key, bytes, ttl).Err()
}

func (c *CacheService) Delete(ctx context.Context, key string) error {
	if !c.IsEnabled() {
		return nil
	}
	return c.client.Del(ctx, key).Err()
}

func (c *CacheService) InvalidatePrefix(ctx context.Context, prefix string) error {
	if !c.IsEnabled() {
		return nil
	}

	iter := c.client.Scan(ctx, 0, prefix+"*", 0).Iterator()
	for iter.Next(ctx) {
		_ = c.client.Del(ctx, iter.Val()).Err()
	}

	return iter.Err()
}
