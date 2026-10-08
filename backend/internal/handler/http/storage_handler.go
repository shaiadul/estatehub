package http

import (
	"encoding/json"
	"net/http"

	"github.com/estatehub/backend/internal/service"
)

type StorageHandler struct {
	storageService *service.StorageService
}

func NewStorageHandler(storageService *service.StorageService) *StorageHandler {
	return &StorageHandler{storageService: storageService}
}

func (h *StorageHandler) PresignUpload(w http.ResponseWriter, r *http.Request) {
	var req service.PresignUploadRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "INVALID_BODY", err.Error())
		return
	}

	result, err := h.storageService.GenerateUploadPresign(r.Context(), req)
	if err != nil {
		Error(w, http.StatusInternalServerError, "PRESIGN_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, result)
}

func (h *StorageHandler) PresignDownload(w http.ResponseWriter, r *http.Request) {
	key := r.URL.Query().Get("key")
	if key == "" {
		Error(w, http.StatusBadRequest, "INVALID_PARAM", "key query parameter is required")
		return
	}

	result, err := h.storageService.GenerateDownloadPresign(r.Context(), key)
	if err != nil {
		Error(w, http.StatusInternalServerError, "PRESIGN_FAILED", err.Error())
		return
	}

	JSON(w, http.StatusOK, result)
}
