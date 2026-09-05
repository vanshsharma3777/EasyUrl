package v1

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/lithammer/shortuuid/v4"
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/internals/helper"
	"github.com/vanshsharma3777/EasyUrl/internals/middleware"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func Url(w http.ResponseWriter, r *http.Request) {
	anonyousId := r.Context().Value(middleware.ContextAnonymousId).(string)

	var requestUrl models.CreateURLRequest

	err := json.NewDecoder(r.Body).Decode(&requestUrl)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	checkUrlExists, ok := helper.CheckUrl(requestUrl.Url)

	if ok == true {
		w.Header().Set("Content-Type", "application/json")
		fmt.Println("Came here exsiting url found")
		w.WriteHeader(http.StatusAccepted)
		json.NewEncoder(w).Encode(checkUrlExists)

		if err != nil {
			log.Println("failed to encode JSON response:", err)
			return
		}

		return
	}
	shortUrlCode := shortuuid.New()[:6]
	shortUrl := os.Getenv("DEPLOYMENT_DOMAIN_NAME") + shortUrlCode
	fmt.Print("shorturl ", shortUrl)
	if len(shortUrlCode)|len(shortUrl) == 0 {
		http.Error(w, "Internal Server Error in creating the ShortCode for URL", http.StatusInternalServerError)
		return
	}

	qrCode, ok := helper.CreateQR(shortUrl)

	if ok == false {
		http.Error(w, "Internal server error in Creating the QRcode", http.StatusInternalServerError)
	}

	url := models.URL{
		OriginalUrl:     requestUrl.Url,
		ShortUrl:        shortUrl,
		QRCodeUrl:       qrCode,
		UserAnonymousID: anonyousId,
	}

	result := db.DB.Create(&url)
	if result.Error != nil {
		http.Error(w, "Internal Server Error in storing", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"ID":          url.ID,
		"OriginalUrl": url.OriginalUrl,
		"ShortUrl":    url.ShortUrl,
		"AnonyousId":  url.UserAnonymousID,
		"QrCode":      url.QRCodeUrl,
		"Msg":         "Short url created successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Println("failed to encode JSON response:", err)
		return
	}
}
