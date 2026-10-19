package postgres

import (
	"context"
	"errors"
	"strings"

	"github.com/estatehub/backend/internal/domain"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ClosingRepository struct {
	db *gorm.DB
}

func NewClosingRepository(db *gorm.DB) *ClosingRepository {
	return &ClosingRepository{db: db}
}

func populateClosingRoom(room *domain.ClosingRoom) {
	if room == nil {
		return
	}
	if room.TotalPrice == 0 && room.ContractPrice > 0 {
		room.TotalPrice = room.ContractPrice
	}
	if room.ContractPrice == 0 && room.TotalPrice > 0 {
		room.ContractPrice = room.TotalPrice
	}
	if room.EscrowDeposit == 0 && room.EarnestAmount > 0 {
		room.EscrowDeposit = room.EarnestAmount
	}
	if room.EarnestAmount == 0 && room.EscrowDeposit > 0 {
		room.EarnestAmount = room.EscrowDeposit
	}
	if room.RemainingBalance == 0 && room.BalanceToClose > 0 {
		room.RemainingBalance = room.BalanceToClose
	}
	if room.BalanceToClose == 0 && room.RemainingBalance > 0 {
		room.BalanceToClose = room.RemainingBalance
	}
	if room.Stage == "" {
		room.Stage = domain.ClosingStageEscrowFunding
	}
	if room.ID == "" {
		room.ID = uuid.NewString()
	}
	if room.ContractNumber == "" {
		if len(room.ID) >= 8 {
			room.ContractNumber = "PSA-" + strings.ToUpper(room.ID[:8])
		} else {
			room.ContractNumber = "PSA-" + strings.ToUpper(uuid.NewString()[:8])
		}
	}
	if room.PhaseWireDisbursed {
		room.FidoWireAuthorized = true
	}
	if room.FidoWireAuthorized {
		room.PhaseWireDisbursed = true
	}
	if room.PhaseDeedRecorded {
		room.DeedRecorded = true
	}
	if room.DeedRecorded {
		room.PhaseDeedRecorded = true
	}
}

func (r *ClosingRepository) Create(ctx context.Context, room *domain.ClosingRoom) error {
	populateClosingRoom(room)
	return r.db.WithContext(ctx).Create(room).Error
}

func (r *ClosingRepository) FindByID(ctx context.Context, id string) (*domain.ClosingRoom, error) {
	var room domain.ClosingRoom
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").Preload("Seller").First(&room, "id = ?", id).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	populateClosingRoom(&room)
	return &room, nil
}

func (r *ClosingRepository) FindByContractNumber(ctx context.Context, contractNum string) (*domain.ClosingRoom, error) {
	var room domain.ClosingRoom
	err := r.db.WithContext(ctx).Preload("Property").Preload("Buyer").Preload("Seller").First(&room, "contract_number = ?", contractNum).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, domain.ErrNotFound
		}
		return nil, err
	}
	populateClosingRoom(&room)
	return &room, nil
}

func (r *ClosingRepository) Update(ctx context.Context, room *domain.ClosingRoom) error {
	populateClosingRoom(room)
	return r.db.WithContext(ctx).Save(room).Error
}

func (r *ClosingRepository) List(ctx context.Context, filter domain.ClosingFilter) ([]domain.ClosingRoom, int64, error) {
	var rooms []domain.ClosingRoom
	var total int64

	q := r.db.WithContext(ctx).Model(&domain.ClosingRoom{}).Preload("Property").Preload("Buyer").Preload("Seller")

	if filter.UserID != nil {
		q = q.Where("buyer_id = ? OR seller_id = ?", *filter.UserID, *filter.UserID)
	}
	if filter.PropertyID != nil {
		q = q.Where("property_id = ?", *filter.PropertyID)
	}
	if filter.Stage != nil {
		q = q.Where("stage = ?", *filter.Stage)
	}

	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}

	limit := filter.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	err := q.Order("created_at DESC").Limit(limit).Offset(filter.Offset).Find(&rooms).Error
	if err != nil {
		return nil, 0, err
	}

	for i := range rooms {
		populateClosingRoom(&rooms[i])
	}

	return rooms, total, nil
}
