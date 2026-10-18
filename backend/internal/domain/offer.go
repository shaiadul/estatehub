package domain

import (
	"context"
	"time"
)

type OfferStatus string

const (
	OfferStatusSubmitted       OfferStatus = "submitted"
	OfferStatusPending         OfferStatus = "submitted" // alias
	OfferStatusUnderReview     OfferStatus = "under_review"
	OfferStatusCountered       OfferStatus = "countered"
	OfferStatusAccepted        OfferStatus = "accepted"
	OfferStatusRejected        OfferStatus = "rejected"
	OfferStatusClosing         OfferStatus = "closing"
	OfferStatusEscrowInitiated OfferStatus = "closing" // alias
)

type Offer struct {
	ID                    string      `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID            string      `json:"property_id" gorm:"type:uuid;not null;index"`
	Property              *Property   `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	BuyerID               string      `json:"buyer_id" gorm:"type:uuid;not null;index"`
	Buyer                 *User       `json:"buyer,omitempty" gorm:"foreignKey:BuyerID"`
	OfferAmount           float64     `json:"offer_amount" gorm:"not null"`
	EarnestDeposit        float64     `json:"earnest_deposit" gorm:"not null"`
	FinancingType         string      `json:"financing_type" gorm:"size:50;not null;default:'cash'"`
	ContingencyPeriodDays int         `json:"contingency_period_days" gorm:"default:14"`
	ClosingTimelineDays   int         `json:"closing_timeline_days" gorm:"default:30"`
	ProofOfFundsURL       string      `json:"proof_of_funds_url,omitempty" gorm:"size:1024"`
	Note                  string      `json:"note,omitempty" gorm:"type:text"`
	Status                OfferStatus `json:"status" gorm:"type:varchar(50);not null;default:'submitted';index"`
	CounterAmount         *float64    `json:"counter_amount,omitempty"`
	CounterNote           string      `json:"counter_note,omitempty" gorm:"type:text"`
	// Aliases for compatibility
	LoiNumber             string      `json:"loi_number,omitempty" gorm:"size:100"`
	BuyerEntity           string      `json:"buyer_entity,omitempty" gorm:"size:255"`
	ContingencyDays       int         `json:"contingency_days,omitempty" gorm:"-"`
	Notes                 string      `json:"notes,omitempty" gorm:"-"`
	CreatedAt             time.Time   `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt             time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type OfferFilter struct {
	BuyerID       *string
	PropertyID    *string
	Status        *OfferStatus
	FinancingType *string
	MinAmount     *float64
	MaxAmount     *float64
	Limit         int
	Offset        int
}

type OfferRepository interface {
	Create(ctx context.Context, offer *Offer) error
	FindByID(ctx context.Context, id string) (*Offer, error)
	FindByLoiNumber(ctx context.Context, number string) (*Offer, error)
	Update(ctx context.Context, offer *Offer) error
	List(ctx context.Context, filter OfferFilter) ([]Offer, int64, error)
}
