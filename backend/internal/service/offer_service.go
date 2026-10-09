package service

import (
	"context"
	"fmt"
	"math/rand"
	"time"

	"github.com/estatehub/backend/internal/domain"
)

type OfferService struct {
	repo         domain.OfferRepository
	propertyRepo domain.PropertyRepository
	closingRepo  domain.ClosingRepository
	auditRepo    domain.AuditRepository
}

func NewOfferService(
	repo domain.OfferRepository,
	propertyRepo domain.PropertyRepository,
	closingRepo domain.ClosingRepository,
	auditRepo domain.AuditRepository,
) *OfferService {
	return &OfferService{
		repo:         repo,
		propertyRepo: propertyRepo,
		closingRepo:  closingRepo,
		auditRepo:    auditRepo,
	}
}

type SubmitOfferRequest struct {
	PropertyID      string  `json:"property_id"`
	BuyerEntity     string  `json:"buyer_entity"`
	OfferAmount     float64 `json:"offer_amount"`
	EarnestDeposit  float64 `json:"earnest_deposit"`
	FinancingType   string  `json:"financing_type"`
	ContingencyDays int     `json:"contingency_days"`
	Notes           string  `json:"notes"`
	ProofOfFundsURL string  `json:"proof_of_funds_url"`
}

func (s *OfferService) SubmitOffer(ctx context.Context, buyerID string, req SubmitOfferRequest) (*domain.Offer, error) {
	prop, err := s.propertyRepo.FindByID(ctx, req.PropertyID)
	if err != nil {
		return nil, domain.ErrNotFound
	}

	loiNum := fmt.Sprintf("LOI-%04d", rand.Intn(9000)+1000)

	earnest := req.EarnestDeposit
	if earnest <= 0 {
		earnest = req.OfferAmount * 0.05 // default 5%
	}

	contingency := req.ContingencyDays
	if contingency <= 0 {
		contingency = 14
	}

	offer := &domain.Offer{
		LoiNumber:       loiNum,
		PropertyID:      req.PropertyID,
		BuyerID:         buyerID,
		BuyerEntity:     req.BuyerEntity,
		OfferAmount:     req.OfferAmount,
		EarnestDeposit:  earnest,
		FinancingType:   req.FinancingType,
		ContingencyDays: contingency,
		Status:          domain.OfferStatusPending,
		Notes:           req.Notes,
		ProofOfFundsURL: req.ProofOfFundsURL,
	}

	if err := s.repo.Create(ctx, offer); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:   &buyerID,
		Action:   "LOI_SUBMITTED",
		Resource: fmt.Sprintf("offer:%s", offer.ID),
		Details:  fmt.Sprintf("Dispatched LOI %s for property %s ($%.2f)", loiNum, prop.Title, req.OfferAmount),
	})

	return s.repo.FindByID(ctx, offer.ID)
}

func (s *OfferService) ListOffers(ctx context.Context, userID string, role domain.UserRole, filter domain.OfferFilter) ([]domain.Offer, int64, error) {
	if role == domain.RoleBuyer {
		filter.BuyerID = &userID
	}
	return s.repo.List(ctx, filter)
}

func (s *OfferService) CounterOffer(ctx context.Context, offerID string, counterAmount float64, notes string) (*domain.Offer, error) {
	offer, err := s.repo.FindByID(ctx, offerID)
	if err != nil {
		return nil, err
	}

	offer.Status = domain.OfferStatusCountered
	offer.CounterAmount = &counterAmount
	if notes != "" {
		offer.Notes = notes
	}

	if err := s.repo.Update(ctx, offer); err != nil {
		return nil, err
	}

	return offer, nil
}

func (s *OfferService) AcceptOffer(ctx context.Context, offerID, sellerID string) (*domain.ClosingRoom, error) {
	offer, err := s.repo.FindByID(ctx, offerID)
	if err != nil {
		return nil, err
	}

	offer.Status = domain.OfferStatusAccepted
	_ = s.repo.Update(ctx, offer)

	// Automatically create Bilateral Closing Room for bilateral settlement
	contractNum := fmt.Sprintf("PSA-%04d-FINAL", rand.Intn(9000)+1000)
	price := offer.OfferAmount
	if offer.CounterAmount != nil && *offer.CounterAmount > 0 {
		price = *offer.CounterAmount
	}

	room := &domain.ClosingRoom{
		ContractNumber:     contractNum,
		PropertyID:         offer.PropertyID,
		BuyerID:            offer.BuyerID,
		SellerID:           sellerID,
		ContractPrice:      price,
		EarnestAmount:      offer.EarnestDeposit,
		BalanceToClose:     price - offer.EarnestDeposit,
		PhasePSAExecuted:   true,
		PhaseEarnestLocked: true,
		PhaseWireDisbursed: false,
		PhaseDeedRecorded:  false,
		Status:             domain.ClosingStatusActive,
		EscrowExpiresAt:    time.Now().Add(48 * time.Hour),
	}

	if err := s.closingRepo.Create(ctx, room); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		Action:   "OFFER_ACCEPTED_ESCROW_INITIATED",
		Resource: fmt.Sprintf("closing:%s", room.ID),
		Details:  fmt.Sprintf("Created Bilateral Closing Room %s from LOI %s", contractNum, offer.LoiNumber),
	})

	return room, nil
}

func (s *OfferService) RejectOffer(ctx context.Context, offerID string) error {
	offer, err := s.repo.FindByID(ctx, offerID)
	if err != nil {
		return err
	}
	offer.Status = domain.OfferStatusRejected
	return s.repo.Update(ctx, offer)
}
