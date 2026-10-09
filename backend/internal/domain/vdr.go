package domain

import (
	"context"
	"time"
)

type VdrCategory string

const (
	VdrCategoryLegal       VdrCategory = "legal"
	VdrCategoryEngineering VdrCategory = "engineering"
	VdrCategoryFinancial   VdrCategory = "financial"
	VdrCategoryPermits     VdrCategory = "permits"
)

type VdrDocument struct {
	ID           string      `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID   string      `json:"property_id" gorm:"type:uuid;not null;index"`
	Property     *Property   `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	Title        string      `json:"title" gorm:"not null;size:255"`
	Badge        string      `json:"badge" gorm:"size:100"`
	Category     VdrCategory `json:"category" gorm:"type:varchar(50);not null;index"`
	Source       string      `json:"source" gorm:"size:255"`
	SizeMB       float64     `json:"size_mb" gorm:"not null"`
	Sha256       string      `json:"sha256" gorm:"size:64"`
	StorageKey   string      `json:"storage_key" gorm:"not null;size:512"`
	IsRestricted bool        `json:"is_restricted" gorm:"default:false"`
	CreatedAt    time.Time   `json:"created_at" gorm:"autoCreateTime"`
}

type VdrAccessLog struct {
	ID         string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	DocumentID string    `json:"document_id" gorm:"type:uuid;not null;index"`
	UserID     string    `json:"user_id" gorm:"type:uuid;not null;index"`
	Action     string    `json:"action" gorm:"size:50"` // "preview", "download", "export"
	IPAddress  string    `json:"ip_address" gorm:"size:50"`
	UserAgent  string    `json:"user_agent" gorm:"size:255"`
	CreatedAt  time.Time `json:"created_at" gorm:"autoCreateTime;index"`
}

type VdrRepository interface {
	CreateDocument(ctx context.Context, doc *VdrDocument) error
	FindDocumentByID(ctx context.Context, id string) (*VdrDocument, error)
	ListDocumentsByProperty(ctx context.Context, propertyID string, category *VdrCategory) ([]VdrDocument, error)
	DeleteDocument(ctx context.Context, id string) error
	LogAccess(ctx context.Context, log *VdrAccessLog) error
	ListAccessLogs(ctx context.Context, propertyID string, limit int) ([]VdrAccessLog, error)
}
