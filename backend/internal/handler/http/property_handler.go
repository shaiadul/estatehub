package http

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type PropertyHandler struct {
	propertyService *service.PropertyService
}

func NewPropertyHandler(propertyService *service.PropertyService) *PropertyHandler {
	return &PropertyHandler{propertyService: propertyService}
}

func (h *PropertyHandler) List(w http.ResponseWriter, r *http.Request) {
	q := r.URL.Query()

	filter := domain.PropertyFilter{
		Query:           q.Get("q"),
		City:            q.Get("city"),
		State:           q.Get("state"),
		PropertyType:    q.Get("property_type"),
		TransactionType: q.Get("transaction_type"),
		SortBy:          q.Get("sort"),
	}

	if location := q.Get("location"); location != "" {
		filter.Query = location
	}
	if pType := q.Get("type"); pType != "" && filter.TransactionType == "" {
		filter.TransactionType = pType
	}

	if bedsStr := q.Get("beds"); bedsStr != "" {
		if beds, err := strconv.Atoi(bedsStr); err == nil {
			filter.MinBeds = &beds
		}
	}
	if minP := q.Get("min_price"); minP != "" {
		if p, err := strconv.ParseFloat(minP, 64); err == nil {
			filter.MinPrice = &p
		}
	}
	if maxP := q.Get("max_price"); maxP != "" {
		if p, err := strconv.ParseFloat(maxP, 64); err == nil {
			filter.MaxPrice = &p
		}
	}
	if amenities := q.Get("amenities"); amenities != "" {
		filter.Amenities = strings.Split(amenities, ",")
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

	resp, err := h.propertyService.ListProperties(r.Context(), filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "INTERNAL_ERROR", err.Error())
		return
	}

	meta := map[string]interface{}{
		"total":  resp.Total,
		"page":   page,
		"limit":  limit,
		"cached": resp.Cached,
	}

	JSONWithMeta(w, http.StatusOK, resp.Properties, meta)
}

func (h *PropertyHandler) GetBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	prop, err := h.propertyService.GetBySlug(r.Context(), slug)
	if err != nil {
		Error(w, http.StatusNotFound, "NOT_FOUND", "Property not found")
		return
	}
	JSON(w, http.StatusOK, prop)
}

func (h *PropertyHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	prop, err := h.propertyService.GetByID(r.Context(), id)
	if err != nil {
		Error(w, http.StatusNotFound, "NOT_FOUND", "Property not found")
		return
	}
	JSON(w, http.StatusOK, prop)
}

func (h *PropertyHandler) Create(w http.ResponseWriter, r *http.Request) {
	var prop domain.Property
	if err := json.NewDecoder(r.Body).Decode(&prop); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	userID := GetUserID(r)
	if prop.AgentID == nil && userID != "" {
		prop.AgentID = &userID
	}

	if err := h.propertyService.Create(r.Context(), &prop); err != nil {
		Error(w, http.StatusBadRequest, "CREATE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusCreated, prop)
}

func (h *PropertyHandler) Update(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var prop domain.Property
	if err := json.NewDecoder(r.Body).Decode(&prop); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}
	prop.ID = id

	if err := h.propertyService.Update(r.Context(), &prop); err != nil {
		Error(w, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, prop)
}

func (h *PropertyHandler) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.propertyService.Delete(r.Context(), id); err != nil {
		Error(w, http.StatusInternalServerError, "DELETE_FAILED", err.Error())
		return
	}
	JSON(w, http.StatusOK, map[string]string{"message": "Property deleted successfully"})
}

func (h *PropertyHandler) ToggleBookmark(w http.ResponseWriter, r *http.Request) {
	propertyID := chi.URLParam(r, "id")
	userID := GetUserID(r)

	bookmarked, err := h.propertyService.ToggleBookmark(r.Context(), userID, propertyID)
	if err != nil {
		Error(w, http.StatusInternalServerError, "BOOKMARK_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]bool{"bookmarked": bookmarked})
}

func (h *PropertyHandler) ListSaved(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	properties, err := h.propertyService.GetBookmarked(r.Context(), userID)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}
	JSON(w, http.StatusOK, properties)
}
