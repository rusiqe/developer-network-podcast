package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"developer-network-backend/models"
	"developer-network-backend/services"

	"github.com/joho/godotenv"
)

var linkedinService *services.LinkedInService

func init() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize LinkedIn service
	linkedinService = services.NewLinkedInService()
}

// enableCORS handles CORS for all requests
func enableCORS(w http.ResponseWriter, r *http.Request) {
	allowedOrigins := os.Getenv("ALLOWED_ORIGINS")
	if allowedOrigins == "" {
		allowedOrigins = "http://localhost:3000,http://localhost:3001"
	}

	origin := r.Header.Get("Origin")
	for _, allowed := range strings.Split(allowedOrigins, ",") {
		if strings.TrimSpace(allowed) == origin {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			break
		}
	}

	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
}

// handleDeveloperSubmission handles developer form submissions
func handleDeveloperSubmission(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse JSON body
	var developer models.Developer
	if err := json.NewDecoder(r.Body).Decode(&developer); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	// Add timestamp
	developer.CreatedAt = time.Now()

	// Log received data
	log.Printf("Received developer submission: %+v", developer)

	// Create newsletter subscriber from developer data
	subscriber := models.NewsletterSubscriber{
		Email:     developer.Email,
		FirstName: developer.FirstName,
		LastName:  developer.LastName,
		Source:    "podcast_interview_form",
		CreatedAt: developer.CreatedAt,
	}

	// Sync with LinkedIn newsletter (if credentials are available)
	if os.Getenv("LINKEDIN_ACCESS_TOKEN") != "" {
		if err := linkedinService.AddSubscriber(subscriber); err != nil {
			log.Printf("Failed to sync with LinkedIn: %v", err)
			// Don't fail the request if LinkedIn sync fails
		}
	} else {
		log.Println("LinkedIn credentials not configured, skipping sync")
	}

	// Respond with success
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"success": true,
		"message": "Successfully submitted! We'll be in touch soon.",
		"id":      developer.CreatedAt.Unix(), // Use timestamp as simple ID
	})
}

// handleHealthCheck provides a simple health check endpoint
func handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status": "healthy",
		"time":   time.Now().Unix(),
	})
}

func main() {
	// Set up routes
	http.HandleFunc("/api/developer/submit", handleDeveloperSubmission)
	http.HandleFunc("/api/health", handleHealthCheck)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🚀 Developer Network Backend starting on port %s\n", port)
	fmt.Printf("📧 Newsletter sync: %s\n", func() string {
		if os.Getenv("LINKEDIN_ACCESS_TOKEN") != "" {
			return "✅ LinkedIn configured"
		}
		return "⚠️  LinkedIn not configured"
	}())

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
