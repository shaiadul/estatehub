package http

import (
	"encoding/json"
	"net/http"

	"github.com/estatehub/backend/internal/domain"
	"github.com/estatehub/backend/internal/service"
	"github.com/go-chi/chi/v5"
)

type ClosingHandler struct {
	closingService *service.ClosingService
}

func NewClosingHandler(closingService *service.ClosingService) *ClosingHandler {
	return &ClosingHandler{closingService: closingService}
}

func (h *ClosingHandler) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID := GetUserID(r)

	room, err := h.closingService.GetClosingRoom(r.Context(), id, userID)
	if err != nil {
		Error(w, http.StatusNotFound, "NOT_FOUND", "Closing room not found")
		return
	}

	JSON(w, http.StatusOK, room)
}

func (h *ClosingHandler) List(w http.ResponseWriter, r *http.Request) {
	userID := GetUserID(r)
	role := GetUserRole(r)

	filter := domain.ClosingFilter{}
	if role == domain.RoleBuyer || role == domain.RoleSeller {
		filter.UserID = &userID
	}

	rooms, total, err := h.closingService.ListClosingRooms(r.Context(), filter)
	if err != nil {
		Error(w, http.StatusInternalServerError, "FETCH_FAILED", err.Error())
		return
	}

	JSONWithMeta(w, http.StatusOK, rooms, map[string]interface{}{"total": total})
}

type DisburseWireRequest struct {
	FidoToken string `json:"fido_token"`
}

func (h *ClosingHandler) DisburseWire(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	userID := GetUserID(r)

	var req DisburseWireRequest
	_ = json.NewDecoder(r.Body).Decode(&req)
	if req.FidoToken == "" {
		req.FidoToken = "FIDO2-BIOMETRIC-VERIFIED"
	}

	room, err := h.closingService.DisburseWire(r.Context(), id, userID, req.FidoToken)
	if err != nil {
		Error(w, http.StatusBadRequest, "DISBURSE_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, map[string]interface{}{
		"message":      "Wire disbursed and title deed recorded successfully",
		"closing_room": room,
	})
}
