package cache

import (
	"context"
	"encoding/json"
	"time"

	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/models"
)

// Redirect cache
func GetURL(shortCode string) (string, error) {
	return db.RedisClient.Get(
		context.Background(),
		"url:"+shortCode,
	).Result()
}

func SetURL(shortCode string, originalURL string) error {
	return db.RedisClient.Set(
		context.Background(),
		"url:"+shortCode,
		originalURL,
		2*24*time.Hour,
	).Err()
}

// Recent URLs cache
func GetRecentURLs(anonymousID string) ([]models.URL, error) {
	data, err := db.RedisClient.Get(
		context.Background(),
		"recent:"+anonymousID,
	).Result()

	if err != nil {
		return nil, err
	}

	var urls []models.URL

	err = json.Unmarshal([]byte(data), &urls)
	if err != nil {
		return nil, err
	}

	return urls, nil
}

func SetRecentURLs(anonymousID string, urls []models.URL) error {
	data, err := json.Marshal(urls)

	if err != nil {
		return err
	}

	return db.RedisClient.Set(
		context.Background(),
		"recent:"+anonymousID,
		data,
		5*time.Minute,
	).Err()
}

func DeleteRecentURLs(anonymousID string) error {
	return db.RedisClient.Del(
		context.Background(),
		"recent:"+anonymousID,
	).Err()
}
