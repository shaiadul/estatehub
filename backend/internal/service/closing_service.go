package service

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/estatehub/backend/internal/domain"
)

type ClosingService struct {
	repo      domain.ClosingRepository
	auditRepo domain.AuditRepository
}

func NewClosingService(repo domain.ClosingRepository, auditRepo domain.AuditRepository) *ClosingService {
	return &ClosingService{
		repo:      repo,
		auditRepo: auditRepo,
	}
}

func (s *ClosingService) GetClosingRoom(ctx context.Context, id, userID string) (*domain.ClosingRoom, error) {
	return s.repo.FindByID(ctx, id)
}

func (s *ClosingService) ListClosingRooms(ctx context.Context, filter domain.ClosingFilter) ([]domain.ClosingRoom, int64, error) {
	return s.repo.List(ctx, filter)
}

func (s *ClosingService) DisburseWire(ctx context.Context, closingID, userID, fidoToken string) (*domain.ClosingRoom, error) {
	room, err := s.repo.FindByID(ctx, closingID)
	if err != nil {
		return nil, err
	}

	wireTx := fmt.Sprintf("#FED-%d-%06d", time.Now().Year(), rand.Intn(900000)+100000)
	deedRec := fmt.Sprintf("#CA-LA-%d-%05d", time.Now().Year(), rand.Intn(90000)+10000)

	room.FidoWireAuthorized = true
	room.DeedRecorded = true
	room.PhaseWireDisbursed = true
	room.PhaseDeedRecorded = true
	room.WireTransactionID = wireTx
	room.DeedRecordingNumber = deedRec
	room.Stage = domain.ClosingStageSettled
	room.Status = "Settled"
	now := time.Now()
	room.ClosingDate = &now

	if err := s.repo.Update(ctx, room); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:   &userID,
		Action:   "WIRE_DISBURSED_SETTLED",
		Resource: fmt.Sprintf("closing:%s", room.ID),
		Details: fmt.Sprintf("Settled $%.2f via %s. Recorded deed %s with FIDO2 token %s",
			room.RemainingBalance, wireTx, deedRec, fidoToken),
		HashSignature: fmt.Sprintf("0x%x", rand.Int63()),
	})

	return room, nil
}

func (s *ClosingService) RecordDeed(ctx context.Context, closingID, userID string) (*domain.ClosingRoom, error) {
	room, err := s.repo.FindByID(ctx, closingID)
	if err != nil {
		return nil, err
	}

	deedRec := fmt.Sprintf("#CA-COUNTY-%d-%05d", time.Now().Year(), rand.Intn(90000)+10000)
	room.DeedRecorded = true
	room.PhaseDeedRecorded = true
	room.DeedRecordingNumber = deedRec
	if room.FidoWireAuthorized {
		room.Stage = domain.ClosingStageSettled
		room.Status = "Settled"
	} else {
		room.Stage = domain.ClosingStageDeedRecording
	}

	if err := s.repo.Update(ctx, room); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:   &userID,
		Action:   "DEED_RECORDED",
		Resource: fmt.Sprintf("closing:%s", room.ID),
		Details:  fmt.Sprintf("Recorded deed %s for contract %s", deedRec, room.ContractNumber),
		HashSignature: fmt.Sprintf("0x%x", rand.Int63()),
	})

	return room, nil
}
