package http

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type AdminHandler struct {
	adminService *service.AdminService
	userRepo     domain.UserRepository
}

func NewAdminHandler(adminService *service.AdminService, userRepo domain.UserRepository) *AdminHandler {
	return &AdminHandler{
		adminService: adminService,
		userRepo:     userRepo,
	}
}

func (h *AdminHandler) Overview(w http.ResponseWriter, r *http.Request) {
	stats, err := h.adminService.GetOverview(r.Context())
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}
	JSON(w, http.StatusOK, stats)
}

func (h *AdminHandler) ListUsers(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	filter := domain.UserFilter{
		Search: q.Get("search"),
	}

	if role := q.Get("role"); role != "" {
		r := domain.UserRole(role)
		filter.Role = &r
	}
	if kyc := q.Get("kyc_status"); kyc != "" {
		k := domain.KYCStatus(kyc)
		filter.KYCStatus = &k
	}

	page, _ := strconv.Atoi(q.Get("page"))
	limit, _ := strconv.Atoi(q.Get("limit"))
	if limit <= 0 {
		limit = 20
	}
	if page <= 0 {
		page = 1
	}
	filter.Limit = limit
	filter.Offset = (page - 1) * limit

	users, total, err := h.userRepo.List(r.Context(), filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSONPaginated(w, http.StatusOK, users, page, limit, total)
}

type UpdateKYCRequest struct {
	KYCStatus  domain.KYCStatus `json:"kyc_status"`
	Accredited bool             `json:"accredited"`
}

func (h *AdminHandler) UpdateKYC(w http.ResponseWriter, r *http.Request) {
	targetUserID := chi.URLParam(r, "id")
	adminID := GetUserID(r)

	var req UpdateKYCRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	user, err := h.adminService.UpdateUserKYC(r.Context(), adminID, targetUserID, req.KYCStatus, req.Accredited)
	if err != nil {
		Error(w, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, user)
}

type ModeratePropertyRequest struct {
	Approved bool `json:"approved"`
	Featured bool `json:"featured"`
}

func (h *AdminHandler) ModerateProperty(w http.ResponseWriter, r *http.Request) {
	propID := chi.URLParam(r, "id")
	adminID := GetUserID(r)

	var req ModeratePropertyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	prop, err := h.adminService.ModerateProperty(r.Context(), adminID, propID, req.Approved, req.Featured)
	if err != nil {
		Error(w, http.StatusBadRequest, "MODERATION_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, prop)
}

func (h *AdminHandler) AuditLogs(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()
	filter := domain.AuditFilter{}
	if email := q.Get("user_email"); email != "" {
		filter.UserEmail = &email
	}
	if action := q.Get("action"); action != "" {
		filter.Action = &action
	}

	page, _ := strconv.Atoi(q.Get("page"))
	if page <= 0 {
		page = 1
	}
	limit, _ := strconv.Atoi(q.Get("limit"))
	if limit <= 0 {
		limit = 50
	}
	filter.Limit = limit
	filter.Offset = (page - 1) * limit

	logs, total, err := h.adminService.ListAuditLogs(r.Context(), filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSONPaginated(w, http.StatusOK, logs, page, limit, total)
}
