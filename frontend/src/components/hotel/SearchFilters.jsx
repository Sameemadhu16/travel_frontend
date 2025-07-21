import { FaMapMarkerAlt } from 'react-icons/fa';

export default function SearchFilters() {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-content-secondary" />
            <input
              type="text"
              placeholder="Search by location"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary">
            <option value="">All Prices</option>
            <option value="0-10000">Under LKR 10,000</option>
            <option value="10000-20000">LKR 10,000 - 20,000</option>
            <option value="20000+">Above LKR 20,000</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Rating</label>
          <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary">
            <option value="">All Ratings</option>
            <option value="4+">4+ Stars</option>
            <option value="3+">3+ Stars</option>
            <option value="2+">2+ Stars</option>
          </select>
        </div>
      </div>
    </div>
  );
}
