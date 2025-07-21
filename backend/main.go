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
var airtableService *services.AirtableService

func init() {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize services
	linkedinService = services.NewLinkedInService()
	airtableService = services.NewAirtableService()
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

	// Save to Airtable (if credentials are available)
	if os.Getenv("AIRTABLE_API_KEY") != "" {
		if err := airtableService.AddDeveloper(developer); err != nil {
			log.Printf("Failed to save to Airtable: %v", err)
			// Don't fail the request if Airtable sync fails
		}
	} else {
		log.Println("Airtable credentials not configured, skipping save")
	}

	// Optional: Also sync with LinkedIn newsletter (if both services are configured)
	if os.Getenv("LINKEDIN_ACCESS_TOKEN") != "" {
		subscriber := models.NewsletterSubscriber{
			Email:     developer.Email,
			FirstName: developer.FirstName,
			LastName:  developer.LastName,
			Source:    "podcast_interview_form",
			CreatedAt: developer.CreatedAt,
		}
		if err := linkedinService.AddSubscriber(subscriber); err != nil {
			log.Printf("Failed to sync with LinkedIn: %v", err)
		}
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

// handleLinkedInAuth generates LinkedIn OAuth URL
func handleLinkedInAuth(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	redirectURI := "http://localhost:8080/api/linkedin/callback"
	state := "developer-network-podcast"
	
	oauthURL := linkedinService.GetOAuthURL(redirectURI, state)
	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"oauth_url": oauthURL,
		"message":   "Visit this URL to authorize the application",
	})
}

// handleLinkedInCallback handles LinkedIn OAuth callback
func handleLinkedInCallback(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	code := r.URL.Query().Get("code")
	state := r.URL.Query().Get("state")
	
	if code == "" {
		http.Error(w, "Authorization code not provided", http.StatusBadRequest)
		return
	}
	
	if state != "developer-network-podcast" {
		http.Error(w, "Invalid state parameter", http.StatusBadRequest)
		return
	}
	
	redirectURI := "http://localhost:8080/api/linkedin/callback"
	accessToken, err := linkedinService.ExchangeCodeForToken(code, redirectURI)
	if err != nil {
		log.Printf("Failed to exchange code for token: %v", err)
		http.Error(w, "Failed to get access token", http.StatusInternalServerError)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token": accessToken,
		"message":      "Add this access token to your .env file as LINKEDIN_ACCESS_TOKEN",
	})
}

// handleManualTokenExchange handles manual code-to-token exchange
func handleManualTokenExchange(w http.ResponseWriter, r *http.Request) {
	enableCORS(w, r)

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var request struct {
		Code        string `json:"code"`
		RedirectURI string `json:"redirect_uri"`
	}

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}

	if request.Code == "" {
		http.Error(w, "Authorization code is required", http.StatusBadRequest)
		return
	}

	if request.RedirectURI == "" {
		request.RedirectURI = "http://localhost:8080/api/linkedin/callback"
	}

	accessToken, err := linkedinService.ExchangeCodeForToken(request.Code, request.RedirectURI)
	if err != nil {
		log.Printf("Failed to exchange code for token: %v", err)
		http.Error(w, fmt.Sprintf("Failed to get access token: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"access_token": accessToken,
		"message":      "Add this access token to your .env file as LINKEDIN_ACCESS_TOKEN",
	})
}

func main() {
	// Set up routes
	http.HandleFunc("/api/developer/submit", handleDeveloperSubmission)
	http.HandleFunc("/api/health", handleHealthCheck)
	http.HandleFunc("/api/linkedin/auth", handleLinkedInAuth)
	http.HandleFunc("/api/linkedin/callback", handleLinkedInCallback)
	http.HandleFunc("/api/linkedin/exchange", handleManualTokenExchange)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("🚀 Developer Network Backend starting on port %s\n", port)
	fmt.Printf("🗄 Airtable: %s\n", func() string {
		if os.Getenv("AIRTABLE_API_KEY") != "" {
			return "✅ Configured"
		}
		return "⚠️  Not configured"
	}())
	fmt.Printf("🔗 LinkedIn Client ID: %s\n", os.Getenv("LINKEDIN_CLIENT_ID"))
	fmt.Printf("📧 Newsletter sync: %s\n", func() string {
		if os.Getenv("LINKEDIN_ACCESS_TOKEN") != "" {
			return "✅ LinkedIn configured"
		}
		return "⚠️  LinkedIn not configured (missing access token)"
	}())

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
