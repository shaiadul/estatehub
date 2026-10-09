package domain

import (
	"context"
	"time"
)

type ClosingStatus string

const (
	ClosingStatusActive  ClosingStatus = "Active"
	ClosingStatusSettled ClosingStatus = "Settled"
	ClosingStatusFrozen  ClosingStatus = "Frozen"
)

type ClosingRoom struct {
	ID                  string        `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	ContractNumber      string        `json:"contract_number" gorm:"uniqueIndex;not null;size:100"`
	PropertyID          string        `json:"property_id" gorm:"type:uuid;not null;index"`
	Property            *Property     `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	BuyerID             string        `json:"buyer_id" gorm:"type:uuid;not null;index"`
	Buyer               *User         `json:"buyer,omitempty" gorm:"foreignKey:BuyerID"`
	SellerID            string        `json:"seller_id" gorm:"type:uuid;not null;index"`
	Seller              *User         `json:"seller,omitempty" gorm:"foreignKey:SellerID"`
	EscrowOfficer       string        `json:"escrow_officer" gorm:"size:255;default:'Cheryl Vance'"`
	EscrowFileNumber    string        `json:"escrow_file_number" gorm:"size:100;default:'#FATCO-LA-88192-ZH'"`
	DepositoryBank      string        `json:"depository_bank" gorm:"size:255;default:'JPMorgan Chase Bank, N.A.'"`
	ContractPrice       float64       `json:"contract_price" gorm:"not null"`
	EarnestAmount       float64       `json:"earnest_amount" gorm:"not null"`
	BalanceToClose      float64       `json:"balance_to_close" gorm:"not null"`
	PhasePSAExecuted    bool          `json:"phase_psa_executed" gorm:"default:true"`
	PhaseEarnestLocked  bool          `json:"phase_earnest_locked" gorm:"default:true"`
	PhaseWireDisbursed  bool          `json:"phase_wire_disbursed" gorm:"default:false;index"`
	PhaseDeedRecorded   bool          `json:"phase_deed_recorded" gorm:"default:false"`
	WireTransactionID   string        `json:"wire_transaction_id" gorm:"size:100"`
	DeedRecordingNumber string        `json:"deed_recording_number" gorm:"size:100"`
	Status              ClosingStatus `json:"status" gorm:"type:varchar(50);not null;default:'Active';index"`
	EscrowExpiresAt     time.Time     `json:"escrow_expires_at"`
	CreatedAt           time.Time     `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt           time.Time     `json:"updated_at" gorm:"autoUpdateTime"`
}

type ClosingFilter struct {
	UserID     *string
	PropertyID *string
	Status     *ClosingStatus
	Limit      int
	Offset     int
}

type ClosingRepository interface {
	Create(ctx context.Context, room *ClosingRoom) error
	FindByID(ctx context.Context, id string) (*ClosingRoom, error)
	FindByContractNumber(ctx context.Context, contractNum string) (*ClosingRoom, error)
	Update(ctx context.Context, room *ClosingRoom) error
	List(ctx context.Context, filter ClosingFilter) ([]ClosingRoom, int64, error)
}
