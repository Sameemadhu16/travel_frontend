const Groq = require('groq-sdk');
const databaseService = require('./databaseService');

class GroqRecommendationService {
    constructor(){
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        });
    }

    async getRecommendation(userInputs){
        try{
            // Fetch data from database and generate itinerary in parallel
            const [guides, hotels, vehicles, itinerary] = await Promise.all([
                this.fetchGuides(userInputs),
                this.fetchHotels(userInputs),
                this.fetchVehicles(userInputs),
                this.generateItinerary(userInputs)
            ]);

            const destinationsCount = itinerary?.itinerary?.dailyPlans?.length || parseInt(userInputs.duration) || 0;

            // Calculate costs
            const costs = this.calculateCosts(userInputs, guides, hotels, vehicles);

            // Check what data is available
            const hasData = guides.length > 0 || hotels.length > 0 || vehicles.length > 0;

            const result = {
                recommendations: {
                    guides: guides,
                    hotels: hotels,
                    vehicles: vehicles
                },
                missingData: {
                    guides: guides.length === 0,
                    hotels: hotels.length === 0,
                    vehicles: vehicles.length === 0
                },
                hasData: hasData,
                ...itinerary,
                itinerary: {
                    ...itinerary.itinerary,
                    destinations: destinationsCount
                },
                costs: costs,
                generatedAt: new Date().toISOString(),
                dataSource: hasData ? 'database' : 'ai-only'
            };

            return result;

        } catch(error) {
            console.error('Groq Service Error:', error);
            throw error;
        }
    }

    async fetchGuides(userInputs) {
        try {
            const guides = await databaseService.getGuides({});
            
            // Transform to match frontend expectations
            return guides.map(guide => ({
                id: guide.id,
                name: guide.name,
                rating: guide.rating || 4.5,
                reviews: Math.floor(Math.random() * 50) + 10,
                price: guide.pricePerDay,
                pricePerDay: guide.pricePerDay,
                specialties: guide.specialization,
                experience: guide.experience,
                languages: guide.languages,
                bio: guide.bio,
                email: guide.email,
                image: guide.image,
                availability: guide.availability
            }));
        } catch (error) {
            console.error('Error fetching guides:', error.message);
            return [];
        }
    }

    async fetchHotels(userInputs) {
        try {
            const hotels = await databaseService.getHotels({});
            
            // Transform to match frontend expectations
            return hotels.map(hotel => ({
                id: hotel.id,
                name: hotel.name,
                rating: hotel.rating || 4.3,
                reviews: Math.floor(Math.random() * 100) + 20,
                price: hotel.pricePerNight,
                pricePerNight: hotel.pricePerNight,
                location: hotel.location,
                type: hotel.type,
                amenities: hotel.amenities,
                description: hotel.description,
                email: hotel.email,
                image: hotel.image,
                availableRooms: hotel.availableRooms
            }));
        } catch (error) {
            console.error('Error fetching hotels:', error.message);
            return [];
        }
    }

    async fetchVehicles(userInputs) {
        try {
            const vehicles = await databaseService.getVehicles({});
            
            // Transform to match frontend expectations
            return vehicles.map(vehicle => ({
                id: vehicle.id,
                name: vehicle.name,
                rating: 4.4,
                reviews: Math.floor(Math.random() * 30) + 5,
                price: vehicle.pricePerDay,
                pricePerDay: vehicle.pricePerDay,
                capacity: `${vehicle.capacity} seats`,
                type: vehicle.type,
                features: vehicle.features,
                fuelType: vehicle.fuelType,
                driverIncluded: vehicle.driverIncluded,
                image: vehicle.image,
                description: vehicle.description,
                availability: vehicle.availability
            }));
        } catch (error) {
            console.error('Error fetching vehicles:', error.message);
            return [];
        }
    }

    calculateCosts(userInputs, guides, hotels, vehicles) {
        const duration = parseInt(userInputs.duration) || 1;
        const totalPeople = parseInt(userInputs.adults || 0) + parseInt(userInputs.children || 0);

        // Calculate minimum cost for each category
        const guideCost = guides.length > 0 
            ? Math.min(...guides.map(g => g.pricePerDay || 0)) * duration * 8 // 8 hours per day
            : 0;

        const hotelCost = hotels.length > 0 
            ? Math.min(...hotels.map(h => h.pricePerNight || 0)) * duration * Math.ceil(totalPeople / 2)
            : 0;

        const vehicleCost = vehicles.length > 0 
            ? Math.min(...vehicles.map(v => v.pricePerDay || 0)) * duration 
            : 0;

        const total = guideCost + hotelCost + vehicleCost;
        const perPerson = totalPeople > 0 ? total / totalPeople : total;

        return {
            guide: guideCost,
            hotel: hotelCost,
            vehicle: vehicleCost,
            total: total,
            perPerson: parseFloat(perPerson.toFixed(2))
        };
    }

    getBudgetMax(budgetString) {
        // Extract max value from budget string like "Mid-range ($50-$100/day)"
        const match = budgetString?.match(/\$(\d+)-\$(\d+)/);
        if (match) {
            return parseInt(match[2]); // Return the max value
        }
        
        // Default values based on budget tier
        if (budgetString?.toLowerCase().includes('luxury')) return 500;
        if (budgetString?.toLowerCase().includes('mid')) return 100;
        if (budgetString?.toLowerCase().includes('budget')) return 50;
        
        return 100; // Default
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
                model: "llama-3.1-8b-instant",
                temperature: 0.7,
                max_tokens: 1500
            });

            const content = response.choices[0]?.message?.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return parsed;
            } else {
                console.warn('No valid JSON found in Groq response');
                throw new Error('Failed to generate valid itinerary from AI service');
            }
        } catch (error) {
            console.error('Itinerary generation error:', error.message);
            throw error;
        }
    }
}

module.exports = GroqRecommendationService;
