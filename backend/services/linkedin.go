package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"

	"developer-network-backend/models"
)

// LinkedInService handles communication with LinkedIn API
type LinkedInService struct {
	clientID     string
	clientSecret string
	apiKey       string
	accessToken  string
	baseURL      string
}

// NewLinkedInService creates a new LinkedIn service instance
func NewLinkedInService() *LinkedInService {
	return &LinkedInService{
		clientID:     os.Getenv("LINKEDIN_CLIENT_ID"),
		clientSecret: os.Getenv("LINKEDIN_CLIENT_SECRET"),
		apiKey:       os.Getenv("LINKEDIN_API_KEY"),
		accessToken:  os.Getenv("LINKEDIN_ACCESS_TOKEN"),
		baseURL:      "https://api.linkedin.com/v2",
	}
}

// AddSubscriber adds a new subscriber to LinkedIn newsletter
func (ls *LinkedInService) AddSubscriber(subscriber models.NewsletterSubscriber) error {
	// LinkedIn API endpoint for adding newsletter subscribers
	// Note: This is a simplified example - actual LinkedIn API endpoints may vary
	url := fmt.Sprintf("%s/newsletterSubscriptions", ls.baseURL)

	// Prepare the payload
	payload := map[string]interface{}{
		"email":     subscriber.Email,
		"firstName": subscriber.FirstName,
		"lastName":  subscriber.LastName,
		"source":    subscriber.Source,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal payload: %w", err)
	}

	// Create HTTP request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", ls.accessToken))
	req.Header.Set("LinkedIn-Version", "202212")

	// Execute request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("LinkedIn API returned status: %d", resp.StatusCode)
	}

	return nil
}

// GetNewsletterStats retrieves newsletter statistics from LinkedIn
func (ls *LinkedInService) GetNewsletterStats() (map[string]interface{}, error) {
	// This would fetch newsletter statistics from LinkedIn API
	// Implementation depends on specific LinkedIn API endpoints available
	
	// Mock response for now
	stats := map[string]interface{}{
		"totalSubscribers": 10000,
		"openRate":        0.25,
		"clickRate":       0.05,
	}
	
	return stats, nil
}

// GetOAuthURL generates LinkedIn OAuth authorization URL
func (ls *LinkedInService) GetOAuthURL(redirectURI, state string) string {
	params := url.Values{}
	params.Set("response_type", "code")
	params.Set("client_id", ls.clientID)
	params.Set("redirect_uri", redirectURI)
	params.Set("state", state)
	params.Set("scope", "r_liteprofile r_emailaddress w_member_social")
	
	return "https://www.linkedin.com/oauth/v2/authorization?" + params.Encode()
}

// ExchangeCodeForToken exchanges authorization code for access token
func (ls *LinkedInService) ExchangeCodeForToken(code, redirectURI string) (string, error) {
	url := "https://www.linkedin.com/oauth/v2/accessToken"
	
	payload := map[string]string{
		"grant_type":    "authorization_code",
		"code":          code,
		"redirect_uri":  redirectURI,
		"client_id":     ls.clientID,
		"client_secret": ls.clientSecret,
	}
	
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("failed to marshal payload: %w", err)
	}
	
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}
	
	req.Header.Set("Content-Type", "application/json")
	
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()
	
	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("LinkedIn API returned status: %d", resp.StatusCode)
	}
	
	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", fmt.Errorf("failed to decode response: %w", err)
	}
	
	accessToken, ok := result["access_token"].(string)
	if !ok {
		return "", fmt.Errorf("access token not found in response")
	}
	
	return accessToken, nil
}
