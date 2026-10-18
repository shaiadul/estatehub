package postgres

import (
	"fmt"
	"log"
	"os"
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

	customLogger := gormlogger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		gormlogger.Config{
			SlowThreshold:             2 * time.Second, // WAN latency threshold
			LogLevel:                  logLevel,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	gormCfg := &gorm.Config{
		Logger: customLogger,
		NowFunc: func() time.Time {
			return time.Now().UTC()
		},
		PrepareStmt: false, // Must be false for PgBouncer / Supabase transaction pooler
	}

	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  cfg.DSN(),
		PreferSimpleProtocol: true, // Disables prepared statements in pgx for PgBouncer pooler
	}), gormCfg)
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

	// Run Schema Migrations quietly (silence catalog inspection queries during startup)
	migrationDB := db.Session(&gorm.Session{
		Logger: customLogger.LogMode(gormlogger.Silent),
	})
	err = migrationDB.AutoMigrate(
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
