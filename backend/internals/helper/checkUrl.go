package helper

import (
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func CheckUrl(url string) (models.URL, bool) {
	var urlExists models.URL

	err := db.DB.Where("original_url = ?", url).First(&urlExists).Error

	if err != nil {
		return urlExists, false
	}

	return urlExists, true
}
