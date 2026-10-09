package http

import (
	"encoding/json"
	"net/http"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type OfferHandler struct {
	offerService *service.OfferService
}

func NewOfferHandler(offerService *service.OfferService) *OfferHandler {
	return &OfferHandler{offerService: offerService}
}

func (h *OfferHandler) Submit(w http.ResponseWriter, r *http.Request) {
	var req service.SubmitOfferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	buyerID := GetUserID(r)
	offer, err := h.offerService.SubmitOffer(r.Context(), buyerID, req)
	if err != nil {
		Error(w, http.StatusBadRequest, "SUBMIT_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusCreated, offer)
}

func (h *OfferHandler) List(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	role := GetUserRole(r)

	q := r.URL.Query()
	filter := domain.OfferFilter{}
	if propID := q.Get("property_id"); propID != "" {
		filter.PropertyID = &propID
	}
	if status := q.Get("status"); status != "" {
		st := domain.OfferStatus(status)
		filter.Status = &st
	}

	offers, total, err := h.offerService.ListOffers(r.Context(), userID, role, filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSONWithMeta(w, http.StatusOK, offers, map[string]interface{}{"total": total})
}

type CounterOfferRequest struct {
	CounterAmount float64 `json:"counter_amount"`
	Notes         string  `json:"notes"`
}

func (h *OfferHandler) Counter(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var req CounterOfferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	offer, err := h.offerService.CounterOffer(r.Context(), id, req.CounterAmount, req.Notes)
	if err != nil {
		Error(w, http.StatusBadRequest, "COUNTER_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, offer)
}

func (h *OfferHandler) Accept(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	sellerID := GetUserID(r)

	closingRoom, err := h.offerService.AcceptOffer(r.Context(), id, sellerID)
	if err != nil {
		Error(w, http.StatusBadRequest, "ACCEPT_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]interface{}{
		"message":      "Offer accepted and Bilateral Closing Room generated",
		"closing_room": closingRoom,
	})
}

func (h *OfferHandler) Reject(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := h.offerService.RejectOffer(r.Context(), id); err != nil {
		Error(w, http.StatusBadRequest, "REJECT_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]string{"message": "Offer rejected"})
}
