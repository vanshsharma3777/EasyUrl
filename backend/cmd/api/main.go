package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/vanshsharma3777/EasyUrl/internals/api"
	v1 "github.com/vanshsharma3777/EasyUrl/internals/api/v1"
	"github.com/vanshsharma3777/EasyUrl/internals/db"
	"github.com/vanshsharma3777/EasyUrl/internals/middleware"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("failed to load env")
	}

	db.Init(os.Getenv("DATABSE_URL"))
	mux := http.NewServeMux()

	mux.HandleFunc("GET /api/test", middleware.Recover(middleware.Anonymous(api.Test)))
	mux.HandleFunc("POST /api/v1/url", middleware.Recover(middleware.Anonymous(v1.Url)))
	mux.HandleFunc("GET /api/v1/get-urls", middleware.Recover(middleware.Anonymous(v1.GetUrls)))
	mux.HandleFunc("GET /api/v1/redirect/{shortCode}", middleware.Recover(v1.RedirectUrl))

	fmt.Println("Server is running on http://localhost:8080")
	errs := http.ListenAndServe(":8080", mux)
	if errs != nil {
		fmt.Printf("Error starting server: %s\n", errs)
	}
}
