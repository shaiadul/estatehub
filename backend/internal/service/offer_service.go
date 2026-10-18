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
	PropertyID            string  `json:"property_id"`
	OfferAmount           float64 `json:"offer_amount"`
	EarnestDeposit        float64 `json:"earnest_deposit"`
	FinancingType         string  `json:"financing_type"`
	ContingencyPeriodDays int     `json:"contingency_period_days"`
	ClosingTimelineDays   int     `json:"closing_timeline_days"`
	ProofOfFundsURL       string  `json:"proof_of_funds_url"`
	Note                  string  `json:"note"`
	// Aliases
	BuyerEntity     string  `json:"buyer_entity"`
	ContingencyDays int     `json:"contingency_days"`
	Notes           string  `json:"notes"`
}

func (s *OfferService) SubmitOffer(ctx context.Context, buyerID string, req SubmitOfferRequest) (*domain.Offer, error) {
	prop, err := s.propertyRepo.FindByID(ctx, req.PropertyID)
	if err != nil {
		return nil, domain.ErrNotFound
	}

	earnest := req.EarnestDeposit
	if earnest <= 0 {
		earnest = req.OfferAmount * 0.05 // default 5%
	}

	contingency := req.ContingencyPeriodDays
	if contingency <= 0 {
		contingency = req.ContingencyDays
	}
	if contingency <= 0 {
		contingency = 14
	}

	closingTimeline := req.ClosingTimelineDays
	if closingTimeline <= 0 {
		closingTimeline = 30
	}

	note := req.Note
	if note == "" {
		note = req.Notes
	}

	buyerEntity := req.BuyerEntity
	if buyerEntity == "" {
		buyerEntity = "Accredited Principal"
	}

	financing := req.FinancingType
	if financing == "" {
		financing = "sovereign_wire"
	}

	offer := &domain.Offer{
		PropertyID:            req.PropertyID,
		BuyerID:               buyerID,
		OfferAmount:           req.OfferAmount,
		EarnestDeposit:        earnest,
		FinancingType:         financing,
		ContingencyPeriodDays: contingency,
		ClosingTimelineDays:   closingTimeline,
		Status:                domain.OfferStatusSubmitted,
		Note:                  note,
		ProofOfFundsURL:       req.ProofOfFundsURL,
		BuyerEntity:           buyerEntity,
	}

	if err := s.repo.Create(ctx, offer); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		UserID:   &buyerID,
		Action:   "LOI_SUBMITTED",
		Resource: fmt.Sprintf("offer:%s", offer.ID),
		Details:  fmt.Sprintf("Dispatched LOI for property %s ($%.2f)", prop.Title, req.OfferAmount),
	})

	return s.repo.FindByID(ctx, offer.ID)
}

func (s *OfferService) ListOffers(ctx context.Context, userID string, role domain.UserRole, filter domain.OfferFilter) ([]domain.Offer, int64, error) {
	if role == domain.RoleBuyer {
		filter.BuyerID = &userID
	}
	return s.repo.List(ctx, filter)
}

func (s *OfferService) CounterOffer(ctx context.Context, offerID string, counterAmount float64, counterNote string) (*domain.Offer, error) {
	offer, err := s.repo.FindByID(ctx, offerID)
	if err != nil {
		return nil, err
	}

	offer.Status = domain.OfferStatusCountered
	offer.CounterAmount = &counterAmount
	if counterNote != "" {
		offer.CounterNote = counterNote
		offer.Note = counterNote
	}

	if err := s.repo.Update(ctx, offer); err != nil {
		return nil, err
	}

	return offer, nil
}

type AcceptOfferResponse struct {
	*domain.Offer
	ClosingRoom *domain.ClosingRoom `json:"closing_room,omitempty"`
	Message     string              `json:"message,omitempty"`
}

func (s *OfferService) AcceptOffer(ctx context.Context, offerID, sellerID string) (*AcceptOfferResponse, error) {
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
		ContractNumber:       contractNum,
		PropertyID:           offer.PropertyID,
		BuyerID:              offer.BuyerID,
		SellerID:             sellerID,
		TotalPrice:           price,
		EscrowDeposit:        offer.EarnestDeposit,
		RemainingBalance:     price - offer.EarnestDeposit,
		Stage:                domain.ClosingStageEscrowFunding,
		SmartContractAddress: fmt.Sprintf("0x71C...%04d", rand.Intn(9000)+1000),
		TitleSearchVerified:  true,
		FidoWireAuthorized:   false,
		DeedRecorded:         false,
		Status:               "Active",
		EscrowExpiresAt:      time.Now().Add(48 * time.Hour),
	}

	if err := s.closingRepo.Create(ctx, room); err != nil {
		return nil, err
	}

	_ = s.auditRepo.Create(ctx, &domain.AuditLog{
		Action:   "OFFER_ACCEPTED_ESCROW_INITIATED",
		Resource: fmt.Sprintf("closing:%s", room.ID),
		Details:  fmt.Sprintf("Created Bilateral Closing Room %s from LOI %s", contractNum, offer.ID),
	})

	return &AcceptOfferResponse{
		Offer:       offer,
		ClosingRoom: room,
		Message:     "Offer accepted and Bilateral Closing Room generated",
	}, nil
}

func (s *OfferService) RejectOffer(ctx context.Context, offerID string) (*domain.Offer, error) {
	offer, err := s.repo.FindByID(ctx, offerID)
	if err != nil {
		return nil, err
	}
	offer.Status = domain.OfferStatusRejected
	if err := s.repo.Update(ctx, offer); err != nil {
		return nil, err
	}
	return offer, nil
}
