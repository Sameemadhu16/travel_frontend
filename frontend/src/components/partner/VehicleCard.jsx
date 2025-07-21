export default function VehicleCard({ vehicle, onEdit, onView, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <img 
        src={vehicle.image} 
        alt={vehicle.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
        <p className="text-sm text-gray-500">{vehicle.type}</p>
        
        <div className="mt-3">
          <div className="text-orange-500 font-bold">
            LKR {vehicle.price.toLocaleString()}
            <span className="text-sm text-gray-400 font-normal">/day</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button 
            onClick={() => onEdit?.(vehicle)}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Edit
          </button>
          <button 
            onClick={() => onView(vehicle.id)}
            className="flex-1 px-4 py-2 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50"
          >
            View
          </button>
          <button 
            onClick={() => onDelete(vehicle.id)}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
