import Groq from 'groq-sdk';
import db from '../config/database';

class GroqRecommendationService {
    constructor(){
        this.groq = new Groq({
            apiKey: process.env.GROQ_API_KEY
        })
    }

    async getRecommendation(userInputs){
        try{
            console.log('start recommendation with groq');

            const [guides, hotels, vehicles] = await Promise.all([
                this.fetchGuides(userInputs.destination),
                this.fetchHotels(userInputs.destination),
                this.fetchVehicles(userInputs.adults, userInputs, children),
            ]);

            const aiRecommendations = await this.getAIRecommendation(
                userInputs,
                guides,
                hotels,
                vehicles,
            )

            return this.formatRecommendations(aiRecommendations, guides, hotels, vehicles);

        }catch(e){

        }
    }

    async fetchGuides(destination) {
        const query = `
        SELECT 
                g.id,
                u.first_name,  
                g.bio as description,
                g.hours_rate * 8 as price_per_day,  
                g.experience_years,
                g.is_verified,
                g.is_available,
                g.slta_license_id,
                g.slta_license_expiry,
                g.nic_number,
                g.created_at
            FROM guides g
            JOIN users u ON g.user_id = u.id
            WHERE g.is_available = true
                AND g.is_verified = true
                AND (g.slta_license_expiry IS NULL OR g.slta_license_expiry > NOW())
            ORDER BY g.experience_years DESC, g.created_at DESC
            LIMIT 20
        `;

        const result = await db.query(query, [`%${destination}%`]);
        return result.rows
    }

    
    async fetchHotels(destination) {
        const query = `
            SELECT 
                h.id,
                h.hotel_name,
                h.city,
                h.description,
                h.type
            FROM hotels h
            WHERE h.city ILIKE $1 
        `;
        
        const result = await db.query(query, [`%${destination}%`]);
        return result.rows;
    }

    async fetchVehicles(adults, children) {
        const totalPeople = parseInt(adults) + parseInt(children);
        
        const query = `
            SELECT 
                v.id,
                v.type as name,
                v.model,
                v.capacity,
                v.price_per_day as price,
                v.features,
                v.fuel_type,
                COALESCE(AVG(r.rating), 4.2) as rating,
                COUNT(r.id) as reviews
            FROM vehicles v
            LEFT JOIN reviews r ON v.id = r.vehicle_id
            WHERE v.capacity >= $1 
                AND v.status = 'available'
            GROUP BY v.id
            ORDER BY v.capacity ASC, rating DESC
            LIMIT 15
        `;
        
        const result = await db.query(query, [totalPeople]);
        return result.rows;
    }

    async getAIRecommendations(userInputs, guides, hotels, vehicles){
        const prompt = this.buildRecommendationPrompt(userInputs, guides, hotels, vehicles)

        try{
            const chatCompletion = await this.groq.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: `You are an expert travel recommendation system for Sri Lanka. 
                        Analyze the user preferences and available options to recommend the best guides, hotels, and vehicles.
                        Return ONLY valid JSON with the exact structure requested.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                model: 'llama3-8b-8192',
                temperature: 0.3,
                max_tokens: 1500
            });

            const content = chatCompletion.choices[0]?.message?.content;

            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
            
            throw new Error('No valid JSON found in AI response');
        } catch(e){
            console.log(e);
        }
    }

    buildRecommendationPrompt(userInputs, guides, hotels, vehicles){
        return `User Trip Details:
        - Destination: ${userInputs.destination}
        - Duration: ${userInputs.duration} days
        - Group: ${userInputs.adults} adults, ${userInputs.children} children
        - Trip Type: ${Array.isArray(userInputs.tripType) ? userInputs.tripType.join(', ') : userInputs.tripType}
        - Budget: ${userInputs.budget}
        - Activity Level: ${userInputs.activityLevel}
        - Interests: ${userInputs.interests ? userInputs.interests.join(', ') : 'General'}

        Available Options:

        GUIDES (${guides.length} available):
        ${guides.map(g => `ID: ${g.id}, Name: ${g.name}, Specialties: ${g.specialties}, Price: $${g.price}/day, Rating: ${parseFloat(g.rating).toFixed(1)}, Reviews: ${g.reviews}`).join('\n')}

        HOTELS (${hotels.length} available):
        ${hotels.map(h => `ID: ${h.id}, Name: ${h.name}, Price: $${h.price}/night, Stars: ${h.star_rating}, Rating: ${parseFloat(h.rating).toFixed(1)}, Reviews: ${h.reviews}`).join('\n')}

        VEHICLES (${vehicles.length} available):
        ${vehicles.map(v => `ID: ${v.id}, Name: ${v.name} ${v.model}, Capacity: ${v.capacity}, Price: $${v.price}/day, Rating: ${parseFloat(v.rating).toFixed(1)}, Reviews: ${v.reviews}`).join('\n')}

        Select and rank the best 3 guides, 3 hotels, and 3 vehicles based on user preferences.
        Consider: budget match, specialties alignment, ratings, capacity needs, and location relevance.

        Return ONLY this JSON structure:
        {
        "selectedGuides": [
            {"id": 1, "rank": 1, "matchReason": "reason"},
            {"id": 2, "rank": 2, "matchReason": "reason"},
            {"id": 3, "rank": 3, "matchReason": "reason"}
        ],
        "selectedHotels": [
            {"id": 1, "rank": 1, "matchReason": "reason"},
            {"id": 2, "rank": 2, "matchReason": "reason"},
            {"id": 3, "rank": 3, "matchReason": "reason"}
        ],
        "selectedVehicles": [
            {"id": 1, "rank": 1, "matchReason": "reason"},
            {"id": 2, "rank": 2, "matchReason": "reason"},
            {"id": 3, "rank": 3, "matchReason": "reason"}
        ]
        }`;
    }

    getFallbackRecommendations(guides, hotels, vehicles) {
        return {
            selectedGuides: guides.slice(0, 3).map((g, i) => ({
                id: g.id,
                rank: i + 1,
                matchReason: "High rating and experience"
            })),
            selectedHotels: hotels.slice(0, 3).map((h, i) => ({
                id: h.id,
                rank: i + 1,
                matchReason: "Good location and rating"
            })),
            selectedVehicles: vehicles.slice(0, 3).map((v, i) => ({
                id: v.id,
                rank: i + 1,
                matchReason: "Suitable capacity and rating"
            }))
        };
    }

    formatRecommendations(aiRecommendations, allGuides, allHotels, allVehicles) {
        const formatCategory = (selected, allItems, category) => {
            return selected.map(selection => {
                const item = allItems.find(i => i.id === selection.id);
                if (!item) return null;

                return {
                    id: item.id,
                    name: category === 'vehicles' ? `${item.name} ${item.model || ''}`.trim() : item.name,
                    rating: parseFloat(item.rating).toFixed(1),
                    reviews: parseInt(item.reviews),
                    price: parseInt(item.price),
                    aiRank: selection.rank,
                    matchReason: selection.matchReason,
                    ...(category === 'guides' && {
                        specialties: item.specialties,
                        experience: item.experience_years,
                        languages: item.languages
                    }),
                    ...(category === 'hotels' && {
                        stars: item.star_rating,
                        amenities: item.amenities,
                        location: item.location
                    }),
                    ...(category === 'vehicles' && {
                        capacity: item.capacity,
                        type: item.name,
                        features: item.features
                    })
                };
            }).filter(Boolean);
        };

        return {
            success: true,
            recommendations: {
                guides: formatCategory(aiRecommendations.selectedGuides, allGuides, 'guides'),
                hotels: formatCategory(aiRecommendations.selectedHotels, allHotels, 'hotels'),
                vehicles: formatCategory(aiRecommendations.selectedVehicles, allVehicles, 'vehicles')
            },
            metadata: {
                generatedAt: new Date().toISOString(),
                totalOptions: {
                    guides: allGuides.length,
                    hotels: allHotels.length,
                    vehicles: allVehicles.length
                }
            }
        };
    }

    async generateItinerary(userInputs, recommendations) {
        const prompt = `
        Create a ${userInputs.duration}-day itinerary for ${userInputs.destination}, Sri Lanka.

        User preferences:
            - Group: ${userInputs.adults} adults, ${userInputs.children} children  
            - Trip type: ${userInputs.tripType}
            - Activity level: ${userInputs.activityLevel}
            - Interests: ${userInputs.interests}

            Selected guide: ${recommendations.guides[0]?.name} (${recommendations.guides[0]?.specialties})

            Create a day-by-day plan with destinations and activities. Return JSON:
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
                messages: [{ role: "user", content: prompt }],
                model: "llama3-8b-8192",
                temperature: 0.5,
                max_tokens: 800
            });

            const content = response.choices[0]?.message?.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (error) {
            console.error('Itinerary generation error:', error);
        }

        // Fallback itinerary
        return {
            itinerary: {
                destinations: parseInt(userInputs.duration),
                dailyPlans: Array.from({ length: parseInt(userInputs.duration) }, (_, i) => ({
                    day: i + 1,
                    destination: userInputs.destination,
                    activities: ["Sightseeing", "Cultural experience", "Local dining"],
                    highlights: ["Authentic experience", "Local culture"]
                }))
            }
        };
    }
}

module.exports  = GroqRecommendationService;