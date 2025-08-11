const Groq = require('groq-sdk');
const DatabaseService = require('./databaseService');

class GroqRecommendationService {
    constructor(){
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
        this.dbService = new DatabaseService();
    }

    async getRecommendation(userInputs){
        try{
            console.log('🚀 Starting recommendation generation for:', userInputs.destination);

            // Test database connection first
            const dbConnected = await this.dbService.testConnection();
            
            if (!dbConnected) {
                throw new Error('Database connection failed. Unable to fetch recommendations.');
            }

            // Get real data from database
            const recommendations = await this.getDatabaseRecommendations(userInputs);
            
            // Check if we have any data at all
            if (!recommendations.hasData) {
                throw new Error(`No travel data found for ${userInputs.destination}. Please try a different destination or contact support.`);
            }
            
            // Generate dynamic AI itinerary based on available data
            const itinerary = await this.generateItinerary(userInputs, recommendations);
            
            // Calculate destinations count from itinerary
            const destinationsCount = itinerary?.itinerary?.dailyPlans?.length || parseInt(userInputs.duration) || 0;
            
            // Calculate real costs
            const duration = parseInt(userInputs.duration) || 1;
            const costs = this.calculateRealCosts(recommendations, duration);
            
            const result = {
                ...recommendations,
                ...itinerary,
                itinerary: {
                    ...itinerary.itinerary,
                    destinations: destinationsCount
                },
                costs: costs,
                generatedAt: new Date().toISOString(),
                dataSource: 'database'
            };

            console.log('✅ Complete recommendation generated with', destinationsCount, 'destinations');
            return result;

        } catch(error) {
            console.error('❌ Groq Service Error:', error);
            throw error; // Pass the error up instead of returning fallback data
        }
    }

    // Helper method to calculate real costs
    calculateRealCosts(recommendations, duration) {
        const guides = recommendations.recommendations?.guides || [];
        const hotels = recommendations.recommendations?.hotels || [];
        const vehicles = recommendations.recommendations?.vehicles || [];

        const guideCost = guides.length > 0 ? guides[0].price * duration : 0;
        const hotelCost = hotels.length > 0 ? hotels[0].price * duration : 0;
        const vehicleCost = vehicles.length > 0 ? vehicles[0].price * duration : 0;
        const totalCost = guideCost + hotelCost + vehicleCost;

        return {
            guide: guideCost,
            hotel: hotelCost,
            vehicle: vehicleCost,
            total: totalCost,
            perPerson: Math.round(totalCost / (parseInt(recommendations.adults) || 1))
        };
    }

    async getDatabaseRecommendations(userInputs) {
        try {
            
            const [guides, hotels, vehicles] = await Promise.all([
                this.dbService.fetchGuides(userInputs.destination),
                this.dbService.fetchHotels(userInputs.destination),
                this.dbService.fetchVehicles(userInputs.adults || 2, userInputs.children || 0)
            ]);

            // Create status flags for missing data
            const missingData = {
                guides: guides.length === 0,
                hotels: hotels.length === 0,
                vehicles: vehicles.length === 0
            };

            return {
                recommendations: {
                    guides,
                    hotels,
                    vehicles
                },
                missingData,
                hasData: guides.length > 0 || hotels.length > 0 || vehicles.length > 0
            };
        } catch (error) {
            console.error('❌ Database fetch error:', error);
            throw error; // Pass the error up instead of fallback
        }
    }

    async generateItinerary(userInputs, recommendations) {
        if (!process.env.GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY not configured. Unable to generate AI itinerary.');
        }

        const prompt = `
        Create a detailed ${userInputs.duration}-day travel itinerary for ${userInputs.destination}, Sri Lanka.

        --- USER DETAILS ---
        - Travelers: ${userInputs.adults} adults${userInputs.children ? `, ${userInputs.children} children` : ''}
        - Trip Style: ${Array.isArray(userInputs.tripType) ? userInputs.tripType.join(', ') : userInputs.tripType}
        - Activity Level: ${userInputs.activityLevel}
        - Interests: ${Array.isArray(userInputs.interests) ? userInputs.interests.join(', ') : userInputs.interests}
        - Budget Range: ${userInputs.budget}

        --- REQUIREMENTS ---
        1. The trip must be specific to ${userInputs.destination} and nearby real places in Sri Lanka.
        2. Each day has **only one main location** (city, area, or attraction hub).
        3. Each day must have **exactly 3 realistic activities** in that location.
        4. Include real attractions, restaurants, cultural experiences, or nature spots.
        5. Activities must match:
        - The ${userInputs.activityLevel} activity level
        - The trip style: ${Array.isArray(userInputs.tripType) ? userInputs.tripType.join(', ') : userInputs.tripType}
        - Interests: ${Array.isArray(userInputs.interests) ? userInputs.interests.join(', ') : userInputs.interests}
        6. Consider the budget (${userInputs.budget}) when choosing hotels, food, and transport recommendations.
        7. Provide **local tips** for each day (avoid generic advice).
        8. Avoid repeating activities unless necessary.

        --- LOCAL SERVICES AVAILABLE ---
        - Guides: ${recommendations.recommendations?.guides?.length || 0}
        - Hotels: ${recommendations.recommendations?.hotels?.length || 0}
        - Vehicles: ${recommendations.recommendations?.vehicles?.length || 0}

        --- JSON OUTPUT FORMAT ---
        Return ONLY valid JSON in this format:
        {
            "itinerary": {
                "days": ${userInputs.duration},
                "title": "Your ${userInputs.duration}-Day ${userInputs.destination} Adventure",
                "summary": "Brief description of the trip highlights",
                "dailyPlans": [
                    {
                        "day": 1,
                        "location": "Main location for the day",
                        "title": "Day title",
                        "activities": [
                            "Specific activity 1",
                            "Specific activity 2",
                            "Specific activity 3"
                        ],
                        "highlights": ["Highlight 1", "Highlight 2"],
                        "estimatedCost": "Cost range for the day",
                        "tips": "Specific local tips for this day"
                    }
                ]
            }
        }

        IMPORTANT:
        - Each day must have exactly 3 activities
        - All places and activities must be real and in/near ${userInputs.destination}
        - Ensure the JSON is valid and has no extra text outside the JSON object
        `;

        try {
            
            const response = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You are an expert Sri Lankan travel guide. You know all locations, activities, and cultural experiences in ${userInputs.destination} and nearby areas. Always return valid JSON only.`
                    },
                    { 
                        role: "user", 
                        content: prompt 
                    }
                ],
                model: "llama3-8b-8192",
                temperature: 0.7,
                max_tokens: 1500
            });

            const content = response.choices[0]?.message?.content;
            
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                console.log(`Generated dynamic itinerary for ${userInputs.destination}`);
                return parsed;
            } else {
                console.warn('⚠️ No valid JSON found in Groq response');
                throw new Error('Failed to generate valid itinerary from AI service');
            }
        } catch (error) {
            console.error('❌ Itinerary generation error:', error.message);
            throw error; // Pass the error up instead of fallback
        }
    }
}

module.exports = GroqRecommendationService;
