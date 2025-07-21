# Developer Network Podcast - Backend

A Go backend service for handling form submissions and syncing with LinkedIn newsletter API.

## Features

- 🚀 REST API for developer form submissions
- 📧 LinkedIn newsletter integration
- 🔒 CORS support for frontend integration
- ⚡ Simple health check endpoint
- 🏗️ Clean modular architecture

## API Endpoints

### Developer Submission
- **POST** `/api/developer/submit`
- Handles developer interview form submissions
- Automatically syncs email to LinkedIn newsletter

### Health Check
- **GET** `/api/health`
- Simple health check endpoint

## Setup

1. **Install Dependencies**
   ```bash
   go mod tidy
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your LinkedIn API credentials
   ```

3. **Run the Server**
   ```bash
   go run main.go
   ```

## Environment Variables

```bash
# Server Configuration
PORT=8080

# LinkedIn API Configuration
LINKEDIN_API_KEY=your_linkedin_api_key_here
LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token_here
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret_here

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

## LinkedIn API Setup

To enable LinkedIn newsletter synchronization:

1. Create a LinkedIn application at [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Get your API keys and access tokens
3. Configure the environment variables
4. The service will automatically sync form submissions to your LinkedIn newsletter

## Development

```bash
# Run in development mode
go run main.go

# Build for production
go build -o bin/server main.go

# Run tests
go test ./...
```

## Project Structure

```
backend/
├── main.go              # Main server file
├── models/              # Data models
│   └── developer.go     # Developer and newsletter models
├── services/            # External service integrations
│   └── linkedin.go      # LinkedIn API integration
├── handlers/            # HTTP request handlers
│   └── newsletter.go    # Newsletter handler (optional)
├── go.mod              # Go dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Usage with Frontend

The React frontend can submit forms to the backend using:

```javascript
const response = await fetch('http://localhost:8080/api/developer/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    github: 'https://github.com/johndoe',
    howFound: 'github'
  })
});
```
