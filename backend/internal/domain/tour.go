package domain

import (
	"context"
	"time"
)

type TourStatus string

const (
	TourStatusPending     TourStatus = "pending"
	TourStatusConfirmed   TourStatus = "confirmed"
	TourStatusCompleted   TourStatus = "completed"
	TourStatusCancelled   TourStatus = "cancelled"
	TourStatusRescheduled TourStatus = "rescheduled"
)

type TourBooking struct {
	ID              string     `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID      string     `json:"property_id" gorm:"type:uuid;not null;index"`
	Property        *Property  `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	UserID          string     `json:"user_id" gorm:"type:uuid;not null;index"`
	User            *User      `json:"user,omitempty" gorm:"foreignKey:UserID"`
	TourType        string     `json:"tour_type" gorm:"type:varchar(50);default:'virtual'"`
	Date            string     `json:"date" gorm:"type:varchar(50)"`
	TimeSlot        string     `json:"time_slot" gorm:"type:varchar(50);not null"`
	VisitorName     string     `json:"visitor_name" gorm:"type:varchar(255)"`
	VisitorEmail    string     `json:"visitor_email" gorm:"type:varchar(255)"`
	VisitorPhone    string     `json:"visitor_phone,omitempty" gorm:"type:varchar(50)"`
	PartySize       int        `json:"party_size" gorm:"default:1"`
	Notes           string     `json:"notes,omitempty" gorm:"type:text"`
	Status          TourStatus `json:"status" gorm:"type:varchar(50);not null;default:'confirmed';index"`
	NdaSigned       bool       `json:"nda_signed" gorm:"default:false"`
	MeetingLink     string     `json:"meeting_link,omitempty" gorm:"type:varchar(1024)"`
	// Backward-compatibility aliases with earlier mock
	ClientName      string     `json:"client_name,omitempty" gorm:"-"`
	ClientEntity    string     `json:"client_entity,omitempty" gorm:"-"`
	TransportType   string     `json:"transport_type,omitempty" gorm:"-"`
	SpecialRequests string     `json:"special_requests,omitempty" gorm:"-"`
	SecurityCleared bool       `json:"security_cleared,omitempty" gorm:"-"`
	CreatedAt       time.Time  `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt       time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

type TourFilter struct {
	UserID     *string
	PropertyID *string
	Status     *TourStatus
	TourType   *string
	Date       *string
	Limit      int
	Offset     int
}

type TourRepository interface {
	Create(ctx context.Context, tour *TourBooking) error
	FindByID(ctx context.Context, id string) (*TourBooking, error)
	Update(ctx context.Context, tour *TourBooking) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter TourFilter) ([]TourBooking, int64, error)
}
