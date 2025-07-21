# Airtable Setup Guide

## 🚀 Quick Setup for Developer Network Podcast

### Step 1: Create Airtable Base

1. Go to [Airtable](https://airtable.com) and create a new base
2. Create a table called "Developers" (or any name you prefer)
3. Add these columns:
   - **First Name** (Single line text)
   - **Last Name** (Single line text)  
   - **Email** (Email)
   - **Github** (URL)
   - **LinkedIn** (URL) - Optional
   - **Website** (URL) - Optional
   - **How Found** (Single line text)
   - **Created At** (Date & time)

### Step 2: Get Your API Credentials

1. **API Key**: 
   - Go to [Airtable Account](https://airtable.com/account)
   - Generate a Personal Access Token
   - Copy the token

2. **Base ID**:
   - Open your base in Airtable
   - Go to Help → API Documentation
   - Your base ID will be shown (starts with "app...")

3. **Table ID**:
   - This is just the table name (e.g., "Developers")

### Step 3: Configure Environment Variables

Update your `.env` file:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_personal_access_token_here
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX  # From API docs
AIRTABLE_TABLE_ID=Developers        # Your table name
```

### Step 4: Test the Integration

1. Start your backend server:
   ```bash
   go run main.go
   ```

2. Test form submission:
   ```bash
   curl -X POST http://localhost:8080/api/developer/submit \
     -H "Content-Type: application/json" \
     -d '{
       "firstName": "John",
       "lastName": "Doe", 
       "email": "john@example.com",
       "github": "https://github.com/johndoe",
       "howFound": "testing"
     }'
   ```

3. Check your Airtable base - you should see the new record!

## ✅ Benefits of Using Airtable

- **Easy Setup**: Much simpler than LinkedIn OAuth
- **Visual Interface**: See all submissions in a nice table
- **Collaboration**: Share with your team
- **Export**: Easy to export to CSV/Excel
- **Automation**: Connect with Zapier, Make.com, etc.

## 🔄 Optional: LinkedIn Newsletter Integration

If you also want to sync emails to LinkedIn newsletter, you can keep both integrations. The system will:
1. ✅ Save to Airtable (primary storage)
2. ✅ Also sync to LinkedIn newsletter (if configured)

This gives you the best of both worlds!
