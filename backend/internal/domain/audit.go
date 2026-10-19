package domain

import (
	"context"
	"encoding/json"
	"time"
)

type AuditLog struct {
	ID           string    `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	ActorID      *string   `json:"actor_id,omitempty" gorm:"column:actor_id;type:uuid;index"`
	ActorEmail   string    `json:"actor_email" gorm:"column:actor_email;size:255;index"`
	ActorRole    string    `json:"actor_role" gorm:"column:actor_role;size:50;default:'system';index"`
	Action       string    `json:"action" gorm:"column:action;size:100;not null;index"`
	ResourceType string    `json:"resource_type" gorm:"column:resource_type;size:100;default:'system';index"`
	ResourceID   string    `json:"resource_id" gorm:"column:resource_id;size:255;default:'';index"`
	Payload      string    `json:"payload,omitempty" gorm:"column:payload;type:jsonb"`
	IPAddress    string    `json:"ip_address,omitempty" gorm:"column:ip_address;size:50"`
	UserAgent    string    `json:"user_agent,omitempty" gorm:"column:user_agent;type:text"`
	CreatedAt    time.Time `json:"created_at" gorm:"column:created_at;autoCreateTime;index"`

	// Aliases for compatibility
	UserID        *string `json:"user_id,omitempty" gorm:"-"`
	UserEmail     string  `json:"user_email,omitempty" gorm:"-"`
	Resource      string  `json:"resource,omitempty" gorm:"-"`
	Details       string  `json:"details,omitempty" gorm:"-"`
	GeoLocation   string  `json:"geo_location,omitempty" gorm:"-"`
	HashSignature string  `json:"hash_signature,omitempty" gorm:"-"`
}

func (a *AuditLog) Normalize() {
	if a.ActorID == nil && a.UserID != nil {
		a.ActorID = a.UserID
	}
	if a.ActorEmail == "" && a.UserEmail != "" {
		a.ActorEmail = a.UserEmail
	}
	if a.ActorRole == "" {
		a.ActorRole = "member"
	}
	if a.ResourceType == "" {
		if a.Resource != "" {
			a.ResourceType = a.Resource
		} else {
			a.ResourceType = "general"
		}
	}
	if a.ResourceID == "" && a.Resource != "" {
		a.ResourceID = a.Resource
	}
	if a.Payload == "" {
		if a.Details != "" {
			b, _ := json.Marshal(map[string]string{"details": a.Details})
			a.Payload = string(b)
		} else {
			a.Payload = "{}"
		}
	}
	// Sync back aliases for json response
	a.UserID = a.ActorID
	a.UserEmail = a.ActorEmail
	a.Resource = a.ResourceType
	if a.Details == "" {
		a.Details = a.Action + " on " + a.ResourceType
	}
}

type AuditFilter struct {
	UserEmail    *string
	Action       *string
	ActorRole    *string
	ResourceType *string
	Search       string
	Limit        int
	Offset       int
}

type AuditRepository interface {
	Create(ctx context.Context, log *AuditLog) error
	List(ctx context.Context, filter AuditFilter) ([]AuditLog, int64, error)
}
