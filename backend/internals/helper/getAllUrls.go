package helper

import (
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func GetAllUrls(anonymousId string) ([]models.URL, bool) {
	var allUrls []models.URL

	if err := db.DB.Find(&allUrls, "user_anonymous_id = ?", anonymousId).Error; err != nil {
		return allUrls, false
	}

	return allUrls, true
}
