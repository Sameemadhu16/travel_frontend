const Groq = require('groq-sdk');

class GroqRecommendationService {
    constructor(){
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }

    async getRecommendation(userInputs){
        try{
            console.log('🚀 Starting AI itinerary generation for:', userInputs.destination);

            // Only generate AI itinerary, no database recommendations
            const itinerary = await this.generateItinerary(userInputs);
            const destinationsCount = itinerary?.itinerary?.dailyPlans?.length || parseInt(userInputs.duration) || 0;

            // Return empty recommendations and costs
            const result = {
                recommendations: {
                    guides: [],
                    hotels: [],
                    vehicles: []
                },
                missingData: {
                    guides: true,
                    hotels: true,
                    vehicles: true
                },
                hasData: false,
                ...itinerary,
                itinerary: {
                    ...itinerary.itinerary,
                    destinations: destinationsCount
                },
                costs: {
                    guide: 0,
                    hotel: 0,
                    vehicle: 0,
                    total: 0,
                    perPerson: 0
                },
                generatedAt: new Date().toISOString(),
                dataSource: 'ai-only'
            };

            console.log('✅ AI itinerary generated with', destinationsCount, 'destinations');
            return result;

        } catch(error) {
            console.error('❌ Groq Service Error:', error);
            throw error;
        }
    }

    async generateItinerary(userInputs) {
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
            throw error;
        }
    }
}

module.exports = GroqRecommendationService;
