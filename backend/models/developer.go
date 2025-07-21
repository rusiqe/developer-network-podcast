package models

import "time"

// Developer represents a developer who wants to be featured on the podcast
type Developer struct {
	ID        int       `json:"id"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Email     string    `json:"email"`
	Github    string    `json:"github"`
	LinkedIn  string    `json:"linkedin,omitempty"`
	Website   string    `json:"website,omitempty"`
	HowFound  string    `json:"howFound"`
	CreatedAt time.Time `json:"createdAt"`
}

// NewsletterSubscriber represents a newsletter subscription
type NewsletterSubscriber struct {
	Email     string    `json:"email"`
	FirstName string    `json:"firstName"`
	LastName  string    `json:"lastName"`
	Source    string    `json:"source"`
	CreatedAt time.Time `json:"createdAt"`
}
