const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/generate', recommendationController.generateRecommendations);

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        service: 'Recommendation Service',
        groqConfigured: !!process.env.GROQ_API_KEY,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
