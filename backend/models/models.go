package models

type URL struct {
	ID          string `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	OriginalUrl string `gorm:"not null"`
	ShortUrl    string `gorm:"uniqueIndex;not null"`
	QRCodeUrl   []byte `gorm:"type:bytea"`

	UserAnonymousID string `gorm:"index"`
}

type CreateURLRequest struct {
	Url string `json:"url"`
}
