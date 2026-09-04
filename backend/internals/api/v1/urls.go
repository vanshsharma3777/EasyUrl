package v1

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type CreateURLRequest struct {
	Url string `json:"url"`
}

func Url(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Hit api/v1/urls.go")
	//	anonyousId := r.Context().Value(middleware.ContextAnonymousId).(string)

	var requestUrl CreateURLRequest

	err := json.NewDecoder(r.Body).Decode(&requestUrl)

	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	fmt.Printf("%s \n", requestUrl.Url)

}
