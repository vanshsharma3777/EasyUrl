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
		log.Println("No env file found using env variables")
	}

	db.Init(os.Getenv("DATABASE_URL"))
	mux := http.NewServeMux()

	mux.HandleFunc("GET /", middleware.Recover(middleware.Anonymous(api.Test)))
	mux.HandleFunc("POST /api/v1/url", middleware.Recover(middleware.Anonymous(v1.Url)))
	mux.HandleFunc("GET /api/v1/get-urls", middleware.Recover(middleware.Anonymous(v1.GetUrls)))
	mux.HandleFunc("GET /{shortCode}", middleware.Recover(v1.RedirectUrl))

	handler := middleware.CORS(mux)

	port := os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}
	fmt.Println("Server is running on http://localhost:8080")
	err = http.ListenAndServe(":"+port, handler)
	if err != nil {
		log.Fatal(err)
	}
}
