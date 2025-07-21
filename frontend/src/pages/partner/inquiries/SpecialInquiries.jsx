import React, { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';

const InquiryCard = ({ inquiry, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'in progress':
        return 'bg-orange-100 text-orange-700';
      case 'quoted':
        return 'bg-purple-100 text-purple-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div 
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${isSelected ? 'bg-orange-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <img 
          src={inquiry.customer.image} 
          alt={inquiry.customer.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold">{inquiry.customer.name}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(inquiry.status)}`}>
              {inquiry.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{inquiry.destination}</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{inquiry.date}</span>
            <span>{inquiry.groupSize} travelers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecialInquiries = () => {
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [noteText, setNoteText] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');

  // Sample data - Replace with your API data
  const inquiries = [
    {
      id: 1,
      customer: {
        name: "Emma Wilson",
        email: "emma.w@example.com",
        phone: "+1 (555) 234-5678",
        image: "/src/assets/users/user1.jpg"
      },
      destination: "Custom Himalayan Trek",
      date: "Aug 15 - Aug 25, 2024",
      groupSize: 4,
      status: "New",
      budget: "$5000-$7000",
      requirements: [
        "Experienced guide for high-altitude trekking",
        "Photography opportunities",
        "Local cultural experiences",
        "Luxury accommodation where available"
      ],
      notes: [
        {
          date: "July 19, 2024",
          text: "Initial inquiry received. Client interested in photography spots.",
          author: "System"
        }
      ]
    },
    {
      id: 2,
      customer: {
        name: "James Chen",
        email: "james.c@example.com",
        phone: "+1 (555) 876-5432",
        image: "/src/assets/users/user2.avif"
      },
      destination: "Private Wine Tour - France",
      date: "Sep 10 - Sep 18, 2024",
      groupSize: 6,
      status: "In Progress",
      budget: "$10000-$15000",
      requirements: [
        "High-end vineyard visits",
        "Private tastings",
        "Michelin-star restaurants",
        "Luxury transportation"
      ],
      notes: [
        {
          date: "July 18, 2024",
          text: "Contacting premium vineyards for availability.",
          author: "Tour Manager"
        }
      ]
    }
  ];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const newNote = {
      date: new Date().toLocaleDateString(),
      text: noteText,
      author: "Tour Manager"
    };

    selectedInquiry.notes.unshift(newNote);
    setNoteText('');
  };

  const handleSendQuote = (e) => {
    e.preventDefault();
    if (!quoteAmount.trim()) return;

    const newNote = {
      date: new Date().toLocaleDateString(),
      text: `Quote sent: $${quoteAmount}`,
      author: "Tour Manager"
    };

    selectedInquiry.notes.unshift(newNote);
    selectedInquiry.status = 'Quoted';
    setQuoteAmount('');
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = filterStatus === 'all' || inquiry.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch = 
      inquiry.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.destination.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const StatsCard = ({ icon, label, value, type }) => (
    <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        type === "new" ? "bg-blue-100 text-blue-500" :
        type === "progress" ? "bg-orange-100 text-orange-500" :
        type === "confirmed" ? "bg-green-100 text-green-500" :
        "bg-purple-100 text-purple-500"
      }`}>
        <i className={`fas ${icon} text-xl`}></i>
      </div>
      <div>
        <h4 className="text-2xl font-bold">{value}</h4>
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );

  return (
    <PartnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Special Inquiries</h1>
            <p className="text-gray-600">Manage custom tour requests and special arrangements</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <StatsCard 
            icon="fa-sparkles" 
            label="New Inquiries" 
            value={inquiries.filter(i => i.status === 'New').length}
            type="new"
          />
          <StatsCard 
            icon="fa-spinner" 
            label="In Progress" 
            value={inquiries.filter(i => i.status === 'In Progress').length}
            type="progress"
          />
          <StatsCard 
            icon="fa-check-circle" 
            label="Confirmed" 
            value={inquiries.filter(i => i.status === 'Confirmed').length}
            type="confirmed"
          />
          <StatsCard 
            icon="fa-dollar-sign" 
            label="Avg. Budget" 
            value="$8,500"
            type="budget"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-300px)]">
          {/* Inquiries List */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search inquiries..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <select
                className="w-full p-2 border rounded-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in progress">In Progress</option>
                <option value="quoted">Quoted</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="overflow-y-auto h-[calc(100%-129px)]">
              {filteredInquiries.map(inquiry => (
                <InquiryCard
                  key={inquiry.id}
                  inquiry={inquiry}
                  isSelected={selectedInquiry?.id === inquiry.id}
                  onClick={() => setSelectedInquiry(inquiry)}
                />
              ))}
            </div>
          </div>

          {/* Inquiry Details */}
          {selectedInquiry ? (
            <div className="col-span-2 bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedInquiry.customer.image}
                      alt={selectedInquiry.customer.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{selectedInquiry.customer.name}</h2>
                      <p className="text-gray-600">{selectedInquiry.destination}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedInquiry.status === 'New' ? 'bg-blue-100 text-blue-700' :
                    selectedInquiry.status === 'In Progress' ? 'bg-orange-100 text-orange-700' :
                    selectedInquiry.status === 'Quoted' ? 'bg-purple-100 text-purple-700' :
                    selectedInquiry.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {selectedInquiry.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Contact Email</p>
                    <p className="font-medium">{selectedInquiry.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone Number</p>
                    <p className="font-medium">{selectedInquiry.customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Group Size</p>
                    <p className="font-medium">{selectedInquiry.groupSize} travelers</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Travel Dates</p>
                    <p className="font-medium">{selectedInquiry.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Budget Range</p>
                    <p className="font-medium">{selectedInquiry.budget}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-b">
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {selectedInquiry.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Activity Log</h3>
                  <div className="flex gap-3">
                    <form onSubmit={handleSendQuote} className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Quote amount..."
                        className="w-32 px-3 py-1 border rounded-lg"
                        value={quoteAmount}
                        onChange={(e) => setQuoteAmount(e.target.value)}
                      />
                      <button 
                        type="submit"
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        disabled={!quoteAmount}
                      >
                        Send Quote
                      </button>
                    </form>
                    <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Mark as Confirmed
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAddNote} className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add a note..."
                      className="flex-1 px-3 py-2 border rounded-lg"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      disabled={!noteText}
                    >
                      Add Note
                    </button>
                  </div>
                </form>

                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  {selectedInquiry.notes.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-gray-500">{note.date}</span>
                      </div>
                      <p className="text-gray-600">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow-sm border flex items-center justify-center">
              <div className="text-center">
                <i className="far fa-clipboard text-5xl text-gray-400 mb-2"></i>
                <p className="text-gray-500">Select an inquiry to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PartnerLayout>
  );
};

export default SpecialInquiries;
