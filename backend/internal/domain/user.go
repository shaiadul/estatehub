package domain

import (
	"context"
	"time"
)

type UserRole string

const (
	RoleBuyer     UserRole = "buyer"
	RoleSeller    UserRole = "seller"
	RoleBroker    UserRole = "broker"
	RoleOrganizer UserRole = "broker" // alias
	RoleAdmin     UserRole = "admin"
)

type KYCStatus string

const (
	KYCStatusPending  KYCStatus = "pending"
	KYCStatusVerified KYCStatus = "verified"
	KYCStatusRejected KYCStatus = "rejected"
	KYCStatusExempt   KYCStatus = "exempt"
)

type User struct {
	ID           string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Email        string    `json:"email" gorm:"uniqueIndex;not null;size:255"`
	PasswordHash string    `json:"-" gorm:"not null"`
	FullName     string    `json:"full_name" gorm:"not null;size:255"`
	Role         UserRole  `json:"role" gorm:"type:varchar(50);not null;default:'buyer';index"`
	Title        string    `json:"title" gorm:"size:255"`
	EntityName   string    `json:"entity_name" gorm:"size:255"`
	Phone        string    `json:"phone" gorm:"size:50"`
	AvatarURL    string    `json:"avatar_url" gorm:"size:1024"`
	KYCStatus    KYCStatus `json:"kyc_status" gorm:"type:varchar(50);default:'pending';index"`
	Accredited   bool      `json:"accredited" gorm:"default:false;index"`
	NetWorthTier string    `json:"net_worth_tier" gorm:"size:100"`
	Jurisdiction string    `json:"jurisdiction" gorm:"size:100"`
	IsFrozen     bool      `json:"is_frozen" gorm:"default:false"`
	LastLoginAt  *time.Time `json:"last_login_at"`
	CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt    time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

type UserFilter struct {
	Role       *UserRole
	KYCStatus  *KYCStatus
	Accredited *bool
	Search     string
	Limit      int
	Offset     int
}

type UserRepository interface {
	Create(ctx context.Context, user *User) error
	FindByID(ctx context.Context, id string) (*User, error)
	FindByEmail(ctx context.Context, email string) (*User, error)
	Update(ctx context.Context, user *User) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter UserFilter) ([]User, int64, error)
	CountByRole(ctx context.Context) (map[UserRole]int64, error)
}
