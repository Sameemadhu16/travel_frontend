# Google Maps API Integration Guide

## Setup Instructions

### 1. Get Google Maps API Key (FREE)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Distance Matrix API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Distance Matrix API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in your project root:

```bash
# .env file
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### 3. Secure Your API Key (Important!)

Add API key restrictions in Google Cloud Console:
- **Application restrictions**: HTTP referrers
- **API restrictions**: Distance Matrix API only
- **Referrer restrictions**: Add your domain (e.g., `localhost:3000/*`, `yourdomain.com/*`)

### 4. Usage Examples

```javascript
// Simple distance calculation
const distance = await getGoogleMapsDistance(
  "Colombo, Sri Lanka", 
  "Kandy, Sri Lanka"
);
console.log(`Distance: ${distance.distance.value} km`);

// Batch calculation (more efficient)
const distances = await getBatchGoogleMapsDistances(
  ["Colombo, Sri Lanka", "Kandy, Sri Lanka"],
  ["Kandy, Sri Lanka", "Nuwara Eliya, Sri Lanka"]
);

// Enhanced trip calculation with Google Maps
const tripData = await calculateTripDistanceWithGoogleMaps(
  formData.itinerary,
  "Colombo, Sri Lanka"
);
```

## Cost Analysis for Your Project

### Free Tier Limits:
- **$200/month credit** = ~40,000 distance calculations
- **Typical trip**: 10-15 API calls
- **Monthly capacity**: ~2,500-4,000 trips FREE

### Cost After Free Tier:
- **$5 per 1,000 elements**
- For 10,000 trips/month: ~$125/month
- Break-even point: ~4,000 trips/month

### Optimization Strategies:

1. **Hybrid Approach** (Recommended):
   ```javascript
   // Use Google Maps for popular routes
   // Cache results in local database
   // Use fallback matrix for unknown routes
   ```

2. **Caching Strategy**:
   ```javascript
   // Store calculated distances in localStorage/database
   const cacheKey = `distance_${origin}_${destination}`;
   const cached = localStorage.getItem(cacheKey);
   if (cached) return JSON.parse(cached);
   ```

3. **Batch Processing**:
   ```javascript
   // Calculate multiple distances in one API call
   // More efficient than individual requests
   ```

## Alternative Free Options

### 1. OpenRouteService API
- **5,000 requests/day FREE**
- Good alternative to Google Maps
- Similar API structure

### 2. MapBox API
- **100,000 requests/month FREE**
- High-quality routing data
- Good documentation

### 3. OSRM (Open Source Routing Machine)
- **Completely FREE**
- Self-hosted option
- Uses OpenStreetMap data

### 4. Hybrid Local + API Approach
```javascript
// Best of both worlds:
1. Use local distance matrix for common routes
2. Use API for unknown/new routes
3. Cache API results for future use
4. Fallback gracefully when API fails
```

## Implementation Priority

### Phase 1: Enhanced Local Matrix (FREE)
- Expand current distance matrix
- Add more Sri Lankan cities/districts
- Use measured road distances

### Phase 2: Google Maps Integration (FREE tier)
- Implement API calls with fallback
- Cache frequently used routes
- Monitor API usage

### Phase 3: Optimization (If needed)
- Implement alternative APIs
- Build comprehensive local database
- Consider self-hosted solutions

## Recommendation for Your Project

**Start with the Hybrid Approach:**

1. **Keep your current distance matrix** for common routes
2. **Add Google Maps API** for unknown routes
3. **Cache all API results** in localStorage/database
4. **Monitor usage** and optimize as needed

This gives you:
- ✅ **FREE** for most use cases (under 4,000 trips/month)
- ✅ **Accurate** distances for all routes
- ✅ **Fallback** when API is unavailable
- ✅ **Scalable** as your app grows

The free tier should be sufficient for development and early-stage production!
