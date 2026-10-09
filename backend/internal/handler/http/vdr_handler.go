package http

import (
	"net/http"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type VdrHandler struct {
	vdrService *service.VdrService
}

func NewVdrHandler(vdrService *service.VdrService) *VdrHandler {
	return &VdrHandler{vdrService: vdrService}
}

func (h *VdrHandler) ListDocuments(w http.ResponseWriter, r *http.Request) {
	propertyID := chi.URLParam(r, "property_id")
	categoryQuery := r.URL.Query().Get("category")

	var category *domain.VdrCategory
	if categoryQuery != "" {
		cat := domain.VdrCategory(categoryQuery)
		category = &cat
	}

	docs, err := h.vdrService.ListDocuments(r.Context(), propertyID, category)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, docs)
}

func (h *VdrHandler) Download(w http.ResponseWriter, r *http.Request) {
	docID := chi.URLParam(r, "id")
	userID := GetUserID(r)
	ip := r.RemoteAddr
	ua := r.UserAgent()

	resp, err := h.vdrService.GetDownloadURL(r.Context(), docID, userID, ip, ua)
	if err != nil {
		if err == domain.ErrKycRequired {
			Error(w, http.StatusForbidden, "ACCREDITATION_REQUIRED", "Access to this unredacted exhibit requires accredited KYC clearance")
			return
		}
		Error(w, http.StatusBadRequest, "DOWNLOAD_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}
