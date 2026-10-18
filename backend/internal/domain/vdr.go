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
	ID             string      `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	PropertyID     string      `json:"property_id" gorm:"type:uuid;not null;index"`
	Property       *Property   `json:"property,omitempty" gorm:"foreignKey:PropertyID"`
	Title          string      `json:"title" gorm:"not null;size:255"`
	Category       VdrCategory `json:"category" gorm:"type:varchar(100);not null;index"`
	FileKey        string      `json:"file_key" gorm:"type:varchar(512);not null"`
	FileSizeBytes  int64       `json:"file_size_bytes" gorm:"not null"`
	FileType       string      `json:"file_type" gorm:"type:varchar(100);default:'application/pdf'"`
	Sha256Checksum string      `json:"sha256_checksum" gorm:"type:varchar(64)"`
	Classification string      `json:"classification" gorm:"type:varchar(50);default:'restricted';index"`
	WatermarkText  string      `json:"watermark_text,omitempty" gorm:"type:varchar(255)"`
	UploadedBy     string      `json:"uploaded_by" gorm:"type:uuid;not null"`
	// Aliases for backward compatibility
	StorageKey     string      `json:"storage_key,omitempty" gorm:"-"`
	SizeMB         float64     `json:"size_mb,omitempty" gorm:"-"`
	Sha256         string      `json:"sha256,omitempty" gorm:"-"`
	Badge          string      `json:"badge,omitempty" gorm:"-"`
	Source         string      `json:"source,omitempty" gorm:"-"`
	IsRestricted   bool        `json:"is_restricted,omitempty" gorm:"-"`
	CreatedAt      time.Time   `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt      time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type VdrFilter struct {
	Category       *VdrCategory
	Classification *string
	Search         string
	Limit          int
	Offset         int
	SortBy         string
}

type VdrAccessLog struct {
	ID         string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	DocumentID string    `json:"document_id" gorm:"type:uuid;not null;index"`
	UserID     string    `json:"user_id" gorm:"type:uuid;not null;index"`
	Action     string    `json:"action" gorm:"size:50"` // "preview", "download", "export"
	IPAddress  string    `json:"ip_address" gorm:"size:50"`
	UserAgent  string    `json:"user_agent" gorm:"type:text"`
	CreatedAt  time.Time `json:"created_at" gorm:"autoCreateTime;index"`
}

type VdrRepository interface {
	CreateDocument(ctx context.Context, doc *VdrDocument) error
	FindDocumentByID(ctx context.Context, id string) (*VdrDocument, error)
	ListDocumentsByProperty(ctx context.Context, propertyID string, filter VdrFilter) ([]VdrDocument, error)
	DeleteDocument(ctx context.Context, id string) error
	LogAccess(ctx context.Context, log *VdrAccessLog) error
	ListAccessLogs(ctx context.Context, propertyID string, limit int) ([]VdrAccessLog, error)
}
