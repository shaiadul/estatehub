package http

import (
	"encoding/json"
	"net/http"
	"strconv"

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
	if financing := q.Get("financing_type"); financing != "" {
		filter.FinancingType = &financing
	}
	if minAmt := q.Get("min_amount"); minAmt != "" {
		if v, err := strconv.ParseFloat(minAmt, 64); err == nil {
			filter.MinAmount = &v
		}
	}
	if maxAmt := q.Get("max_amount"); maxAmt != "" {
		if v, err := strconv.ParseFloat(maxAmt, 64); err == nil {
			filter.MaxAmount = &v
		}
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
	CounterNote   string  `json:"counter_note"`
}

func (h *OfferHandler) Counter(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var req CounterOfferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	note := req.CounterNote
	if note == "" {
		note = req.Notes
	}

	offer, err := h.offerService.CounterOffer(r.Context(), id, req.CounterAmount, note)
	if err != nil {
		Error(w, http.StatusBadRequest, "COUNTER_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, offer)
}

func (h *OfferHandler) Accept(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	sellerID := GetUserID(r)

	resp, err := h.offerService.AcceptOffer(r.Context(), id, sellerID)
	if err != nil {
		Error(w, http.StatusBadRequest, "ACCEPT_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}

func (h *OfferHandler) Reject(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	offer, err := h.offerService.RejectOffer(r.Context(), id)
	if err != nil {
		Error(w, http.StatusBadRequest, "REJECT_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, offer)
}
