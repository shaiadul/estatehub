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
