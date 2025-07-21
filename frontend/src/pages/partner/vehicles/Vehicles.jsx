import { useState } from 'react';
import PartnerLayout from '../../../components/partner/PartnerLayout';
import VehicleCard from '../../../components/partner/VehicleCard';
import EditVehicleForm from '../../../components/partner/EditVehicleForm';
import AddVehicleForm from '../../../components/partner/AddVehicleForm';

const vehicles = [
	{
		id: 1,
		name: 'Toyota Axio',
		type: 'Car',
		price: 4500,
		image: '/src/assets/vehicles/axio.jpg',
	},
	{
		id: 2,
		name: 'Toyota HiAce',
		type: 'Van',
		price: 8000,
		image: '/src/assets/vehicles/hiace.jpeg',
	},
	{
		id: 3,
		name: 'Rosa Bus',
		type: 'Bus',
		price: 12000,
		image: '/src/assets/vehicles/rosa.jpg',
	},
	{
		id: 4,
		name: 'Honda Civic',
		type: 'Car',
		price: 6500,
		image: '/src/assets/vehicles/civic.jpeg',
	},
	{
		id: 5,
		name: 'Suzuki Wagon R',
		type: 'Car',
		price: 3500,
		image: '/src/assets/vehicles/wagon.jpg',
	},
	{
		id: 6,
		name: 'Nissan Caravan',
		type: 'Van',
		price: 7500,
		image: '/src/assets/vehicles/caravan.jpeg',
	},
];

export default function Vehicles() {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const [showEditForm, setShowEditForm] = useState(false);
	const [showAddForm, setShowAddForm] = useState(false);

	const filteredVehicles = vehicles.filter((vehicle) => {
		const matchesSearch = vehicle.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesType =
			selectedType === 'all' ||
			vehicle.type.toLowerCase() === selectedType;
		return matchesSearch && matchesType;
	});

	const handleEdit = (vehicle) => {
		setSelectedVehicle(vehicle);
		setShowEditForm(true);
	};

	const handleUpdateVehicle = (updatedData) => {
		console.log('Updated vehicle data:', updatedData);
		// TODO: Implement the API call to update vehicle
		setShowEditForm(false);
	};

	return (
		<PartnerLayout activePage="my vehicles">
			<div className="mb-6 flex justify-between items-center">
				<div>
					<h1 className="text-2xl font-bold">My Vehicles</h1>
					<p className="text-gray-500">Manage your vehicles</p>
				</div>
				<button
					onClick={() => setShowAddForm(true)}
					className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center gap-2"
				>
					<i className="fas fa-plus"></i>
					Add New Vehicle
				</button>
			</div>

			{/* Filters */}
			<div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex gap-4">
				<input
					type="text"
					placeholder="Search vehicles..."
					className="flex-1 border rounded-lg px-4 py-2"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<select
					className="border rounded-lg px-4 py-2"
					value={selectedType}
					onChange={(e) => setSelectedType(e.target.value)}
				>
					<option value="all">All Types</option>
					<option value="car">Car</option>
					<option value="van">Van</option>
					<option value="bus">Bus</option>
				</select>
			</div>

			{/* Vehicle Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredVehicles.map((vehicle) => (
					<VehicleCard
						key={vehicle.id}
						vehicle={vehicle}
						onEdit={() => handleEdit(vehicle)}
					/>
				))}
			</div>

			{filteredVehicles.length === 0 && (
				<div className="text-center py-12 bg-white rounded-xl shadow-sm">
					<p className="text-gray-500">No vehicles found</p>
				</div>
			)}

			{showEditForm && (
				<EditVehicleForm
					vehicle={selectedVehicle}
					onClose={() => setShowEditForm(false)}
					onUpdate={handleUpdateVehicle}
				/>
			)}

			{showAddForm && (
				<AddVehicleForm onClose={() => setShowAddForm(false)} />
			)}
		</PartnerLayout>
	);
}
