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
            console.log('🚀 Starting recommendation with Groq for:', userInputs);

            // Test database connection first
            const dbConnected = await this.dbService.testConnection();
            
            let recommendations;
            if (dbConnected) {
                // Get real data from database
                recommendations = await this.getDatabaseRecommendations(userInputs);
            } else {
                // Fallback to mock data if database is not available
                console.log('⚠️ Database not available, using mock data');
                recommendations = this.getMockRecommendations(userInputs);
            }
            
            // Generate dynamic AI itinerary based on actual destination
            const itinerary = await this.generateItinerary(userInputs, recommendations);
            console.log(itinerary.data)
            return {
                ...recommendations,
                ...itinerary,
                generatedAt: new Date().toISOString(),
                dataSource: dbConnected ? 'database' : 'mock'
            };

        } catch(error) {
            console.error('❌ Groq Service Error:', error);
            return this.getFallbackRecommendations(userInputs);
        }
    }

    async getDatabaseRecommendations(userInputs) {
        try {
            console.log('📊 Fetching recommendations from database...');
            
            const [guides, hotels, vehicles] = await Promise.all([
                this.dbService.fetchGuides(userInputs.destination),
                this.dbService.fetchHotels(userInputs.destination),
                this.dbService.fetchVehicles(userInputs.adults || 2, userInputs.children || 0)
            ]);

            return {
                recommendations: {
                    guides: guides.length > 0 ? guides : this.getMockGuides(),
                    hotels: hotels.length > 0 ? hotels : this.getMockHotels(userInputs.destination),
                    vehicles: vehicles.length > 0 ? vehicles : this.getMockVehicles()
                }
            };
        } catch (error) {
            console.error('❌ Database fetch error:', error);
            return this.getMockRecommendations(userInputs);
        }
    }

    getMockRecommendations(userInputs) {
        return {
            recommendations: {
                guides: this.getMockGuides(),
                hotels: this.getMockHotels(userInputs.destination),
                vehicles: this.getMockVehicles()
            }
        };
    }

    getMockGuides() {
        return [
            { id: 1, name: "Saman Perera", specialties: "Cultural Tours", rating: 4.8, price: 15000, reviews: 120, verified: true },
            { id: 2, name: "Nimal Silva", specialties: "Adventure Tours", rating: 4.9, price: 18000, reviews: 95, verified: true },
            { id: 3, name: "Kamal Fernando", specialties: "Wildlife Tours", rating: 4.7, price: 13500, reviews: 87, verified: true }
        ];
    }

    getMockHotels(destination) {
        return [
            { id: 1, name: "Heritage Hotel", price: 24000, rating: 4.6, reviews: 200, location: destination, type: "Heritage" },
            { id: 2, name: "City Comfort Inn", price: 15000, rating: 4.4, reviews: 150, location: destination, type: "Budget" },
            { id: 3, name: "Luxury Resort", price: 45000, rating: 4.8, reviews: 300, location: destination, type: "Luxury" }
        ];
    }

    getMockVehicles() {
        return [
            { id: 1, name: "Toyota Hiace", capacity: 8, price: 12000, rating: 4.5, reviews: 80, pricePerKm: 150 },
            { id: 2, name: "Suzuki Wagon R", capacity: 4, price: 7500, rating: 4.3, reviews: 60, pricePerKm: 90 },
            { id: 3, name: "Tuk Tuk", capacity: 3, price: 4500, rating: 4.1, reviews: 45, pricePerKm: 60 }
        ];
    }

    getLocationSpecificFallback(userInputs) {
        const destination = userInputs.destination.toLowerCase();
        const duration = parseInt(userInputs.duration);
        
        // Location-specific attractions and activities
        const locationData = this.getLocationData(destination);
        
        return {
            itinerary: {
                destinations: duration,
                title: `Your ${duration}-Day ${userInputs.destination} Adventure`,
                summary: `Experience the best of ${userInputs.destination} with ${locationData.theme}`,
                dailyPlans: Array.from({ length: duration }, (_, i) => ({
                    day: i + 1,
                    destination: userInputs.destination,
                    title: `Day ${i + 1}: ${locationData.dayTitles[i % locationData.dayTitles.length]}`,
                    activities: this.selectActivitiesForDay(locationData.activities, i, userInputs),
                    highlights: locationData.highlights.slice(i, i + 2),
                    estimatedCost: this.estimateDayCost(userInputs.budget),
                    tips: locationData.tips[i % locationData.tips.length]
                }))
            }
        };
    }

    getLocationData(destination) {
        const locationMap = {
            'kandy': {
                theme: 'cultural heritage and scenic beauty',
                dayTitles: ['Cultural Immersion', 'Temple & Gardens', 'Traditional Crafts', 'Nature Exploration'],
                activities: [
                    'Visit Temple of the Sacred Tooth Relic',
                    'Explore Kandy Lake and Royal Palace',
                    'Traditional Kandyan dance performance',
                    'Royal Botanical Gardens Peradeniya',
                    'Gem museum and jewelry shopping',
                    'Udawatta Kele Sanctuary nature walk',
                    'Local spice garden tour',
                    'Traditional batik and wood carving workshops'
                ],
                highlights: ['Sacred Tooth Relic', 'Kandyan Cultural Show', 'Botanical Gardens', 'Scenic Lake Views'],
                tips: ['Visit temple early morning', 'Dress modestly for temples', 'Try traditional Kandyan cuisine', 'Book cultural show in advance']
            },
            'colombo': {
                theme: 'urban culture and historical landmarks',
                dayTitles: ['City Discovery', 'Colonial Heritage', 'Local Markets', 'Modern Colombo'],
                activities: [
                    'Independence Memorial Hall visit',
                    'Galle Face Green sunset walk',
                    'Pettah Market shopping experience',
                    'National Museum exploration',
                    'Gangaramaya Temple tour',
                    'Red Mosque and Dutch Hospital',
                    'Viharamahadevi Park relaxation',
                    'Modern shopping at One Galle Face'
                ],
                highlights: ['Independence Square', 'Galle Face Green', 'Pettah Markets', 'Colonial Architecture'],
                tips: ['Avoid rush hour traffic', 'Bargain at local markets', 'Try street food safely', 'Use rideshare apps']
            },
            'galle': {
                theme: 'coastal heritage and Dutch colonial charm',
                dayTitles: ['Fort Exploration', 'Coastal Adventures', 'Local Culture', 'Beach Relaxation'],
                activities: [
                    'Galle Fort UNESCO site tour',
                    'Dutch Reformed Church visit',
                    'Lighthouse and rampart walk',
                    'Unawatuna Beach activities',
                    'Traditional lace making demo',
                    'Stilt fishermen watching',
                    'Sea turtle hatchery visit',
                    'Sunset at Flag Rock'
                ],
                highlights: ['Galle Fort', 'Stilt Fishermen', 'Colonial Architecture', 'Beautiful Beaches'],
                tips: ['Wear comfortable walking shoes', 'Visit fort early or late', 'Respect turtle conservation', 'Check tide times for fishing']
            }
        };

        return locationMap[destination] || {
            theme: 'authentic Sri Lankan experiences',
            dayTitles: ['Cultural Discovery', 'Nature Exploration', 'Local Experiences', 'Scenic Adventures'],
            activities: [
                'Local temple and cultural site visits',
                'Traditional village tour',
                'Local market and food exploration',
                'Nature walk and wildlife spotting',
                'Traditional craft demonstrations',
                'Scenic viewpoint visits',
                'Local family homestay experience',
                'Regional specialty tasting'
            ],
            highlights: ['Local Culture', 'Natural Beauty', 'Authentic Experiences', 'Traditional Crafts'],
            tips: ['Respect local customs', 'Try authentic local cuisine', 'Support local artisans', 'Ask guides about hidden gems']
        };
    }

    selectActivitiesForDay(activities, dayIndex, userInputs) {
        const dailyActivities = activities.slice(dayIndex * 2, (dayIndex * 2) + 3);
        return dailyActivities.length > 0 ? dailyActivities : activities.slice(0, 3);
    }

    estimateDayCost(budget) {
        const budgetMap = {
            'budget': 'LKR 7,500-12,000 per person',
            'mid-range': 'LKR 15,000-24,000 per person', 
            'luxury': 'LKR 30,000-60,000 per person'
        };
        
        const budgetKey = budget.toLowerCase().includes('budget') ? 'budget' :
                         budget.toLowerCase().includes('luxury') ? 'luxury' : 'mid-range';
        
        return budgetMap[budgetKey] || 'LKR 15,000-24,000 per person';
    }    async generateItinerary(userInputs, recommendations) {
        if (!process.env.GROQ_API_KEY) {
            console.warn('⚠️ GROQ_API_KEY not found, using fallback itinerary');
            return this.getFallbackItinerary(userInputs);
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
                console.log(`✅ Generated dynamic itinerary for ${userInputs.destination}`);
                return parsed;
            } else {
                console.warn('⚠️ No valid JSON found in Groq response');
            }
        } catch (error) {
            console.error('❌ Itinerary generation error:', error.message);
        }

        return this.getLocationSpecificFallback(userInputs);
    }


    getFallbackItinerary(userInputs) {
        return this.getLocationSpecificFallback(userInputs);
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
