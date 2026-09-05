package v1

import (
	"fmt"
	"net/http"
	"os"

	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func RedirectUrl(w http.ResponseWriter, r *http.Request) {
	var shortCode string
	shortCode = r.PathValue("shortCode")

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
	http.Redirect(w, r, OriginalUrlData.OriginalUrl, http.StatusFound)

}
