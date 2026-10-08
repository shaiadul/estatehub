package domain

import (
	"context"
	"time"
)

type TourStatus string

const (
	TourStatusConfirmed   TourStatus = "Confirmed"
	TourStatusEnRoute     TourStatus = "En Route"
	TourStatusCompleted   TourStatus = "Completed"
	TourStatusRescheduled TourStatus = "Rescheduled"
	TourStatusCancelled   TourStatus = "Cancelled"
)

type TourBooking struct {
	ID              string     `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID      string     `json:"property_id" gorm:"type:uuid;not null;index"`
	Property        *Property  `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	UserID          string     `json:"user_id" gorm:"type:uuid;not null;index"`
	User            *User      `json:"user,omitempty" gorm:"foreignKey:UserID"`
	ClientName      string     `json:"client_name" gorm:"not null;size:255"`
	ClientEntity    string     `json:"client_entity" gorm:"size:255"`
	ScheduledAt     time.Time  `json:"scheduled_at" gorm:"not null;index"`
	TimeSlot        string     `json:"time_slot" gorm:"not null;size:100"`
	Status          TourStatus `json:"status" gorm:"type:varchar(50);not null;default:'Confirmed';index"`
	TransportType   string     `json:"transport_type" gorm:"size:100;default:'Chauffeured Maybach'"`
	SpecialRequests string     `json:"special_requests" gorm:"type:text"`
	SecurityCleared bool       `json:"security_cleared" gorm:"default:true"`
	OrganizerNotes  string     `json:"organizer_notes" gorm:"type:text"`
	CreatedAt       time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt       time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

type TourFilter struct {
	UserID     *string
	PropertyID *string
	Status     *TourStatus
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
