package http

import (
	"context"
	"net/http"
	"strings"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/pkg/jwt"
)

type contextKey string

const (
	UserClaimsKey contextKey = "user_claims"
	UserIDKey     contextKey = "user_id"
	UserRoleKey   contextKey = "user_role"
)

func AuthMiddleware(tokenManager *jwt.TokenManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			var tokenStr string

			if authHeader != "" {
				parts := strings.Split(authHeader, " ")
				if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
					tokenStr = parts[1]
				}
			}

			// Also allow token from cookie for Next.js SSR requests
			if tokenStr == "" {
				cookie, err := r.Cookie("estatehub_token")
				if err == nil && cookie != nil && cookie.Value != "" {
					tokenStr = cookie.Value
				}
			}

			if tokenStr == "" {
				Error(w, http.StatusUnauthorized, "UNAUTHORIZED", "Authorization token required")
				return
			}

			claims, err := tokenManager.ValidateToken(tokenStr)
			if err != nil {
				Error(w, http.StatusUnauthorized, "INVALID_TOKEN", err.Error())
				return
			}

			if claims.TokenType != "access" {
				Error(w, http.StatusUnauthorized, "INVALID_TOKEN", "Access token required")
				return
			}

			ctx := context.WithValue(r.Context(), UserClaimsKey, claims)
			ctx = context.WithValue(ctx, UserIDKey, claims.UserID)
			ctx = context.WithValue(ctx, UserRoleKey, domain.UserRole(claims.Role))

			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func OptionalAuthMiddleware(tokenManager *jwt.TokenManager) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			var tokenStr string

			if authHeader != "" {
				parts := strings.Split(authHeader, " ")
				if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
					tokenStr = parts[1]
				}
			}

			if tokenStr == "" {
				cookie, err := r.Cookie("estatehub_token")
				if err == nil && cookie != nil && cookie.Value != "" {
					tokenStr = cookie.Value
				}
			}

			if tokenStr != "" {
				claims, err := tokenManager.ValidateToken(tokenStr)
				if err == nil && claims.TokenType == "access" {
					ctx := context.WithValue(r.Context(), UserClaimsKey, claims)
					ctx = context.WithValue(ctx, UserIDKey, claims.UserID)
					ctx = context.WithValue(ctx, UserRoleKey, domain.UserRole(claims.Role))
					r = r.WithContext(ctx)
				}
			}

			next.ServeHTTP(w, r)
		})
	}
}

func RequireRole(roles ...domain.UserRole) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			userRole, ok := r.Context().Value(UserRoleKey).(domain.UserRole)
			if !ok {
				Error(w, http.StatusForbidden, "FORBIDDEN", "User role not authenticated")
				return
			}

			allowed := false
			for _, role := range roles {
				if userRole == role || (role == domain.RoleBroker && userRole == domain.RoleOrganizer) {
					allowed = true
					break
				}
			}

			if !allowed {
				Error(w, http.StatusForbidden, "FORBIDDEN", "Insufficient role privileges")
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}

func RequireAccredited(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		claims, ok := r.Context().Value(UserClaimsKey).(*jwt.Claims)
		if !ok || claims == nil || !claims.Accredited {
			Error(w, http.StatusForbidden, "KYC_ACCREDITATION_REQUIRED", "Verified accreditation required for this action")
			return
		}
		next.ServeHTTP(w, r)
	})
}

func GetUserID(r *http.Request) string {
	if val, ok := r.Context().Value(UserIDKey).(string); ok {
		return val
	}
	return ""
}

func GetUserRole(r *http.Request) domain.UserRole {
	if val, ok := r.Context().Value(UserRoleKey).(domain.UserRole); ok {
		return val
	}
	return domain.RoleBuyer
}
