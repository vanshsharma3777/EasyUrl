package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"

	"github.com/google/uuid"
)

type contextKey string

const ContextAnonymousId contextKey = "anonymous_id"

func Anonymous(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("anonymous_id")
		var anonymousId string

		if errors.Is(err, http.ErrNoCookie) {
			u := uuid.New()
			anonymousId = u.String()

			http.SetCookie(w, &http.Cookie{
				Name:     "anonymous_id",
				Value:    anonymousId,
				Path:     "/",
				HttpOnly: true,
				MaxAge:   60 * 60 * 24 * 30,
			})
			fmt.Println("Generated new AnonymousId", anonymousId)
		} else if err != nil {
			fmt.Println("Anonymous value is 'nil'")
			http.Error(w, "Failed to read cookie", http.StatusBadRequest)
			return
		} else {
			anonymousId = cookie.Value
			fmt.Println("AnonymousId found", anonymousId)
		}
		ctx := context.WithValue(r.Context(), ContextAnonymousId, anonymousId)
		next.ServeHTTP(w, r.WithContext(ctx))
	}
}
