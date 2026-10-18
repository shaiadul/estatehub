package domain

import (
	"context"
	"database/sql/driver"
	"encoding/hex"
	"encoding/json"
	"strings"
	"time"
)

type StringArray []string

func (a StringArray) Value() (driver.Value, error) {
	if a == nil {
		return "[]", nil
	}
	b, err := json.Marshal(a)
	if err != nil {
		return "[]", nil
	}
	return string(b), nil
}

func (a *StringArray) Scan(value interface{}) error {
	if value == nil {
		*a = []string{}
		return nil
	}

	var str string
	switch v := value.(type) {
	case []byte:
		str = string(v)
	case string:
		str = v
	default:
		*a = []string{}
		return nil
	}

	str = strings.TrimSpace(str)
	if str == "" || str == "null" || str == "{}" || str == "[]" {
		*a = []string{}
		return nil
	}

	// 0. Decode Postgres hex literal (\x... or \\x...)
	cleanHex := str
	for strings.HasPrefix(cleanHex, "\\") {
		cleanHex = cleanHex[1:]
	}
	if strings.HasPrefix(cleanHex, "x") || strings.HasPrefix(cleanHex, "X") {
		if decoded, err := hex.DecodeString(cleanHex[1:]); err == nil {
			str = string(decoded)
		}
	}

	// 1. Try standard JSON unmarshal
	if err := json.Unmarshal([]byte(str), a); err == nil {
		return nil
	}

	// 2. Handle unquoted or double-escaped JSON string
	var unescaped string
	if err := json.Unmarshal([]byte(str), &unescaped); err == nil {
		if err := json.Unmarshal([]byte(unescaped), a); err == nil {
			return nil
		}
	}

	// 3. Handle PostgreSQL native array format: {"item1","item2"}
	if strings.HasPrefix(str, "{") && strings.HasSuffix(str, "}") {
		inner := str[1 : len(str)-1]
		if inner == "" {
			*a = []string{}
			return nil
		}
		parts := strings.Split(inner, ",")
		res := make([]string, 0, len(parts))
		for _, p := range parts {
			clean := strings.Trim(strings.TrimSpace(p), "\"")
			clean = strings.ReplaceAll(clean, "\\\"", "\"")
			clean = strings.ReplaceAll(clean, "\\\\", "\\")
			if clean != "" {
				res = append(res, clean)
			}
		}
		*a = res
		return nil
	}

	// 4. Fallback: single item array
	*a = []string{str}
	return nil
}

type Property struct {
	ID                string      `json:"id" gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Slug              string      `json:"slug" gorm:"uniqueIndex;not null;size:255"`
	Title             string      `json:"title" gorm:"not null;size:255;index"`
	Address           string      `json:"address" gorm:"not null;size:255"`
	City              string      `json:"city" gorm:"not null;size:100;index"`
	State             string      `json:"state" gorm:"not null;size:50;index"`
	Zip               string      `json:"zip" gorm:"size:20"`
	Price             float64     `json:"price" gorm:"not null;index"`
	PriceFormatted    string      `json:"price_formatted" gorm:"size:100"`
	EstMortgage       string      `json:"est_mortgage" gorm:"size:100"`
	Beds              int         `json:"beds" gorm:"not null;index"`
	Baths             float64     `json:"baths" gorm:"not null"`
	Sqft              int         `json:"sqft" gorm:"not null;index"`
	SqftFormatted     string      `json:"sqft_formatted" gorm:"size:50"`
	LotSize           string      `json:"lot_size" gorm:"size:100"`
	YearBuilt         int         `json:"year_built"`
	Garage            int         `json:"garage"`
	PropertyType      string      `json:"property_type" gorm:"type:varchar(50);not null;index"`
	TransactionType   string      `json:"transaction_type" gorm:"type:varchar(50);not null;default:'buy';index"`
	Badge             string      `json:"badge" gorm:"size:100"`
	Status            string      `json:"status" gorm:"type:varchar(50);not null;default:'Active Listing';index"`
	ViewsCount        int         `json:"views_count" gorm:"default:0"`
	DaysListed        int         `json:"days_listed" gorm:"default:1"`
	MlsID             string      `json:"mls_id" gorm:"uniqueIndex;size:100"`
	Latitude          float64     `json:"latitude"`
	Longitude         float64     `json:"longitude"`
	HeroImage         string      `json:"hero_image" gorm:"size:1024;not null"`
	Images            StringArray `json:"images" gorm:"type:text"`
	Description       string      `json:"description" gorm:"type:text"`
	InteriorAmenities StringArray `json:"interior_amenities" gorm:"type:text"`
	ExteriorAmenities StringArray `json:"exterior_amenities" gorm:"type:text"`
	SecurityAmenities StringArray `json:"security_amenities" gorm:"type:text"`
	AssessedValue     string      `json:"assessed_value" gorm:"size:100"`
	AnnualTax         string      `json:"annual_tax" gorm:"size:100"`
	EstimatedCapRate  string      `json:"estimated_cap_rate" gorm:"size:50"`
	HoaFee            string      `json:"hoa_fee" gorm:"size:50"`
	AgentID           *string     `json:"agent_id" gorm:"type:uuid;index"`
	Agent             *User       `json:"agent,omitempty" gorm:"foreignKey:AgentID"`
	Featured          bool        `json:"featured" gorm:"default:false;index"`
	Approved          bool        `json:"approved" gorm:"default:true;index"`
	CreatedAt         time.Time   `json:"created_at" gorm:"autoCreateTime;index"`
	UpdatedAt         time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type PropertyFilter struct {
	Query           string
	City            string
	State           string
	PropertyType    string
	TransactionType string
	MinBeds         *int
	MinPrice        *float64
	MaxPrice        *float64
	Amenities       []string
	AgentID         *string
	FeaturedOnly    *bool
	ApprovedOnly    *bool
	SortBy          string // "price_asc", "price_desc", "sqft_desc", "created_desc"
	Limit           int
	Offset          int
}

type PropertyRepository interface {
	Create(ctx context.Context, property *Property) error
	FindByID(ctx context.Context, id string) (*Property, error)
	FindBySlug(ctx context.Context, slug string) (*Property, error)
	Update(ctx context.Context, property *Property) error
	Delete(ctx context.Context, id string) error
	List(ctx context.Context, filter PropertyFilter) ([]Property, int64, error)
	IncrementViews(ctx context.Context, id string) error
	Bookmark(ctx context.Context, userID, propertyID string) error
	Unbookmark(ctx context.Context, userID, propertyID string) error
	ListBookmarked(ctx context.Context, userID string) ([]Property, error)
	IsBookmarked(ctx context.Context, userID, propertyID string) (bool, error)
}
