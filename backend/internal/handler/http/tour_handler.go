package http

import (
	"encoding/json"
	"net/http"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type TourHandler struct {
	tourService *service.TourService
}

func NewTourHandler(tourService *service.TourService) *TourHandler {
	return &TourHandler{tourService: tourService}
}

func (h *TourHandler) BookTour(w http.ResponseWriter, r *http.Request) {
	var req service.BookTourRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	userID := GetUserID(r)
	tour, err := h.tourService.BookTour(r.Context(), userID, req)
	if err != nil {
		Error(w, http.StatusBadRequest, "BOOKING_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusCreated, tour)
}

func (h *TourHandler) List(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	role := GetUserRole(r)

	q := r.URL.Query()
	filter := domain.TourFilter{}
	if propID := q.Get("property_id"); propID != "" {
		filter.PropertyID = &propID
	}
	if status := q.Get("status"); status != "" {
		st := domain.TourStatus(status)
		filter.Status = &st
	}

	tours, total, err := h.tourService.ListTours(r.Context(), userID, role, filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSONWithMeta(w, http.StatusOK, tours, map[string]interface{}{"total": total})
}

type UpdateTourStatusRequest struct {
	Status domain.TourStatus `json:"status"`
	Notes  string            `json:"notes"`
}

func (h *TourHandler) UpdateStatus(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var req UpdateTourStatusRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	tour, err := h.tourService.UpdateTourStatus(r.Context(), id, req.Status, req.Notes)
	if err != nil {
		Error(w, http.StatusBadRequest, "UPDATE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, tour)
}
