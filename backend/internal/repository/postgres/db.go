package postgres

import (
	"fmt"
	"time"

	"github.com/estatehub/backend/config"
	"github.com/estatehub/backend/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

type UserBookmark struct {
	UserID     string    `gorm:"primaryKey;type:uuid;index"`
	PropertyID string    `gorm:"primaryKey;type:uuid;index"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}

func NewDB(cfg config.DatabaseConfig, env string) (*gorm.DB, error) {
	logLevel := gormlogger.Warn
	if env == "development" {
		logLevel = gormlogger.Info
	}

	gormCfg := &gorm.Config{
		Logger: gormlogger.Default.LogMode(logLevel),
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
		PrepareStmt: true, // Prepared statements for ultra-fast query execution
	}

	db, err := gorm.Open(postgres.Open(cfg.DSN()), gormCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Supabase PostgreSQL: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to retrieve sql.DB handle: %w", err)
	}

	sqlDB.SetMaxOpenConns(cfg.MaxOpenConns)
	sqlDB.SetMaxIdleConns(cfg.MaxIdleConns)
	sqlDB.SetConnMaxLifetime(cfg.ConnMaxLifetime)

	// Run Schema Migrations
	err = db.AutoMigrate(
		&domain.User{},
		&domain.Property{},
		&domain.TourBooking{},
		&domain.Offer{},
		&domain.VdrDocument{},
		&domain.VdrAccessLog{},
		&domain.ClosingRoom{},
		&domain.AuditLog{},
		&UserBookmark{},
	)
	if err != nil {
		return nil, fmt.Errorf("failed to run GORM auto migrations: %w", err)
	}

	return db, nil
}
