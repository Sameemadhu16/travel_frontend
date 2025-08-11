const Groq = require('groq-sdk');

class GroqRecommendationService {
    constructor(){
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }

    async getRecommendation(userInputs){
        try{
            console.log('🚀 Starting recommendation with Groq');

            // For now, return mock data since we don't have database setup
            const mockRecommendations = this.getMockRecommendations(userInputs);
            
            // Generate AI itinerary
            const itinerary = await this.generateItinerary(userInputs, mockRecommendations);
            
            return {
                ...mockRecommendations,
                ...itinerary,
                generatedAt: new Date().toISOString()
            };

        } catch(error) {
            console.error('❌ Groq Service Error:', error);
            return this.getFallbackRecommendations(userInputs);
        }
    }

    getMockRecommendations(userInputs) {
        return {
            recommendations: {
                guides: [
                    { id: 1, name: "Saman Perera", specialties: "Cultural Tours", rating: 4.8, price: 50, reviews: 120 },
                    { id: 2, name: "Nimal Silva", specialties: "Adventure Tours", rating: 4.9, price: 60, reviews: 95 },
                    { id: 3, name: "Kamal Fernando", specialties: "Wildlife Tours", rating: 4.7, price: 45, reviews: 87 }
                ],
                hotels: [
                    { id: 1, name: "Heritage Hotel", price: 80, rating: 4.6, reviews: 200, location: userInputs.destination },
                    { id: 2, name: "City Comfort Inn", price: 50, rating: 4.4, reviews: 150, location: userInputs.destination },
                    { id: 3, name: "Budget Lodge", price: 30, rating: 4.2, reviews: 100, location: userInputs.destination }
                ],
                vehicles: [
                    { id: 1, name: "Toyota Hiace", capacity: 8, price: 40, rating: 4.5, reviews: 80 },
                    { id: 2, name: "Suzuki Wagon R", capacity: 4, price: 25, rating: 4.3, reviews: 60 },
                    { id: 3, name: "Tuk Tuk", capacity: 3, price: 15, rating: 4.1, reviews: 45 }
                ]
            }
        };
    }

    async generateItinerary(userInputs, recommendations) {
        if (!process.env.GROQ_API_KEY) {
            console.warn('⚠️ GROQ_API_KEY not found, using fallback itinerary');
            return this.getFallbackItinerary(userInputs);
        }

        const prompt = `Create a ${userInputs.duration}-day itinerary for ${userInputs.destination}, Sri Lanka.

User preferences:
- Group: ${userInputs.adults} adults, ${userInputs.children} children  
- Trip type: ${Array.isArray(userInputs.tripType) ? userInputs.tripType.join(', ') : userInputs.tripType}
- Activity level: ${userInputs.activityLevel}
- Interests: ${Array.isArray(userInputs.interests) ? userInputs.interests.join(', ') : userInputs.interests}
- Budget: ${userInputs.budget}

Create a day-by-day plan with destinations and activities. Return ONLY valid JSON:
{
  "itinerary": {
    "destinations": ${userInputs.duration},
    "dailyPlans": [
      {"day": 1, "destination": "place", "activities": ["activity1", "activity2"], "highlights": ["highlight1"]}
    ]
  }
}`;

        try {
            const response = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a Sri Lankan travel expert. Create detailed, realistic itineraries. Return only valid JSON."
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    }
                ],
                model: "llama3-8b-8192",
                temperature: 0.5,
                max_tokens: 800
            });

            const content = response.choices[0]?.message?.content;
            console.log('🤖 Groq Response:', content);
            
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('❌ Itinerary generation error:', error);
        }

        return this.getFallbackItinerary(userInputs);
    }

    getFallbackItinerary(userInputs) {
        return {
            itinerary: {
                destinations: parseInt(userInputs.duration),
                dailyPlans: Array.from({ length: parseInt(userInputs.duration) }, (_, i) => ({
                    day: i + 1,
                    destination: userInputs.destination,
                    activities: ["Temple visit and cultural exploration", "Local market tour and lunch", "Scenic viewpoint and sunset"],
                    highlights: ["Authentic cultural experience", "Local cuisine tasting", "Beautiful landscapes"]
                }))
            }
        };
    }

    getFallbackRecommendations(userInputs) {
        return {
            recommendations: this.getMockRecommendations(userInputs).recommendations,
            itinerary: this.getFallbackItinerary(userInputs).itinerary,
            error: "Fallback data - Groq API unavailable"
        };
    }
}

module.exports = GroqRecommendationService;
