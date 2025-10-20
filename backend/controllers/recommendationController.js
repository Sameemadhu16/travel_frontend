const GroqRecommendationService = require('../services/groqRecommendationService');

const recommendationController = {
    async generateRecommendations(req, res) {
        try {
            const userInputs = req.body;
            
            // Validate required fields
            if (!userInputs.destination || !userInputs.duration) {
                return res.status(400).json({
                    success: false,
                    error: 'Destination and duration are required'
                });
            }
            const service = new GroqRecommendationService();
            
            // Get recommendations
            const recommendations = await service.getRecommendation(userInputs);
            
            const response = {
                success: true,
                data: recommendations,
                userInputs: userInputs,
                generatedAt: new Date().toISOString()
            };
            res.json(response);

        } catch (error) {
            console.error('Controller error:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Internal server error',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            });
        }
    }
};

module.exports = recommendationController;
