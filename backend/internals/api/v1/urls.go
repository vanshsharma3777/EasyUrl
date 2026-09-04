package v1

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/lithammer/shortuuid/v4"
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/internals/helper"
	"github.com/vanshsharma3777/EasyUrl/internals/middleware"
	"github.com/vanshsharma3777/EasyUrl/models"
)

type CreateURLRequest struct {
	Url string `json:"url"`
}

func Url(w http.ResponseWriter, r *http.Request) {
	anonyousId := r.Context().Value(middleware.ContextAnonymousId).(string)

	var requestUrl CreateURLRequest

	err := json.NewDecoder(r.Body).Decode(&requestUrl)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	checkUrlExists, ok := helper.CheckUrl(requestUrl.Url)

	if ok == true {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusAccepted)
		json.NewEncoder(w).Encode(checkUrlExists)

		if err != nil {
			log.Println("failed to encode JSON response:", err)
			return
		}

		return
	}
	shortUrlCode := shortuuid.New()[:6]
	shortUrl := "http//easyurl.com/v1/" + shortUrlCode

	if len(shortUrlCode)|len(shortUrl) == 0 {
		http.Error(w, "Internal Server Error in creating the ShortCode for URL", http.StatusInternalServerError)
		return
	}

	url := models.URL{
		OriginalUrl:     requestUrl.Url,
		ShortUrl:        shortUrl,
		QRCodeUrl:       "Currently not available",
		UserAnonymousID: anonyousId,
	}

	result := db.DB.Create(&url)
	if result.Error != nil {
		http.Error(w, "Internal Server Error in storing", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id":          url.ID,
		"originalUrl": url.OriginalUrl,
		"shortUrl":    url.ShortUrl,
		"anonyousId":  url.UserAnonymousID,
		"msg":         "SHort url created successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Println("failed to encode JSON response:", err)
		return
	}
}
