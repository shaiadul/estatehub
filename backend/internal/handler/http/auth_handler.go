package http

import (
	"encoding/json"
	"net/http"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
)

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{authService: authService}
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req service.RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	resp, err := h.authService.Register(r.Context(), req)
	if err != nil {
		Error(w, http.StatusBadRequest, "REGISTRATION_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusCreated, resp)
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req service.LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	ip := r.RemoteAddr
	ua := r.UserAgent()

	resp, err := h.authService.Login(r.Context(), req, ip, ua)
	if err != nil {
		Error(w, http.StatusUnauthorized, "LOGIN_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}

type RefreshRequest struct {
	RefreshToken string `json:"refresh_token"`
}

func (h *AuthHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	var req RefreshRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	tokens, err := h.authService.RefreshToken(r.Context(), req.RefreshToken)
	if err != nil {
		Error(w, http.StatusUnauthorized, "REFRESH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, tokens)
}

type GoogleOAuthRequest struct {
	Code        string          `json:"code"`
	DefaultRole domain.UserRole `json:"default_role"`
}

func (h *AuthHandler) GoogleOAuth(w http.ResponseWriter, r *http.Request) {
	var req GoogleOAuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	resp, err := h.authService.GoogleOAuthLogin(r.Context(), req.Code, req.DefaultRole)
	if err != nil {
		Error(w, http.StatusBadRequest, "OAUTH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	user, err := h.authService.GetProfile(r.Context(), userID)
	if err != nil {
		Error(w, http.StatusNotFound, "NOT_FOUND", "User profile not found")
		return
	}

	JSON(w, http.StatusOK, user)
}

func (h *AuthHandler) UpdateProfile(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	var req service.UpdateProfileRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	user, err := h.authService.UpdateProfile(r.Context(), userID, req)
	if err != nil {
		Error(w, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, user)
}

type ForgotPasswordRequest struct {
	Email string `json:"email"`
}

func (h *AuthHandler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var req ForgotPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Email == "" {
		Error(w, http.StatusBadRequest, "INVALID_EMAIL", "Email is required")
		return
	}

	resp, err := h.authService.ForgotPassword(r.Context(), req.Email)
	if err != nil {
		Error(w, http.StatusInternalServerError, "RECOVERY_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}

type ResetPasswordRequest struct {
	Email       string `json:"email"`
	Token       string `json:"token"`
	NewPassword string `json:"new_password"`
}

func (h *AuthHandler) ResetPassword(w http.ResponseWriter, r *http.Request) {
	var req ResetPasswordRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Email == "" || req.NewPassword == "" {
		Error(w, http.StatusBadRequest, "INVALID_REQUEST", "Email and new_password are required")
		return
	}

	if err := h.authService.ResetPassword(r.Context(), req.Email, req.Token, req.NewPassword); err != nil {
		Error(w, http.StatusBadRequest, "RESET_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]string{"message": "Password successfully reset"})
}

func (h *AuthHandler) ListAgents(w http.ResponseWriter, r *http.Request) {
	agents, err := h.authService.ListAgents(r.Context())
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, agents)
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	_ = h.authService.Logout(r.Context(), userID)
	JSON(w, http.StatusOK, map[string]string{
		"message": "Logged out successfully",
	})
}

type ChangePasswordPayload struct {
	CurrentPassword string `json:"current_password"`
	NewPassword     string `json:"new_password"`
}

func (h *AuthHandler) ChangePassword(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	if userID == "" {
		Error(w, http.StatusUnauthorized, "UNAUTHORIZED", "Authentication required")
		return
	}

	var req ChangePasswordPayload
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.CurrentPassword == "" || req.NewPassword == "" {
		Error(w, http.StatusBadRequest, "INVALID_REQUEST", "Current password and new password are required")
		return
	}

	if err := h.authService.ChangePassword(r.Context(), userID, req.CurrentPassword, req.NewPassword); err != nil {
		Error(w, http.StatusBadRequest, "CHANGE_PASSWORD_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]string{
		"message": "Password changed successfully",
	})
}

func (h *AuthHandler) Verify(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	user, err := h.authService.GetProfile(r.Context(), userID)
	if err != nil {
		Error(w, http.StatusUnauthorized, "INVALID_SESSION", "User session is invalid or user not found")
		return
	}

	JSON(w, http.StatusOK, map[string]interface{}{
		"valid": true,
		"user":  user,
	})
}

