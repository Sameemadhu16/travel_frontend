import { X, MessageCircle, Search, Calendar, HelpCircle, User } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    const helpSections = [
        {
            icon: MessageCircle,
            title: "How to Chat",
            tips: [
                "Type your question in the input field at the bottom",
                "Press Enter or click Send to submit your message",
                "Use Quick Actions buttons for common requests",
                "Be specific with your questions for better responses"
            ]
        },
        {
            icon: Search,
            title: "What You Can Ask",
            tips: [
                "Plan a trip to a specific destination in Sri Lanka",
                "Find hotels in your preferred location and budget",
                "Search for tour packages and activities",
                "Get information about vehicles and transportation",
                "Ask about booking procedures and payment"
            ]
        },
        {
            icon: Calendar,
            title: "Booking Help",
            tips: [
                "I can help you find available tours and hotels",
                "Ask about dates, pricing, and availability",
                "Get guidance on how to complete your booking",
                "Learn about cancellation and refund policies"
            ]
        },
        {
            icon: User,
            title: "Account Support",
            tips: [
                "Reset your password if you forgot it",
                "Update your profile information",
                "View your booking history",
                "Manage your preferences and notifications"
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-primary to-blue-600 text-white p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-brand-secondary/30 rounded-full transition-colors"
                        aria-label="Close help"
                    >
                        <X size={24} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-3 rounded-full">
                            <HelpCircle size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">How Can I Help You?</h2>
                            <p className="text-blue-100 mt-1">Your guide to using Travel.lk Assistant</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
                    {/* Welcome Message */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-gray-700 leading-relaxed">
                            👋 <strong>Welcome!</strong> I'm your AI-powered travel assistant for Sri Lanka. 
                            I can help you plan trips, find accommodations, book tours, and answer any questions 
                            about your travel experience.
                        </p>
                    </div>

                    {/* Help Sections */}
                    {helpSections.map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                            <div key={index} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-brand-primary/10 p-2 rounded-lg">
                                        <IconComponent className="text-brand-primary" size={24} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {section.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="flex items-start gap-2 text-gray-600">
                                            <span className="text-brand-primary font-bold mt-1">•</span>
                                            <span className="flex-1">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}

                    {/* Example Questions */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <span>💡</span> Example Questions to Try
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {[
                                "Show me tours in Kandy",
                                "Find hotels under $100",
                                "What's the weather like in Galle?",
                                "How do I reset my password?",
                                "Best time to visit Ella?",
                                "Available vehicles for rent"
                            ].map((example, index) => (
                                <div key={index} className="bg-white px-3 py-2 rounded-lg text-sm text-gray-700 border border-purple-200">
                                    "{example}"
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tips */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <span>✨</span> Pro Tips
                        </h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                            <li>• Be specific with dates and locations for better results</li>
                            <li>• Mention your budget if you have one</li>
                            <li>• Ask follow-up questions to refine your search</li>
                            <li>• Use Quick Actions for instant common queries</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                        Still need help? <button className="text-brand-primary font-semibold hover:underline">Contact Support</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
