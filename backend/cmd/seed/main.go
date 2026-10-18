package main

import (
	"fmt"
	"log/slog"
	"os"

	"github.com/estatehub/backend/config"
	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/repository/postgres"
	"golang.org/x/crypto/bcrypt"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		fmt.Printf("failed to load configuration: %v\n", err)
		os.Exit(1)
	}

	db, err := postgres.NewDB(cfg.Database, cfg.Environment)
	if err != nil {
		slog.Error("failed to connect to postgres database", "error", err)
		os.Exit(1)
	}

	// Generate real bcrypt hash for Password123!
	realHash, err := bcrypt.GenerateFromPassword([]byte("Password123!"), bcrypt.DefaultCost)
	if err != nil {
		slog.Error("failed to generate bcrypt hash", "error", err)
		os.Exit(1)
	}

	seedEmails := []string{
		"admin@estatehub.com",
		"s.jenkins@estatehub.com",
		"rossi.familyoffice@swiss-holdings.ch",
		"sterling@belair-trust.com",
	}

	for _, email := range seedEmails {
		db.Model(&domain.User{}).Where("email = ?", email).Update("password_hash", string(realHash))
	}

	slog.Info("✓ Real BCrypt hash applied for all seed accounts (Password123!)")
}
