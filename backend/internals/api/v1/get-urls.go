package v1

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/vanshsharma3777/EasyUrl/internals/helper"
	"github.com/vanshsharma3777/EasyUrl/internals/middleware"
	"github.com/vanshsharma3777/EasyUrl/models"
)

func GetUrls(w http.ResponseWriter, r *http.Request) {
	anonymousId := r.Context().Value(middleware.ContextAnonymousId).(string)

	urls, ok := helper.GetAllUrls(anonymousId)
	if ok == false {
		errorMessage := "Internal Server Error"
		err := json.NewEncoder(w).Encode(errorMessage)

		if err != nil {
			fmt.Println("failed to encode JSON response:", err)
			return
		}
	}

	if len(urls) == 0 {
		fmt.Println("came here in error no url found")
		err := json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "No short URL created yet",
			"urls":    []models.URL{},
		})

		if err != nil {
			fmt.Println("failed to encode JSON response:", err)
			return
		}
	}

	err := json.NewEncoder(w).Encode(urls)

	if err != nil {
		fmt.Println("failed to encode JSON response:", err)
		return
	}
}
