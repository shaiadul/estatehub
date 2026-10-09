package domain

import (
	"context"
	"time"
)

type AuditLog struct {
	ID            string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID        *string   `json:"user_id" gorm:"type:uuid;index"`
	UserEmail     string    `json:"user_email" gorm:"size:255;index"`
	Action        string    `json:"action" gorm:"size:100;not null;index"`
	Resource      string    `json:"resource" gorm:"size:255"`
	Details       string    `json:"details" gorm:"type:text"`
	IPAddress     string    `json:"ip_address" gorm:"size:50"`
	UserAgent     string    `json:"user_agent" gorm:"size:255"`
	GeoLocation   string    `json:"geo_location" gorm:"size:100"`
	HashSignature string    `json:"hash_signature" gorm:"size:128"`
	CreatedAt     time.Time `json:"created_at" gorm:"autoCreateTime;index"`
}

type AuditFilter struct {
	UserEmail *string
	Action    *string
	Limit     int
	Offset    int
}

type AuditRepository interface {
	Create(ctx context.Context, log *AuditLog) error
	List(ctx context.Context, filter AuditFilter) ([]AuditLog, int64, error)
}
