import React, { useState } from 'react'
import PartnerLayout from '../../../components/partner/PartnerLayout'
import Title from '../../../components/Title'
import InputField from '../../../components/InputField'
import InputArea from '../../../components/InputArea'
import PrimaryButton from '../../../components/PrimaryButton'

export default function HelpCenter() {
    const [activeTab, setActiveTab] = useState('faqs')
    const [selectedCategory, setSelectedCategory] = useState('general')
    const [showTicketModal, setShowTicketModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Sample help center data - replace with actual data from your backend
    const helpData = {
        faqs: {
            general: [
                {
                    question: 'How do I create a new trip package?',
                    answer: 'To create a new trip package, go to the Trip Planner section and click on "Create New Trip". Fill in the required details such as trip name, duration, price, and itinerary.'
                },
                {
                    question: 'How can I view my bookings?',
                    answer: 'You can view all your bookings in the Bookings section. The dashboard shows active bookings, booking history, and pending requests.'
                }
            ],
            payments: [
                {
                    question: 'When will I receive my payments?',
                    answer: 'Payments are processed within 3-5 business days after the completion of a trip. You can track payment status in the Earnings section.'
                },
                {
                    question: 'What payment methods are accepted?',
                    answer: 'We currently support bank transfers and digital payments through verified payment gateways.'
                }
            ],
            account: [
                {
                    question: 'How do I update my business information?',
                    answer: 'Go to Settings > Profile and update your business information in the provided fields. Don\'t forget to save changes.'
                },
                {
                    question: 'How can I change my password?',
                    answer: 'Navigate to Settings > Security to change your password. You\'ll need to enter your current password and choose a new one.'
                }
            ]
        },
        articles: [
            {
                id: 1,
                title: 'Getting Started Guide',
                category: 'Guides',
                excerpt: 'Learn how to set up your partner account and start managing your trips.',
                readTime: '5 min read'
            },
            {
                id: 2,
                title: 'Managing Your Bookings',
                category: 'Tutorials',
                excerpt: 'A comprehensive guide to managing bookings and handling customer requests.',
                readTime: '8 min read'
            },
            {
                id: 3,
                title: 'Payment Processing Guide',
                category: 'Payments',
                excerpt: 'Understanding payment cycles, processing times, and financial reports.',
                readTime: '6 min read'
            }
        ]
    }

    return (
        <PartnerLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Title text="Help Center" />
                    <PrimaryButton
                        text="Submit a Ticket"
                        onClick={() => setShowTicketModal(true)}
                    />
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="max-w-2xl mx-auto">
                        <InputField
                            placeholder="Search for help articles, FAQs, or topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Help Center Navigation */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {['faqs', 'articles', 'contact', 'tickets'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${
                                    activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm uppercase`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* FAQs Section */}
                {activeTab === 'faqs' && (
                    <div className="grid grid-cols-12 gap-6">
                        {/* FAQ Categories */}
                        <div className="col-span-3">
                            <div className="bg-white rounded-lg shadow p-4">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {Object.keys(helpData.faqs).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                                                selectedCategory === category
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* FAQ Content */}
                        <div className="col-span-9">
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6">
                                    <h2 className="text-xl font-medium text-gray-900 mb-6 capitalize">
                                        {selectedCategory} FAQs
                                    </h2>
                                    <div className="space-y-6">
                                        {helpData.faqs[selectedCategory].map((faq, index) => (
                                            <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                    {faq.question}
                                                </h3>
                                                <p className="text-gray-600">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Help Articles Section */}
                {activeTab === 'articles' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {helpData.articles.map((article) => (
                            <div key={article.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {article.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{article.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h3>
                                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Contact Section */}
                {activeTab === 'contact' && (
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-lg shadow-md">
                            <div className="p-6">
                                <h2 className="text-xl font-medium text-gray-900 mb-6">Contact Support</h2>
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="border-b border-gray-200 pb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Email Support</h3>
                                        <p className="text-gray-600 mb-4">
                                            Send us an email and we'll get back to you within 24 hours.
                                        </p>
                                        <a
                                            href="mailto:support@example.com"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            support@example.com
                                        </a>
                                    </div>
                                    <div className="border-b border-gray-200 pb-6">
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Phone Support</h3>
                                        <p className="text-gray-600 mb-4">
                                            Available Monday to Friday, 9:00 AM - 5:00 PM
                                        </p>
                                        <a
                                            href="tel:+94712345678"
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            +94 71 234 5678
                                        </a>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Live Chat</h3>
                                        <p className="text-gray-600 mb-4">
                                            Chat with our support team in real-time
                                        </p>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                            Start Live Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Support Tickets Section */}
                {activeTab === 'tickets' && (
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-medium text-gray-900">Your Support Tickets</h2>
                                <PrimaryButton
                                    text="New Ticket"
                                    onClick={() => setShowTicketModal(true)}
                                />
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ticket ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Last Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            #12345
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            Payment Processing Issue
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                In Progress
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            2025-07-19
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            2025-07-20
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* New Ticket Modal */}
                {showTicketModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
                            <h2 className="text-2xl font-bold mb-6">Submit Support Ticket</h2>
                            <form className="space-y-6">
                                <InputField
                                    label="Subject"
                                    placeholder="Enter ticket subject"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Billing Issue</option>
                                        <option>Feature Request</option>
                                    </select>
                                </div>
                                <InputArea
                                    label="Description"
                                    placeholder="Describe your issue in detail"
                                    rows={4}
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Priority
                                    </label>
                                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                        <option>Low</option>
                                        <option>Medium</option>
                                        <option>High</option>
                                        <option>Urgent</option>
                                    </select>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowTicketModal(false)}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <PrimaryButton text="Submit Ticket" type="submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </PartnerLayout>
    )
}
