// File: backend/routes/recommendations.js
import express from 'express'
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

router.post('/generate', recommendationController.generateRecommendations);

module.exports = router;

// File: backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const recommendationRoutes = require('./routes/recommendations');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/recommendations', recommendationRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Groq Recommendation API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Global error:', err.stack);
    res.status(500).json({ 
        success: false, 
        error: 'Something went wrong!' 
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Groq Recommendation Server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`🤖 API endpoint: http://localhost:${PORT}/api/recommendations/generate`);
});

module.exports = app;