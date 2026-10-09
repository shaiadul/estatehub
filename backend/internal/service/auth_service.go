package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/pkg/jwt"
	"github.com/estatehub/backend/pkg/oauth"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo     domain.UserRepository
	auditRepo    domain.AuditRepository
	tokenManager *jwt.TokenManager
	oauthService *oauth.OAuthService
}

func NewAuthService(
	userRepo domain.UserRepository,
	auditRepo domain.AuditRepository,
	tokenManager *jwt.TokenManager,
	oauthService *oauth.OAuthService,
) *AuthService {
	return &AuthService{
		userRepo:     userRepo,
		auditRepo:    auditRepo,
		tokenManager: tokenManager,
		oauthService: oauthService,
	}
}

type RegisterRequest struct {
	Email        string          `json:"email"`
	Password     string          `json:"password"`
	FullName     string          `json:"full_name"`
	Role         domain.UserRole `json:"role"`
	Title        string          `json:"title"`
	EntityName   string          `json:"entity_name"`
	Phone        string          `json:"phone"`
	NetWorthTier string          `json:"net_worth_tier"`
	Jurisdiction string          `json:"jurisdiction"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthResponse struct {
	User   *domain.User   `json:"user"`
	Tokens *jwt.TokenPair `json:"tokens"`
}

func (s *AuthService) Register(ctx context.Context, req RegisterRequest) (*AuthResponse, error) {
	if req.Email == "" || req.Password == "" || req.FullName == "" {
		return nil, domain.ErrInvalidInput
	}

	existing, _ := s.userRepo.FindByEmail(ctx, req.Email)
	if existing != nil {
		return nil, errors.New("an account with this email address already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %w", err)
	}

	role := req.Role
	if role == "" {
		role = domain.RoleBuyer
	}

	// Institutional sellers and brokers can be pre-authorized in demo mode or set to pending
	kycStatus := domain.KYCStatusPending
	accredited := false
	if req.NetWorthTier != "" {
		kycStatus = domain.KYCStatusVerified
		accredited = true
	}

	user := &domain.User{
		Email:        req.Email,
		PasswordHash: string(hashedPassword),
		FullName:     req.FullName,
		Role:         role,
		Title:        req.Title,
		EntityName:   req.EntityName,
		Phone:        req.Phone,
		KYCStatus:    kycStatus,
		Accredited:   accredited,
		NetWorthTier: req.NetWorthTier,
		Jurisdiction: req.Jurisdiction,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	tokens, err := s.tokenManager.GeneratePair(user.ID, user.Email, string(user.Role), user.Accredited)
	if err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:    &user.ID,
		UserEmail: user.Email,
		Action:    "USER_REGISTERED",
		Resource:  "auth",
		Details:   fmt.Sprintf("Registered new account with role %s", user.Role),
	})

	return &AuthResponse{User: user, Tokens: tokens}, nil
}

func (s *AuthService) Login(ctx context.Context, req LoginRequest, ip, ua string) (*AuthResponse, error) {
	user, err := s.userRepo.FindByEmail(ctx, req.Email)
	if err != nil {
		return nil, domain.ErrInvalidCredentials
	}

	if user.IsFrozen {
		return nil, errors.New("account is temporarily frozen under master governance policy")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		return nil, domain.ErrInvalidCredentials
	}

	now := time.Now()
	user.LastLoginAt = &now
	_ = s.userRepo.Update(ctx, user)

	tokens, err := s.tokenManager.GeneratePair(user.ID, user.Email, string(user.Role), user.Accredited)
	if err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:    &user.ID,
		UserEmail: user.Email,
		Action:    "USER_LOGIN",
		Resource:  "auth",
		IPAddress: ip,
		UserAgent: ua,
	})

	return &AuthResponse{User: user, Tokens: tokens}, nil
}

func (s *AuthService) RefreshToken(ctx context.Context, refreshToken string) (*jwt.TokenPair, error) {
	claims, err := s.tokenManager.ValidateToken(refreshToken)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}

	if claims.TokenType != "refresh" {
		return nil, errors.New("provided token is not a valid refresh token")
	}

	user, err := s.userRepo.FindByID(ctx, claims.UserID)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}

	if user.IsFrozen {
		return nil, errors.New("account is frozen")
	}

	return s.tokenManager.GeneratePair(user.ID, user.Email, string(user.Role), user.Accredited)
}

func (s *AuthService) GoogleOAuthLogin(ctx context.Context, code string, defaultRole domain.UserRole) (*AuthResponse, error) {
	gUser, err := s.oauthService.ExchangeCode(ctx, code)
	if err != nil {
		return nil, fmt.Errorf("oauth exchange failed: %w", err)
	}

	user, err := s.userRepo.FindByEmail(ctx, gUser.Email)
	if err != nil {
		if errors.Is(err, domain.ErrNotFound) {
			// Auto create account
			role := defaultRole
			if role == "" {
				role = domain.RoleBuyer
			}
			user = &domain.User{
				Email:        gUser.Email,
				PasswordHash: "OAUTH_EXTERNAL_MANAGED",
				FullName:     gUser.Name,
				AvatarURL:    gUser.Picture,
				Role:         role,
				KYCStatus:    domain.KYCStatusVerified,
				Accredited:   true,
			}
			if err := s.userRepo.Create(ctx, user); err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	tokens, err := s.tokenManager.GeneratePair(user.ID, user.Email, string(user.Role), user.Accredited)
	if err != nil {
		return nil, err
	}

	return &AuthResponse{User: user, Tokens: tokens}, nil
}

func (s *AuthService) GetProfile(ctx context.Context, userID string) (*domain.User, error) {
	return s.userRepo.FindByID(ctx, userID)
}
