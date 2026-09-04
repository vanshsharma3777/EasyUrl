package models

type URL struct {
	ID              string `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	OriginalUrl     string `gorm:"not null"`
	ShortUrl        string `gorm:"uniqueIndex;not null"`
	QRCodeUrl       string
	UserAnonymousID string `gorm:"index"`
}
