package service

import (
	"context"
	"strings"
	"time"

	"github.com/estatehub/backend/internal/domain"
)

type TourService struct {
	repo         domain.TourRepository
	propertyRepo domain.PropertyRepository
}

func NewTourService(repo domain.TourRepository, propertyRepo domain.PropertyRepository) *TourService {
	return &TourService{
		repo:         repo,
		propertyRepo: propertyRepo,
	}
}

type BookTourRequest struct {
	PropertyID      string `json:"property_id"`
	TourType        string `json:"tour_type"`
	Date            string `json:"date"`
	TimeSlot        string `json:"time_slot"`
	VisitorName     string `json:"visitor_name"`
	VisitorEmail    string `json:"visitor_email"`
	VisitorPhone    string `json:"visitor_phone"`
	PartySize       int    `json:"party_size"`
	Notes           string `json:"notes"`
	NdaSigned       bool   `json:"nda_signed"`
	// Aliases
	ClientName      string `json:"client_name"`
	ClientEntity    string `json:"client_entity"`
	ScheduledDate   string `json:"scheduled_date"`
	TransportType   string `json:"transport_type"`
	SpecialRequests string `json:"special_requests"`
}

func (s *TourService) BookTour(ctx context.Context, userID string, req BookTourRequest) (*domain.TourBooking, error) {
	_, err := s.propertyRepo.FindByID(ctx, req.PropertyID)
	if err != nil {
		return nil, domain.ErrNotFound
	}

	name := req.VisitorName
	if name == "" {
		name = req.ClientName
	}
	if name == "" {
		name = "Accredited Buyer"
	}

	date := req.Date
	if date == "" {
		date = req.ScheduledDate
	}
	if date == "" {
		date = time.Now().Add(24 * time.Hour).Format("2006-01-02")
	}

	notes := req.Notes
	if notes == "" {
		notes = req.SpecialRequests
	}

	partySize := req.PartySize
	if partySize <= 0 {
		partySize = 1
	}

	tourType := req.TourType
	if tourType == "" {
		tourType = "virtual"
	}

	tour := &domain.TourBooking{
		PropertyID:      req.PropertyID,
		UserID:          userID,
		VisitorName:     name,
		VisitorEmail:    req.VisitorEmail,
		VisitorPhone:    req.VisitorPhone,
		PartySize:       partySize,
		Notes:           notes,
		Date:            date,
		TimeSlot:        req.TimeSlot,
		TourType:        tourType,
		Status:          domain.TourStatusConfirmed,
		NdaSigned:       req.NdaSigned,
		MeetingLink:     "https://meet.estatehub.com/vip-tour/" + req.PropertyID,
		ClientName:      name,
		ClientEntity:    req.ClientEntity,
		SpecialRequests: notes,
	}

	if err := s.repo.Create(ctx, tour); err != nil {
		return nil, err
	}

	return s.repo.FindByID(ctx, tour.ID)
}

func (s *TourService) ListTours(ctx context.Context, userID string, role domain.UserRole, filter domain.TourFilter) ([]domain.TourBooking, int64, error) {
	if role == domain.RoleBuyer {
		filter.UserID = &userID
	}
	return s.repo.List(ctx, filter)
}

func (s *TourService) UpdateTourStatus(ctx context.Context, id string, status domain.TourStatus, notes string) (*domain.TourBooking, error) {
	tour, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	normStatus := domain.TourStatus(strings.ToLower(string(status)))
	tour.Status = normStatus
	if notes != "" {
		tour.Notes = notes
	}

	if err := s.repo.Update(ctx, tour); err != nil {
		return nil, err
	}

	return tour, nil
}
