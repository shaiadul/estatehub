package jwt

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var (
	ErrInvalidToken = errors.New("invalid or expired authentication token")
	ErrExpiredToken = errors.New("authentication token has expired")
)

type Claims struct {
	UserID     string `json:"user_id"`
	Email      string `json:"email"`
	Role       string `json:"role"`
	Accredited bool   `json:"accredited"`
	TokenType  string `json:"token_type"` // "access" or "refresh"
	jwt.RegisteredClaims
}

type TokenPair struct {
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
	Role         string    `json:"role"`
	UserID       string    `json:"user_id"`
}

type TokenManager struct {
	secret        []byte
	accessExpiry  time.Duration
	refreshExpiry time.Duration
	issuer        string
}

func NewTokenManager(secret string, accessExpiry, refreshExpiry time.Duration, issuer string) *TokenManager {
	return &TokenManager{
		secret:        []byte(secret),
		accessExpiry:  accessExpiry,
		refreshExpiry: refreshExpiry,
		issuer:        issuer,
	}
}

func (m *TokenManager) GeneratePair(userID, email, role string, accredited bool) (*TokenPair, error) {
	now := time.Now()
	accessExp := now.Add(m.accessExpiry)
	refreshExp := now.Add(m.refreshExpiry)

	accessClaims := &Claims{
		UserID:     userID,
		Email:      email,
		Role:       role,
		Accredited: accredited,
		TokenType:  "access",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(accessExp),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			Issuer:    m.issuer,
			Subject:   userID,
		},
	}

	accessToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims).SignedString(m.secret)
	if err != nil {
		return nil, err
	}

	refreshClaims := &Claims{
		UserID:     userID,
		Email:      email,
		Role:       role,
		Accredited: accredited,
		TokenType:  "refresh",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(refreshExp),
			IssuedAt:  jwt.NewNumericDate(now),
			NotBefore: jwt.NewNumericDate(now),
			Issuer:    m.issuer,
			Subject:   userID,
		},
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString(m.secret)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		ExpiresAt:    accessExp,
		Role:         role,
		UserID:       userID,
	}, nil
}

func (m *TokenManager) ValidateToken(tokenStr string) (*Claims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrInvalidToken
		}
		return m.secret, nil
	})

	if err != nil {
		if errors.Is(err, jwt.ErrTokenExpired) {
			return nil, ErrExpiredToken
		}
		return nil, ErrInvalidToken
	}

	claims, ok := token.Claims.(*Claims)
	if !ok || !token.Valid {
		return nil, ErrInvalidToken
	}

	return claims, nil
}
