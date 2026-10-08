package domain

import (
	"context"
	"time"
)

type OfferStatus string

const (
	OfferStatusPending         OfferStatus = "Pending"
	OfferStatusUnderReview     OfferStatus = "Under Review"
	OfferStatusCountered       OfferStatus = "Countered"
	OfferStatusAccepted        OfferStatus = "Accepted"
	OfferStatusRejected        OfferStatus = "Rejected"
	OfferStatusEscrowInitiated OfferStatus = "Escrow Initiated"
)

type Offer struct {
	ID              string      `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	LoiNumber       string      `json:"loi_number" gorm:"uniqueIndex;not null;size:100"`
	PropertyID      string      `json:"property_id" gorm:"type:uuid;not null;index"`
	Property        *Property   `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	BuyerID         string      `json:"buyer_id" gorm:"type:uuid;not null;index"`
	Buyer           *User       `json:"buyer,omitempty" gorm:"foreignKey:BuyerID"`
	BuyerEntity     string      `json:"buyer_entity" gorm:"not null;size:255"`
	OfferAmount     float64     `json:"offer_amount" gorm:"not null"`
	EarnestDeposit  float64     `json:"earnest_deposit" gorm:"not null"`
	FinancingType   string      `json:"financing_type" gorm:"size:100;default:'All-Cash'"`
	ContingencyDays int         `json:"contingency_days" gorm:"default:14"`
	Status          OfferStatus `json:"status" gorm:"type:varchar(50);not null;default:'Pending';index"`
	CounterAmount   *float64    `json:"counter_amount"`
	Notes           string      `json:"notes" gorm:"type:text"`
	ProofOfFundsURL string      `json:"proof_of_funds_url" gorm:"size:1024"`
	CreatedAt       time.Time   `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt       time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type OfferFilter struct {
	BuyerID    *string
	PropertyID *string
	Status     *OfferStatus
	Limit      int
	Offset     int
}

type OfferRepository interface {
	Create(ctx context.Context, offer *Offer) error
	FindByID(ctx context.Context, id string) (*Offer, error)
	FindByLoiNumber(ctx context.Context, number string) (*Offer, error)
	Update(ctx context.Context, offer *Offer) error
	List(ctx context.Context, filter OfferFilter) ([]Offer, int64, error)
}
