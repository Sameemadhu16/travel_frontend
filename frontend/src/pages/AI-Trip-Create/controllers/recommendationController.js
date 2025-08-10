import GroqRecommendationService from '../services/groqRecommendationService'

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

            console.log('📝 Received user inputs:', userInputs);

            const service = new GroqRecommendationService();
            
            // Get recommendations
            const recommendations = await service.getRecommendations(userInputs);
            
            // Generate itinerary
            const itinerary = await service.generateItinerary(userInputs, recommendations.recommendations);
            
            const response = {
                ...recommendations,
                ...itinerary,
                generatedAt: new Date().toISOString()
            };

            console.log('✅ Recommendations generated successfully');
            res.json(response);

        } catch (error) {
            console.error('❌ Controller error:', error);
            res.status(500).json({
                success: false,
                error: error.message || 'Failed to generate recommendations'
            });
        }
    }
};

module.exports = recommendationController;