#!/bin/bash

echo "🧪 Developer Network Podcast - Application Test"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Backend Health Check
echo -e "\n${YELLOW}Test 1: Backend Health Check${NC}"
response=$(curl -s -w "HTTP_CODE:%{http_code}" http://localhost:8080/api/health)
if [[ $response == *"HTTP_CODE:200"* ]]; then
    echo -e "${GREEN}✅ Backend is healthy${NC}"
else
    echo -e "${RED}❌ Backend health check failed${NC}"
    echo "Response: $response"
fi

# Test 2: CORS Headers
echo -e "\n${YELLOW}Test 2: CORS Headers${NC}"
cors_response=$(curl -s -H "Origin: http://localhost:3001" -I http://localhost:8080/api/health)
if [[ $cors_response == *"Access-Control-Allow-Origin"* ]]; then
    echo -e "${GREEN}✅ CORS headers present${NC}"
else
    echo -e "${RED}❌ CORS headers missing${NC}"
fi

# Test 3: Form Submission
echo -e "\n${YELLOW}Test 3: Form Submission API${NC}"
test_data='{
  "firstName": "Test",
  "lastName": "User",
  "email": "test@example.com",
  "github": "https://github.com/testuser",
  "howFound": "testing"
}'

form_response=$(curl -s -w "HTTP_CODE:%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:3001" \
  -d "$test_data" \
  http://localhost:8080/api/developer/submit)

if [[ $form_response == *"HTTP_CODE:200"* ]] && [[ $form_response == *"success"* ]]; then
    echo -e "${GREEN}✅ Form submission successful${NC}"
    echo "Response: $(echo $form_response | sed 's/HTTP_CODE:200//')"
else
    echo -e "${RED}❌ Form submission failed${NC}"
    echo "Response: $form_response"
fi

# Test 4: Frontend Accessibility
echo -e "\n${YELLOW}Test 4: Frontend Accessibility${NC}"
frontend_response=$(curl -s -w "HTTP_CODE:%{http_code}" http://localhost:3001)
if [[ $frontend_response == *"HTTP_CODE:200"* ]]; then
    echo -e "${GREEN}✅ Frontend is accessible${NC}"
else
    echo -e "${RED}❌ Frontend not accessible${NC}"
fi

echo -e "\n${YELLOW}🎯 Testing Complete!${NC}"
echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Test the form manually at http://localhost:3001"
echo "2. Check backend logs for LinkedIn API integration"
echo "3. Verify newsletter subscription if LinkedIn credentials are configured"
