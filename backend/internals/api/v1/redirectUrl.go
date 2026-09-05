package v1

import (
	"fmt"
	"net/http"
	"os"

	"github.com/vanshsharma3777/EasyUrl/internals/cache"
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func RedirectUrl(w http.ResponseWriter, r *http.Request) {
	var shortCode string
	shortCode = r.PathValue("shortCode")
	fmt.Println("came in redirect")
	originalURL, err := cache.GetURL(shortCode)

	if err == nil {
		fmt.Println("cache hit")
		http.Redirect(w, r, originalURL, http.StatusFound)
		return
	}

	shortUrl := os.Getenv("DEPLOYMENT_DOMAIN_NAME") + shortCode
	fmt.Println("shortUrl", shortUrl)

	var OriginalUrlData models.URL
	result := db.DB.Where("short_url = ?", shortUrl).Find(&OriginalUrlData)
	fmt.Println("result", result)

	if result.Error != nil {
		fmt.Println("error is \n", result.Error)
		http.Error(w, "Internal server error in Redirecting", http.StatusInternalServerError)
		return
	}

	err = cache.SetURL(shortCode, OriginalUrlData.OriginalUrl)
	if err != nil {
		fmt.Println("Redis SET failed:", err)
	}
	fmt.Println("cache missed but now cached from DB")
	http.Redirect(w, r, OriginalUrlData.OriginalUrl, http.StatusFound)

}
