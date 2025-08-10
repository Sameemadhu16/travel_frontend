const GroqRecommendationService = require('../services/groqRecommendationService');

class RecommendationController {
    constructor() {
        this.groqService = new GroqRecommendationService();
    }

    generateRecommendations = async (req, res) => {
        try {
            console.log('📝 Received recommendation request:', req.body);
            
            const userInputs = req.body;
            
            // Validate required fields
            const requiredFields = ['destination', 'duration', 'adults', 'children'];
            const missingFields = requiredFields.filter(field => !userInputs[field]);
            
            if (missingFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: `Missing required fields: ${missingFields.join(', ')}`
                });
            }

            // Generate recommendations using Groq AI
            const recommendations = await this.groqService.getRecommendation(userInputs);
            
            console.log('✅ Generated recommendations successfully');
            
            res.json({
                success: true,
                data: recommendations,
                userInputs: userInputs,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('❌ Error generating recommendations:', error);
            
            res.status(500).json({
                success: false,
                error: 'Failed to generate recommendations',
                details: error.message
            });
        }
    };
}

module.exports = new RecommendationController();
