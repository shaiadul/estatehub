package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Config struct {
	Environment string
	Port        int
	AppURL      string

	// Database (Supabase PostgreSQL)
	Database DatabaseConfig

	// Redis Cache
	Redis RedisConfig

	// Security & JWT
	JWT JWTConfig

	// S3 / Supabase Storage Compatible
	Storage StorageConfig

	// OAuth Providers
	OAuth OAuthConfig

	// CORS
	AllowedOrigins []string
}

type DatabaseConfig struct {
	URL             string
	Host            string
	Port            int
	User            string
	Password        string
	DBName          string
	SSLMode         string
	MaxOpenConns    int
	MaxIdleConns    int
	ConnMaxLifetime time.Duration
}

type RedisConfig struct {
	URL         string
	Host        string
	Port        int
	Password    string
	DB          int
	Enabled     bool
	DefaultTTL  time.Duration
}

type JWTConfig struct {
	Secret        string
	AccessExpiry  time.Duration
	RefreshExpiry time.Duration
	Issuer        string
}

type StorageConfig struct {
	Endpoint        string
	Region          string
	Bucket          string
	AccessKeyID     string
	SecretAccessKey string
	UsePathStyle    bool
	PresignDuration time.Duration
}

type OAuthConfig struct {
	GoogleClientID     string
	GoogleClientSecret string
	GoogleRedirectURL  string
}

func Load() (*Config, error) {
	// Attempt to load .env if present (ignore error if not present, e.g. in container)
	_ = godotenv.Load()

	cfg := &Config{
		Environment: getEnv("ENV", "development"),
		Port:        getEnvAsInt("PORT", 8080),
		AppURL:      getEnv("APP_URL", "http://localhost:8080"),
		Database: DatabaseConfig{
			URL:             getEnv("DATABASE_URL", ""),
			Host:            getEnv("DB_HOST", "localhost"),
			Port:            getEnvAsInt("DB_PORT", 5432),
			User:            getEnv("DB_USER", "postgres"),
			Password:        getEnv("DB_PASSWORD", "postgres"),
			DBName:          getEnv("DB_NAME", "estatehub"),
			SSLMode:         getEnv("DB_SSLMODE", "disable"),
			MaxOpenConns:    getEnvAsInt("DB_MAX_OPEN_CONNS", 25),
			MaxIdleConns:    getEnvAsInt("DB_MAX_IDLE_CONNS", 10),
			ConnMaxLifetime: time.Duration(getEnvAsInt("DB_CONN_MAX_LIFETIME_MINS", 60)) * time.Minute,
		},
		Redis: RedisConfig{
			URL:        getEnv("REDIS_URL", ""),
			Host:       getEnv("REDIS_HOST", "localhost"),
			Port:       getEnvAsInt("REDIS_PORT", 6379),
			Password:   getEnv("REDIS_PASSWORD", ""),
			DB:         getEnvAsInt("REDIS_DB", 0),
			Enabled:    getEnvAsBool("REDIS_ENABLED", true),
			DefaultTTL: time.Duration(getEnvAsInt("REDIS_DEFAULT_TTL_MINS", 15)) * time.Minute,
		},
		JWT: JWTConfig{
			Secret:        getEnv("JWT_SECRET", "estatehub-sovereign-master-jwt-secret-key-replace-in-production"),
			AccessExpiry:  time.Duration(getEnvAsInt("JWT_ACCESS_EXPIRY_MINS", 60)) * time.Minute,
			RefreshExpiry: time.Duration(getEnvAsInt("JWT_REFRESH_EXPIRY_DAYS", 7)) * 24 * time.Hour,
			Issuer:        getEnv("JWT_ISSUER", "estatehub-api"),
		},
		Storage: StorageConfig{
			Endpoint:        getEnv("S3_ENDPOINT", "https://s3.us-west-1.amazonaws.com"),
			Region:          getEnv("S3_REGION", "us-west-1"),
			Bucket:          getEnv("S3_BUCKET", "estatehub-vault"),
			AccessKeyID:     getEnv("S3_ACCESS_KEY_ID", ""),
			SecretAccessKey: getEnv("S3_SECRET_ACCESS_KEY", ""),
			UsePathStyle:    getEnvAsBool("S3_USE_PATH_STYLE", false),
			PresignDuration: time.Duration(getEnvAsInt("S3_PRESIGN_DURATION_MINS", 30)) * time.Minute,
		},
		OAuth: OAuthConfig{
			GoogleClientID:     getEnv("GOOGLE_CLIENT_ID", ""),
			GoogleClientSecret: getEnv("GOOGLE_CLIENT_SECRET", ""),
			GoogleRedirectURL:  getEnv("GOOGLE_REDIRECT_URL", "http://localhost:3000/api/auth/callback/google"),
		},
		AllowedOrigins: parseList(getEnv("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")),
	}

	return cfg, nil
}

func (c *DatabaseConfig) DSN() string {
	if c.URL != "" {
		return c.URL
	}
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		c.Host, c.Port, c.User, c.Password, c.DBName, c.SSLMode)
}

func getEnv(key, defaultVal string) string {
	if val, ok := os.LookupEnv(key); ok && val != "" {
		return val
	}
	return defaultVal
}

func getEnvAsInt(key string, defaultVal int) int {
	if valStr, ok := os.LookupEnv(key); ok {
		if val, err := strconv.Atoi(valStr); err == nil {
			return val
		}
	}
	return defaultVal
}

func getEnvAsBool(key string, defaultVal bool) bool {
	if valStr, ok := os.LookupEnv(key); ok {
		if val, err := strconv.ParseBool(valStr); err == nil {
			return val
		}
	}
	return defaultVal
}

func parseList(s string) []string {
	parts := strings.Split(s, ",")
	res := make([]string, 0, len(parts))
	for _, p := range parts {
		clean := strings.TrimSpace(p)
		if clean != "" {
			res = append(res, clean)
		}
	}
	return res
}
