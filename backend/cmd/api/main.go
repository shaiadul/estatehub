package main

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/estatehub/backend/config"
	"github.com/estatehub/backend/internal/handler"
	apphttp "github.com/estatehub/backend/internal/handler/http"
	"github.com/estatehub/backend/internal/repository/postgres"
	"github.com/estatehub/backend/internal/repository/redis"
	"github.com/estatehub/backend/internal/service"
	"github.com/estatehub/backend/pkg/jwt"
	"github.com/estatehub/backend/pkg/logger"
	"github.com/estatehub/backend/pkg/oauth"
	"github.com/estatehub/backend/pkg/storage"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		fmt.Printf("failed to load configuration: %v\n", err)
		os.Exit(1)
	}

	logger.Init(cfg.Environment)
	slog.Info("initializing EstateHub Sovereign Real Estate Engine",
		"env", cfg.Environment,
		"port", cfg.Port,
	)

	// Database Connection (Supabase PostgreSQL)
	db, err := postgres.NewDB(cfg.Database, cfg.Environment)
	if err != nil {
		slog.Error("failed to connect to postgres database", "error", err)
		os.Exit(1)
	}
	slog.Info("connected to Supabase PostgreSQL with prepared statements enabled")

	// Redis Cache
	cache := redis.NewCacheService(cfg.Redis)

	// Security & JWT Manager
	tokenManager := jwt.NewTokenManager(
		cfg.JWT.Secret,
		cfg.JWT.AccessExpiry,
		cfg.JWT.RefreshExpiry,
		cfg.JWT.Issuer,
	)

	// S3 / Supabase Storage Presigner
	s3Presigner := storage.NewS3Presigner(
		cfg.Storage.Endpoint,
		cfg.Storage.Region,
		cfg.Storage.Bucket,
		cfg.Storage.AccessKeyID,
		cfg.Storage.SecretAccessKey,
		cfg.Storage.UsePathStyle,
		cfg.Storage.PresignDuration,
	)

	// OAuth2 Service
	oauthService := oauth.NewOAuthService(
		cfg.OAuth.GoogleClientID,
		cfg.OAuth.GoogleClientSecret,
		cfg.OAuth.GoogleRedirectURL,
	)

	// Repositories
	userRepo := postgres.NewUserRepository(db)
	propRepo := postgres.NewPropertyRepository(db)
	tourRepo := postgres.NewTourRepository(db)
	offerRepo := postgres.NewOfferRepository(db)
	vdrRepo := postgres.NewVdrRepository(db)
	closingRepo := postgres.NewClosingRepository(db)
	auditRepo := postgres.NewAuditRepository(db)

	// Services
	authService := service.NewAuthService(userRepo, auditRepo, tokenManager, oauthService)
	propService := service.NewPropertyService(propRepo, cache)
	tourService := service.NewTourService(tourRepo, propRepo)
	offerService := service.NewOfferService(offerRepo, propRepo, closingRepo, auditRepo)
	vdrService := service.NewVdrService(vdrRepo, userRepo, s3Presigner, auditRepo)
	closingService := service.NewClosingService(closingRepo, auditRepo)
	adminService := service.NewAdminService(userRepo, propRepo, closingRepo, auditRepo)
	storageService := service.NewStorageService(s3Presigner)

	// HTTP Handlers
	authHandler := apphttp.NewAuthHandler(authService)
	propHandler := apphttp.NewPropertyHandler(propService)
	tourHandler := apphttp.NewTourHandler(tourService)
	offerHandler := apphttp.NewOfferHandler(offerService)
	vdrHandler := apphttp.NewVdrHandler(vdrService)
	closingHandler := apphttp.NewClosingHandler(closingService)
	adminHandler := apphttp.NewAdminHandler(adminService, userRepo)
	storageHandler := apphttp.NewStorageHandler(storageService)

	// Router Setup
	r := handler.NewRouter(handler.RouterParams{
		AllowedOrigins:  cfg.AllowedOrigins,
		TokenManager:    tokenManager,
		DB:              db,
		AuthHandler:     authHandler,
		PropertyHandler: propHandler,
		TourHandler:     tourHandler,
		OfferHandler:    offerHandler,
		VdrHandler:      vdrHandler,
		ClosingHandler:  closingHandler,
		AdminHandler:    adminHandler,
		StorageHandler:  storageHandler,
	})

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.Port),
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Server runner
	go func() {
		slog.Info("EstateHub API server listening", "addr", server.Addr)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			slog.Error("server listen error", "error", err)
			os.Exit(1)
		}
	}()

	// Graceful Shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	slog.Info("shutting down EstateHub API server gracefully...")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		slog.Error("server forced to shutdown", "error", err)
	}

	slog.Info("EstateHub API server exited properly")
}
