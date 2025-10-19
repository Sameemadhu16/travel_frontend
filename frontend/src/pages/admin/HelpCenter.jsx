import { useState, useEffect } from 'react';
import { 
  FaSearch, FaBook, FaQuestionCircle, FaVideo, FaFileAlt, FaEnvelope, 
  FaPhone, FaComments, FaBug, FaLightbulb, FaUserShield, FaCog, 
  FaChartBar, FaUsers, FaHandshake, FaCreditCard, FaStar, FaBell,
  FaCalendar, FaExternalLinkAlt, FaDownload, FaClock, FaCheckCircle,
  FaExclamationTriangle, FaHeart, FaRocket, FaGraduationCap
} from 'react-icons/fa';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminHeader from '../../components/admin/AdminHeader';

// Mock data for help articles and resources
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <FaRocket />,
    color: 'bg-blue-500',
    description: 'Learn the basics of using Travel.lk admin panel',
    articleCount: 12,
    articles: [
      {
        title: 'Admin Dashboard Overview',
        description: 'Understanding your admin dashboard and key metrics',
        readTime: '5 min',
        category: 'Basics',
        helpful: 45,
        views: 1234
      },
      {
        title: 'Setting Up Your Admin Profile',
        description: 'Complete guide to configuring your administrator profile',
        readTime: '3 min',
        category: 'Setup',
        helpful: 38,
        views: 987
      },
      {
        title: 'Navigation and Menu Structure',
        description: 'Master the admin panel navigation for efficient workflow',
        readTime: '4 min',
        category: 'Navigation',
        helpful: 52,
        views: 1567
      }
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    icon: <FaUsers />,
    color: 'bg-green-500',
    description: 'Managing travelers, partners, and user accounts',
    articleCount: 18,
    articles: [
      {
        title: 'Managing Traveler Accounts',
        description: 'How to view, edit, and manage traveler registrations',
        readTime: '7 min',
        category: 'Users',
        helpful: 67,
        views: 2134
      },
      {
        title: 'Partner Verification Process',
        description: 'Step-by-step guide to verifying hotel and service partners',
        readTime: '10 min',
        category: 'Partners',
        helpful: 89,
        views: 1876
      },
      {
        title: 'User Role Management',
        description: 'Setting permissions and roles for different user types',
        readTime: '6 min',
        category: 'Permissions',
        helpful: 43,
        views: 1245
      }
    ]
  },
  {
    id: 'bookings-tours',
    title: 'Bookings & Tours',
    icon: <FaCalendar />,
    color: 'bg-purple-500',
    description: 'Managing tour requests, bookings, and reservations',
    articleCount: 15,
    articles: [
      {
        title: 'Processing Tour Requests',
        description: 'How to review, approve, and manage tour applications',
        readTime: '8 min',
        category: 'Tours',
        helpful: 72,
        views: 1987
      },
      {
        title: 'Booking Confirmation Workflow',
        description: 'Managing the booking lifecycle from request to completion',
        readTime: '9 min',
        category: 'Bookings',
        helpful: 56,
        views: 1654
      },
      {
        title: 'Cancellation and Refund Policies',
        description: 'Handling cancellations and processing refunds effectively',
        readTime: '12 min',
        category: 'Refunds',
        helpful: 81,
        views: 2234
      }
    ]
  },
  {
    id: 'payments-finance',
    title: 'Payments & Finance',
    icon: <FaCreditCard />,
    color: 'bg-orange-500',
    description: 'Payment processing, transactions, and financial management',
    articleCount: 14,
    articles: [
      {
        title: 'Payment Gateway Integration',
        description: 'Understanding payment methods and gateway configurations',
        readTime: '11 min',
        category: 'Payments',
        helpful: 94,
        views: 2567
      },
      {
        title: 'Transaction Monitoring',
        description: 'How to track and monitor all financial transactions',
        readTime: '6 min',
        category: 'Monitoring',
        helpful: 48,
        views: 1432
      },
      {
        title: 'Refund Request Processing',
        description: 'Step-by-step refund approval and decline procedures',
        readTime: '8 min',
        category: 'Refunds',
        helpful: 63,
        views: 1789
      }
    ]
  },
  {
    id: 'reviews-ratings',
    title: 'Reviews & Ratings',
    icon: <FaStar />,
    color: 'bg-yellow-500',
    description: 'Managing customer reviews and rating systems',
    articleCount: 10,
    articles: [
      {
        title: 'Review Moderation Guidelines',
        description: 'Best practices for reviewing and moderating customer feedback',
        readTime: '7 min',
        category: 'Moderation',
        helpful: 76,
        views: 1567
      },
      {
        title: 'Handling Flagged Content',
        description: 'Procedures for dealing with inappropriate or problematic reviews',
        readTime: '5 min',
        category: 'Content',
        helpful: 54,
        views: 1234
      },
      {
        title: 'Review Analytics and Insights',
        description: 'Understanding review metrics and customer satisfaction data',
        readTime: '9 min',
        category: 'Analytics',
        helpful: 67,
        views: 1876
      }
    ]
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    icon: <FaUserShield />,
    color: 'bg-red-500',
    description: 'Security protocols, compliance, and data protection',
    articleCount: 8,
    articles: [
      {
        title: 'Data Privacy Regulations',
        description: 'Compliance with Sri Lankan and international data protection laws',
        readTime: '15 min',
        category: 'Privacy',
        helpful: 89,
        views: 2345
      },
      {
        title: 'Account Security Best Practices',
        description: 'Securing your admin account and implementing 2FA',
        readTime: '6 min',
        category: 'Security',
        helpful: 72,
        views: 1678
      },
      {
        title: 'Audit Trail and Logging',
        description: 'Understanding system logs and activity tracking',
        readTime: '8 min',
        category: 'Auditing',
        helpful: 45,
        views: 1123
      }
    ]
  }
];

const quickActions = [
  {
    title: 'Contact Support',
    description: 'Get direct help from our support team',
    icon: <FaEnvelope />,
    color: 'bg-blue-500',
    action: 'contact'
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: <FaVideo />,
    color: 'bg-green-500',
    action: 'videos'
  },
  {
    title: 'System Status',
    description: 'Check current system status and uptime',
    icon: <FaCheckCircle />,
    color: 'bg-yellow-500',
    action: 'status'
  },
  {
    title: 'Report Bug',
    description: 'Report technical issues or bugs',
    icon: <FaBug />,
    color: 'bg-red-500',
    action: 'bug-report'
  }
];

const recentUpdates = [
  {
    title: 'New Payment Gateway Integration',
    description: 'Added support for multiple Sri Lankan payment methods',
    date: '2024-10-15',
    type: 'feature',
    icon: <FaCreditCard />
  },
  {
    title: 'Enhanced Review Moderation',
    description: 'Improved tools for managing customer reviews and feedback',
    date: '2024-10-12',
    type: 'improvement',
    icon: <FaStar />
  },
  {
    title: 'Security Update',
    description: 'Enhanced security protocols and two-factor authentication',
    date: '2024-10-10',
    type: 'security',
    icon: <FaUserShield />
  },
  {
    title: 'Analytics Dashboard Upgrade',
    description: 'New insights and reporting capabilities added',
    date: '2024-10-08',
    type: 'feature',
    icon: <FaChartBar />
  }
];

const supportChannels = [
  {
    title: 'Email Support',
    description: 'admin.support@travel.lk',
    icon: <FaEnvelope />,
    availability: '24/7',
    responseTime: 'Within 2 hours'
  },
  {
    title: 'Phone Support',
    description: '+94 11 234 5678',
    icon: <FaPhone />,
    availability: '9 AM - 6 PM (GMT+5:30)',
    responseTime: 'Immediate'
  },
  {
    title: 'Live Chat',
    description: 'Chat with our support team',
    icon: <FaComments />,
    availability: '9 AM - 11 PM (GMT+5:30)',
    responseTime: 'Within 5 minutes'
  }
];

// Help Stats Card Component
function HelpStatsCard({ icon, title, value, description, color }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <div className={`${color} text-white p-3 rounded-lg mr-4`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <span className="text-sm text-gray-500">{description}</span>
      </div>
    </div>
  );
}

// Category Card Component
function CategoryCard({ category, onSelectCategory }) {
  return (
    <div 
      onClick={() => onSelectCategory(category)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${category.color} text-white p-3 rounded-lg`}>
          {category.icon}
        </div>
        <span className="text-sm text-gray-500">{category.articleCount} articles</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 text-sm">{category.description}</p>
    </div>
  );
}

// Article List Component
function ArticleList({ articles, categoryTitle }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{categoryTitle} Articles</h3>
      <div className="space-y-4">
        {articles.map((article, index) => (
          <div key={index} className="border-l-4 border-orange-400 pl-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 hover:text-orange-600">{article.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{article.description}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaClock />
                    {article.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart />
                    {article.helpful} helpful
                  </span>
                  <span>{article.views.toLocaleString()} views</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{article.category}</span>
                </div>
              </div>
              <FaExternalLinkAlt className="text-gray-400 ml-4 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HelpCenter() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState(helpCategories);

  // Filter categories based on search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCategories(helpCategories);
    } else {
      const filtered = helpCategories.filter(category => 
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.articles.some(article => 
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCategories(filtered);
    }
  }, [searchQuery]);

  const handleQuickAction = (action) => {
    switch (action) {
      case 'contact':
        window.open('mailto:admin.support@travel.lk');
        break;
      case 'videos':
        // Navigate to video tutorials
        console.log('Opening video tutorials');
        break;
      case 'status':
        // Check system status
        console.log('Checking system status');
        break;
      case 'bug-report':
        // Open bug report form
        console.log('Opening bug report form');
        break;
      default:
        break;
    }
  };

  const getUpdateTypeIcon = (type) => {
    switch (type) {
      case 'feature': return 'text-blue-500';
      case 'improvement': return 'text-green-500';
      case 'security': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  if (selectedCategory) {
    return (
      <AdminLayout>
        <AdminHeader 
          title={`Help Center - ${selectedCategory.title}`}
          subtitle={selectedCategory.description}
        />
        
        <div className="mb-6">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
          >
            ← Back to Help Center
          </button>
        </div>

        <ArticleList articles={selectedCategory.articles} categoryTitle={selectedCategory.title} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader 
        title="Help Center" 
        subtitle="Get help and find answers to manage your Travel.lk admin panel effectively"
      />

      {/* Help Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <HelpStatsCard
          icon={<FaBook />}
          title="Total Articles"
          value="77"
          description="Comprehensive guides available"
          color="bg-blue-500"
        />
        <HelpStatsCard
          icon={<FaGraduationCap />}
          title="Video Tutorials"
          value="24"
          description="Step-by-step video guides"
          color="bg-green-500"
        />
        <HelpStatsCard
          icon={<FaComments />}
          title="Support Tickets"
          value="1,234"
          description="Resolved this month"
          color="bg-purple-500"
        />
        <HelpStatsCard
          icon={<FaClock />}
          title="Avg Response"
          value="1.5h"
          description="Average support response time"
          color="bg-orange-500"
        />
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="relative max-w-2xl mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:border-orange-500 text-lg" 
            placeholder="Search help articles, guides, and tutorials..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div 
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="border border-gray-200 rounded-lg p-4 hover:border-orange-400 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`${action.color} text-white p-2 rounded-lg`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Help Categories */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCategories.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                  onSelectCategory={setSelectedCategory}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Support Channels */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h3>
            <div className="space-y-4">
              {supportChannels.map((channel, index) => (
                <div key={index} className="border-l-4 border-orange-400 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    {channel.icon}
                    <h4 className="font-medium text-gray-900">{channel.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{channel.description}</p>
                  <p className="text-xs text-gray-500">
                    {channel.availability} • {channel.responseTime}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
            <div className="space-y-4">
              {recentUpdates.map((update, index) => (
                <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className={`${getUpdateTypeIcon(update.type)} mt-1`}>
                      {update.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{update.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{update.description}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <FaCheckCircle size={12} />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <FaCheckCircle size={12} />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="flex items-center gap-1 text-green-600 text-sm">
                  <FaCheckCircle size={12} />
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">File Storage</span>
                <span className="flex items-center gap-1 text-yellow-600 text-sm">
                  <FaExclamationTriangle size={12} />
                  Maintenance
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">Last updated: 2 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}