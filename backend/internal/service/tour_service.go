package service

import (
	"context"
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
	ClientName      string `json:"client_name"`
	ClientEntity    string `json:"client_entity"`
	ScheduledDate   string `json:"scheduled_date"`
	TimeSlot        string `json:"time_slot"`
	TransportType   string `json:"transport_type"`
	SpecialRequests string `json:"special_requests"`
}

func (s *TourService) BookTour(ctx context.Context, userID string, req BookTourRequest) (*domain.TourBooking, error) {
	_, err := s.propertyRepo.FindByID(ctx, req.PropertyID)
	if err != nil {
		return nil, domain.ErrNotFound
	}

	transport := req.TransportType
	if transport == "" {
		transport = "Chauffeured Maybach"
	}

	tour := &domain.TourBooking{
		PropertyID:      req.PropertyID,
		UserID:          userID,
		ClientName:      req.ClientName,
		ClientEntity:    req.ClientEntity,
		ScheduledAt:     time.Now().Add(24 * time.Hour), // default or parsed from scheduled_date
		TimeSlot:        req.TimeSlot,
		Status:          domain.TourStatusConfirmed,
		TransportType:   transport,
		SpecialRequests: req.SpecialRequests,
		SecurityCleared: true,
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
	// Brokers and admins can see all or filter by agent/property
	return s.repo.List(ctx, filter)
}

func (s *TourService) UpdateTourStatus(ctx context.Context, id string, status domain.TourStatus, notes string) (*domain.TourBooking, error) {
	tour, err := s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, err
	}

	tour.Status = status
	if notes != "" {
		tour.OrganizerNotes = notes
	}

	if err := s.repo.Update(ctx, tour); err != nil {
		return nil, err
	}

	return tour, nil
}
