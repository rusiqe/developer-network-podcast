package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"developer-network-backend/models"
)

// NewsletterHandler handles newsletter subscription API requests
func NewsletterHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var subscriber models.NewsletterSubscriber
	if err := json.NewDecoder(r.Body).Decode(&subscriber); err != nil {
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	// Add the current timestamp
	subscriber.CreatedAt = time.Now()

	// Mock link to LinkedIn API
	// You would place your LinkedIn API call here
	// log.Printf("Syncing with LinkedIn: %v", subscriber)
	// LinkedInAPI.AddSubscriber(subscriber)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Successfully subscribed!"})
}

