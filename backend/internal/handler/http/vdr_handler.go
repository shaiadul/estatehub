package http

import (
	"encoding/json"
	"net/http"
	"strconv"

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
	q := r.URL.Query()

	categoryQuery := q.Get("category")
	var category *domain.VdrCategory
	if categoryQuery != "" && categoryQuery != "all" {
		cat := domain.VdrCategory(categoryQuery)
		category = &cat
	}

	var classification *string
	if cls := q.Get("classification"); cls != "" && cls != "all" {
		classification = &cls
	}

	page, _ := strconv.Atoi(q.Get("page"))
	limit, _ := strconv.Atoi(q.Get("limit"))
	if limit <= 0 {
		limit = 20
	}
	if page <= 0 {
		page = 1
	}

	filter := domain.VdrFilter{
		Category:       category,
		Classification: classification,
		Search:         q.Get("search"),
		SortBy:         q.Get("sort_by"),
		Limit:          limit,
		Offset:         (page - 1) * limit,
	}

	docs, err := h.vdrService.ListDocuments(r.Context(), propertyID, filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, docs)
}

func (h *VdrHandler) UploadDocument(w http.ResponseWriter, r *http.Request) {
	propertyID := chi.URLParam(r, "property_id")
	userID := GetUserID(r)

	var doc domain.VdrDocument
	if err := json.NewDecoder(r.Body).Decode(&doc); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	doc.PropertyID = propertyID
	createdDoc, err := h.vdrService.CreateDocument(r.Context(), userID, &doc)
	if err != nil {
		Error(w, http.StatusBadRequest, "UPLOAD_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusCreated, createdDoc)
}

func (h *VdrHandler) DeleteDocument(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.vdrService.DeleteDocument(r.Context(), id); err != nil {
		Error(w, http.StatusInternalServerError, "DELETE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]string{"message": "VDR document deleted successfully"})
}

func (h *VdrHandler) AccessLogs(w http.ResponseWriter, r *http.Request) {
	propertyID := chi.URLParam(r, "property_id")
	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	if limit <= 0 {
		limit = 50
	}

	logs, err := h.vdrService.ListAccessLogs(r.Context(), propertyID, limit)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, logs)
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
