package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"developer-network-backend/models"
)

// AirtableService handles communication with Airtable API
type AirtableService struct {
	apiKey  string
	baseID  string
	tableID string
	baseURL string
}

// NewAirtableService creates a new Airtable service instance
func NewAirtableService() *AirtableService {
	return &AirtableService{
		apiKey:  os.Getenv("AIRTABLE_API_KEY"),
		baseID:  os.Getenv("AIRTABLE_BASE_ID"),
		tableID: os.Getenv("AIRTABLE_TABLE_ID"),
		baseURL: "https://api.airtable.com/v0",
	}
}

// AirtableRecord represents an Airtable record structure
type AirtableRecord struct {
	Fields map[string]interface{} `json:"fields"`
}

// AirtableRequest represents the request structure for Airtable API
type AirtableRequest struct {
	Records []AirtableRecord `json:"records"`
}

// AddDeveloper adds a new developer record to Airtable
func (as *AirtableService) AddDeveloper(developer models.Developer) error {
	if as.apiKey == "" || as.baseID == "" || as.tableID == "" {
		return fmt.Errorf("airtable credentials not configured")
	}

	url := fmt.Sprintf("%s/%s/%s", as.baseURL, as.baseID, as.tableID)

	// Prepare the record
	record := AirtableRecord{
		Fields: map[string]interface{}{
			"First Name":  developer.FirstName,
			"Last Name":   developer.LastName,
			"Email":       developer.Email,
			"Github":      developer.Github,
			"LinkedIn":    developer.LinkedIn,
			"Website":     developer.Website,
			"How Found":   developer.HowFound,
			"Created At":  developer.CreatedAt.Format("2006-01-02T15:04:05Z"),
		},
	}

	// Create the request payload
	payload := AirtableRequest{
		Records: []AirtableRecord{record},
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
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", as.apiKey))

	// Execute request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	// Check response status
	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		return fmt.Errorf("airtable API returned status: %d", resp.StatusCode)
	}

	return nil
}

// GetDevelopers retrieves developer records from Airtable
func (as *AirtableService) GetDevelopers() ([]models.Developer, error) {
	if as.apiKey == "" || as.baseID == "" || as.tableID == "" {
		return nil, fmt.Errorf("airtable credentials not configured")
	}

	url := fmt.Sprintf("%s/%s/%s", as.baseURL, as.baseID, as.tableID)

	// Create HTTP request
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set headers
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", as.apiKey))

	// Execute request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to execute request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("airtable API returned status: %d", resp.StatusCode)
	}

	// For now, return empty slice - you can implement full parsing if needed
	return []models.Developer{}, nil
}
