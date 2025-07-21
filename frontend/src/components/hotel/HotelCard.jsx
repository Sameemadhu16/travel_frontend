import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import StatusBadge from '../admin/StatusBadge';
import { useNavigate } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img 
        src={hotel.image} 
        alt={hotel.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
            <div className="flex items-center text-sm text-content-secondary">
              <FaMapMarkerAlt className="mr-1" />
              <span>{hotel.location}</span>
            </div>
          </div>
          <StatusBadge status={hotel.status} />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <FaStar className="text-yellow-400" />
          <span className="font-medium">{hotel.rating}</span>
          <span className="text-content-secondary">({hotel.reviewCount} reviews)</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-content-secondary">Starting from</p>
            <p className="text-lg font-semibold">LKR {hotel.startingPrice}</p>
          </div>
          <button 
            onClick={() => navigate(`/hotel/branch/${hotel.id}`)}
            className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
