package domain

import (
	"context"
	"time"
)

type ClosingStage string

const (
	ClosingStageEscrowFunding     ClosingStage = "escrow_funding"
	ClosingStageTitleVerification ClosingStage = "title_verification"
	ClosingStageFidoWire          ClosingStage = "fido_wire"
	ClosingStageDeedRecording     ClosingStage = "deed_recording"
	ClosingStageSettled           ClosingStage = "settled"
)

type ClosingRoom struct {
	ID                   string       `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID           string       `json:"property_id" gorm:"type:uuid;not null;index"`
	Property             *Property    `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	BuyerID              string       `json:"buyer_id" gorm:"type:uuid;not null;index"`
	Buyer                *User        `json:"buyer,omitempty" gorm:"foreignKey:BuyerID"`
	SellerID             string       `json:"seller_id" gorm:"type:uuid;not null;index"`
	Seller               *User        `json:"seller,omitempty" gorm:"foreignKey:SellerID"`
	EscrowAgentID        *string      `json:"escrow_agent_id,omitempty" gorm:"type:uuid;index"`
	TotalPrice           float64      `json:"total_price" gorm:"not null"`
	EscrowDeposit        float64      `json:"escrow_deposit" gorm:"not null"`
	RemainingBalance     float64      `json:"remaining_balance" gorm:"not null"`
	Stage                ClosingStage `json:"stage" gorm:"type:varchar(50);not null;default:'escrow_funding';index"`
	SmartContractAddress string       `json:"smart_contract_address,omitempty" gorm:"size:100"`
	TitleSearchVerified  bool         `json:"title_search_verified" gorm:"default:false"`
	FidoWireAuthorized   bool         `json:"fido_wire_authorized" gorm:"default:false"`
	DeedRecorded         bool         `json:"deed_recorded" gorm:"default:false"`
	ClosingDate          *time.Time   `json:"closing_date,omitempty"`

	// Aliases & Extended metadata for bilateral escrow desk
	ContractNumber      string    `json:"contract_number,omitempty" gorm:"size:100"`
	EscrowOfficer       string    `json:"escrow_officer,omitempty" gorm:"size:255;default:'Cheryl Vance'"`
	EscrowFileNumber    string    `json:"escrow_file_number,omitempty" gorm:"size:100;default:'#FATCO-LA-88192-ZH'"`
	DepositoryBank      string    `json:"depository_bank,omitempty" gorm:"size:255;default:'JPMorgan Chase Bank, N.A.'"`
	ContractPrice       float64   `json:"contract_price,omitempty" gorm:"-"`
	EarnestAmount       float64   `json:"earnest_amount,omitempty" gorm:"-"`
	BalanceToClose      float64   `json:"balance_to_close,omitempty" gorm:"-"`
	PhasePSAExecuted    bool      `json:"phase_psa_executed,omitempty" gorm:"-"`
	PhaseEarnestLocked  bool      `json:"phase_earnest_locked,omitempty" gorm:"-"`
	PhaseWireDisbursed  bool      `json:"phase_wire_disbursed,omitempty" gorm:"-"`
	PhaseDeedRecorded   bool      `json:"phase_deed_recorded,omitempty" gorm:"-"`
	WireTransactionID   string    `json:"wire_transaction_id,omitempty" gorm:"size:100"`
	DeedRecordingNumber string    `json:"deed_recording_number,omitempty" gorm:"size:100"`
	Status              string    `json:"status,omitempty" gorm:"type:varchar(50);default:'Active'"`
	EscrowExpiresAt     time.Time `json:"escrow_expires_at,omitempty"`
	CreatedAt           time.Time `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt           time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type ClosingFilter struct {
	UserID     *string
	PropertyID *string
	Stage      *ClosingStage
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
