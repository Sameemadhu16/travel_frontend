/**
 * Help response system for the chatbot
 * Provides contextual help based on user queries
 */

export const helpKeywords = {
    help: ['help', 'guide', 'how to', 'tutorial', 'instructions', 'assist', 'support'],
    booking: ['book', 'reserve', 'reservation', 'booking'],
    hotels: ['hotel', 'accommodation', 'stay', 'room'],
    tours: ['tour', 'trip', 'package', 'excursion'],
    vehicles: ['vehicle', 'car', 'transport', 'rental'],
    account: ['account', 'profile', 'password', 'login', 'register'],
    payment: ['payment', 'pay', 'price', 'cost', 'fee'],
};

export const helpResponses = {
    general: {
        greeting: "Hello! I'm your Travel.lk assistant. I can help you with:\n\n" +
            "🏨 Finding hotels and accommodations\n" +
            "🗺️ Planning tours and trips\n" +
            "🚗 Booking vehicles\n" +
            "👤 Account management\n" +
            "💳 Payment and booking questions\n\n" +
            "What would you like to know?",
        
        help: "I'm here to help! Here's what I can do:\n\n" +
            "📍 **Search & Explore:**\n" +
            "• Find tours by destination (e.g., 'Tours in Kandy')\n" +
            "• Search hotels by location and budget\n" +
            "• Discover popular destinations\n\n" +
            "📅 **Booking Assistance:**\n" +
            "• Check availability and pricing\n" +
            "• Guide you through the booking process\n" +
            "• Explain cancellation policies\n\n" +
            "👤 **Account Help:**\n" +
            "• Reset password\n" +
            "• Update profile information\n" +
            "• View booking history\n\n" +
            "Try asking me something specific, like 'Find hotels in Colombo under $80' or use the Quick Actions below!"
    },

    hotels: {
        search: "Looking for hotels? I can help! 🏨\n\n" +
            "To find the perfect accommodation, tell me:\n" +
            "• **Location:** Which city or area? (e.g., Colombo, Kandy, Galle)\n" +
            "• **Dates:** Check-in and check-out dates\n" +
            "• **Budget:** Your price range (optional)\n" +
            "• **Preferences:** Pool, WiFi, breakfast included, etc.\n\n" +
            "Example: 'Find hotels in Kandy from Dec 20-25 under $100'",
        
        booking: "To book a hotel:\n\n" +
            "1. Search for hotels in your desired location\n" +
            "2. Review available options and prices\n" +
            "3. Select your preferred hotel\n" +
            "4. Choose your room type and dates\n" +
            "5. Complete payment securely\n" +
            "6. Receive instant confirmation via email\n\n" +
            "Need help finding a hotel first? Just tell me where you want to stay!"
    },

    tours: {
        search: "Planning a tour? Great choice! 🗺️\n\n" +
            "Tell me:\n" +
            "• **Destination:** Where do you want to go?\n" +
            "• **Duration:** How many days?\n" +
            "• **Interests:** Adventure, culture, wildlife, beach?\n" +
            "• **Group size:** Solo, couple, family?\n\n" +
            "Example: 'Show me 3-day cultural tours in the Cultural Triangle'",
        
        booking: "Booking a tour is easy:\n\n" +
            "1. Browse available tour packages\n" +
            "2. Select your preferred tour\n" +
            "3. Choose your travel dates\n" +
            "4. Add any optional activities\n" +
            "5. Provide traveler details\n" +
            "6. Complete secure payment\n" +
            "7. Get your itinerary via email\n\n" +
            "Ready to explore? Tell me what kind of tour you're interested in!"
    },

    vehicles: {
        search: "Need a vehicle? 🚗\n\n" +
            "I can help you find:\n" +
            "• **Cars:** Sedans, SUVs, luxury vehicles\n" +
            "• **Vans:** For groups and families\n" +
            "• **Bikes:** Motorbikes and scooters\n" +
            "• **With/Without Driver:** Your choice!\n\n" +
            "Just tell me:\n" +
            "• Type of vehicle\n" +
            "• Pickup location and dates\n" +
            "• Duration of rental\n\n" +
            "Example: 'Rent a car in Colombo for 5 days'",
        
        booking: "To rent a vehicle:\n\n" +
            "1. Tell me your vehicle preferences\n" +
            "2. Select from available options\n" +
            "3. Choose pickup/drop-off locations\n" +
            "4. Select rental duration\n" +
            "5. Add insurance (recommended)\n" +
            "6. Complete booking and payment\n" +
            "7. Receive rental confirmation\n\n" +
            "What type of vehicle are you looking for?"
    },

    account: {
        password: "To reset your password:\n\n" +
            "1. Go to the login page\n" +
            "2. Click 'Forgot Password?'\n" +
            "3. Enter your registered email\n" +
            "4. Check your email for reset link\n" +
            "5. Create a new strong password\n" +
            "6. Log in with your new password\n\n" +
            "Still having trouble? Contact our support team.",
        
        profile: "To update your profile:\n\n" +
            "1. Log in to your account\n" +
            "2. Click on your profile picture/name\n" +
            "3. Select 'Edit Profile'\n" +
            "4. Update your information\n" +
            "5. Save changes\n\n" +
            "You can update:\n" +
            "• Personal details\n" +
            "• Contact information\n" +
            "• Profile picture\n" +
            "• Preferences and notifications",
        
        bookings: "To view your bookings:\n\n" +
            "1. Log in to your account\n" +
            "2. Go to 'My Bookings' or 'Dashboard'\n" +
            "3. View all your past and upcoming bookings\n" +
            "4. Click on any booking for details\n" +
            "5. Download vouchers or receipts\n\n" +
            "You can also manage cancellations and modifications from there."
    },

    payment: {
        methods: "We accept multiple payment methods:\n\n" +
            "💳 **Credit/Debit Cards:**\n" +
            "• Visa, Mastercard, American Express\n\n" +
            "🏦 **Bank Transfer:**\n" +
            "• Direct bank transfer available\n\n" +
            "💰 **Digital Wallets:**\n" +
            "• Mobile payment options\n\n" +
            "All payments are secured with 256-bit SSL encryption. Your financial information is safe with us! 🔒",
        
        refund: "Cancellation and Refund Policy:\n\n" +
            "📋 **Standard Policy:**\n" +
            "• More than 7 days before: 90% refund\n" +
            "• 3-7 days before: 50% refund\n" +
            "• Less than 3 days: No refund\n\n" +
            "⚠️ Note: Policies may vary by service provider. Always check the specific cancellation policy before booking.\n\n" +
            "To cancel a booking, go to 'My Bookings' and select the booking you wish to cancel."
    },

    contact: {
        support: "Need to reach us? We're here to help! 📞\n\n" +
            "**Customer Support:**\n" +
            "• Email: support@travel.lk\n" +
            "• Phone: +94 11 234 5678\n" +
            "• Hours: 8 AM - 10 PM (Daily)\n\n" +
            "**Emergency Contact:**\n" +
            "• 24/7 Hotline: +94 77 777 7777\n\n" +
            "**Social Media:**\n" +
            "• Facebook: @TravelLK\n" +
            "• Instagram: @travel.lk\n" +
            "• Twitter: @TravelLK\n\n" +
            "You can also use the live chat feature on our website!"
    }
};

/**
 * Detects the intent of the user's message and returns appropriate help response
 */
export function getHelpResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Check for general help
    if (helpKeywords.help.some(keyword => lowerMessage.includes(keyword))) {
        return helpResponses.general.help;
    }

    // Check for hotel-related queries
    if (helpKeywords.hotels.some(keyword => lowerMessage.includes(keyword))) {
        if (helpKeywords.booking.some(keyword => lowerMessage.includes(keyword))) {
            return helpResponses.hotels.booking;
        }
        return helpResponses.hotels.search;
    }

    // Check for tour-related queries
    if (helpKeywords.tours.some(keyword => lowerMessage.includes(keyword))) {
        if (helpKeywords.booking.some(keyword => lowerMessage.includes(keyword))) {
            return helpResponses.tours.booking;
        }
        return helpResponses.tours.search;
    }

    // Check for vehicle-related queries
    if (helpKeywords.vehicles.some(keyword => lowerMessage.includes(keyword))) {
        if (helpKeywords.booking.some(keyword => lowerMessage.includes(keyword))) {
            return helpResponses.vehicles.booking;
        }
        return helpResponses.vehicles.search;
    }

    // Check for account-related queries
    if (helpKeywords.account.some(keyword => lowerMessage.includes(keyword))) {
        if (lowerMessage.includes('password')) {
            return helpResponses.account.password;
        }
        if (lowerMessage.includes('profile')) {
            return helpResponses.account.profile;
        }
        if (lowerMessage.includes('booking')) {
            return helpResponses.account.bookings;
        }
        return helpResponses.account.password;
    }

    // Check for payment-related queries
    if (helpKeywords.payment.some(keyword => lowerMessage.includes(keyword))) {
        if (lowerMessage.includes('refund') || lowerMessage.includes('cancel')) {
            return helpResponses.payment.refund;
        }
        return helpResponses.payment.methods;
    }

    // Check for contact/support
    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
        return helpResponses.contact.support;
    }

    // Default greeting for general queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return helpResponses.general.greeting;
    }

    return null; // No help response matched
}

/**
 * Get a random helpful tip
 */
export function getRandomTip() {
    const tips = [
        "💡 Tip: Be specific with dates and locations for better search results!",
        "💡 Tip: Mention your budget to get options that fit your price range!",
        "💡 Tip: Book early for better deals and availability!",
        "💡 Tip: Use Quick Actions below for instant common queries!",
        "💡 Tip: Ask follow-up questions to refine your search!",
        "💡 Tip: Check cancellation policies before booking!",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
}
