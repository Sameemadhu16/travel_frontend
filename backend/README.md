# Travel Backend API

## Quick Start

1. **Install dependencies:**

   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   copy .env.example .env
   ```

   Edit `.env` and add your Groq API key:

   ```
   GROQ_API_KEY=your_actual_groq_api_key_here
   ```

3. **Start the server:**

   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

4. **Test the API:**
   Server runs on http://localhost:5000

   Test endpoint: `POST http://localhost:5000/api/recommendations/generate`

## API Endpoints

### POST /api/recommendations/generate

Generate travel recommendations based on user inputs.

**Request Body:**

```json
{
  "destination": "Kandy",
  "duration": "3",
  "adults": "2",
  "children": "0",
  "tripType": ["Cultural", "Adventure"],
  "interests": ["Historical Sites", "Nature"],
  "activityLevel": "Moderate",
  "budget": "Mid-range ($50-$100/day)"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "recommendations": {
      "guides": [...],
      "hotels": [...],
      "vehicles": [...]
    },
    "itinerary": {
      "destinations": 3,
      "dailyPlans": [...]
    }
  },
  "generatedAt": "2024-01-01T10:00:00.000Z"
}
```

### GET /api/recommendations/health

Health check endpoint.

## Project Structure

```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── routes/
│   └── recommendations.js # API routes
├── controllers/
│   └── recommendationController.js # Request handlers
└── services/
    └── groqRecommendationService.js # AI service logic
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `GROQ_API_KEY` - Your Groq API key for AI recommendations
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)
- `NODE_ENV` - Environment (development/production)

## Features

- ✅ AI-powered travel recommendations using Groq
- ✅ Mock data for testing without database
- ✅ Proper error handling and validation
- ✅ CORS configuration for frontend integration
- ✅ Environment-based configuration
- ✅ Structured service architecture

## Next Steps

1. Add database integration for real hotel/guide data
2. Implement user authentication
3. Add caching for improved performance
4. Add comprehensive testing suite
