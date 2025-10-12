import { navigateTo } from './navigateHelper'
import { 
    FaWifi, 
    FaSwimmingPool, 
    FaUtensils, 
    FaDumbbell, 
    FaParking, 
    FaSpa, 
    FaDog, 
    FaShuttleVan, 
    FaUmbrellaBeach, 
    FaSmoking,
    FaBluetooth, 
    FaCarBattery, 
    FaMapMarkedAlt, 
    FaCamera, 
    FaCogs, 
    FaPlug, 
    FaRoad, 
    FaGasPump, 
    FaChild, 
    FaCarSide 
} from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";

//user roles
export const USER_ROLES = {
    TRAVELER: 'traveler',
    PARTNER: 'partner',
    ADMIN: 'admin',
};

export const handleNavigate = (path) => {
    navigateTo(path);
}

export const hotelFilterOptions = [
    { id: 1, value: "Our top picks" },
    { id: 2, value: "Homes & apartments first" },
    { id: 3, value: "Price (lowest first)" },
    { id: 4, value: "Price (highest first)" },
    { id: 5, value: "Best reviewed and lowest price" },
    { id: 6, value: "Property rating (high to low)" },
    { id: 7, value: "Property rating (low to high)" },
    { id: 8, value: "Property rating and price" },
    { id: 9, value: "Distance from city centre" },
    { id: 10, value: "Top reviewed" },
    { id: 11, value: "Genius discounts first" },
    { id: 12, value: "Hotels" },
    { id: 13, value: "Apartments" },
    { id: 14, value: "Resorts" },
    { id: 15, value: "Villas" },
    { id: 16, value: "Hostels" },
    { id: 17, value: "Guesthouses" },
    { id: 18, value: "Free cancellation available" },
    { id: 19, value: "Free Wi-Fi" },
    { id: 20, value: "Swimming pool" },
    { id: 21, value: "Free parking" },
    { id: 22, value: "Family rooms" },
    { id: 23, value: "Pet-friendly" },
    { id: 24, value: "Airport shuttle" },
    { id: 25, value: "Spa and wellness" },
    { id: 26, value: "Breakfast included" },
    { id: 27, value: "Pay at hotel" },
    { id: 28, value: "⭐ 5 star" },
    { id: 29, value: "⭐ 4 star" },
    { id: 30, value: "⭐ 3 star" },
    { id: 31, value: "⭐ 2 star" },
    { id: 32, value: "⭐ 1 star" }
];


export const propertyTypes = [
    { id: 1, value: "Hotel" },
    { id: 2, value: "Resort" },
    { id: 3, value: "Apartment" },
    { id: 4, value: "Guest House" },
    { id: 5, value: "Villa" },
    { id: 6, value: "Airbnb" },
];

export const amenities = [
    { id: 11, value: "A/C", icon: TbAirConditioning },
    { id: 1, value: "Free Wi-Fi", icon: FaWifi },
    { id: 2, value: "Pool", icon: FaSwimmingPool },
    { id: 3, value: "Restaurant", icon: FaUtensils },
    { id: 4, value: "Fitness Center", icon: FaDumbbell },
    { id: 5, value: "Parking", icon: FaParking },
    { id: 6, value: "Spa", icon: FaSpa },
    { id: 7, value: "Pet Friendly", icon: FaDog },
    { id: 8, value: "Airport Shuttle", icon: FaShuttleVan },
    { id: 9, value: "Beach Access", icon: FaUmbrellaBeach },
    {id: 10, value: "Smoking Area", icon: FaSmoking }
];

export const priceRanges = [
    { id: 1, value: "Under LKR 15,000" },
    { id: 2, value: "LKR 15,000 - 30,000" },
    { id: 3, value: "LKR 30,000 - 60,000" },
    { id: 4, value: "Over LKR 60,000" },
];

export const mealOptions = [
    { id: 1, value: "Breakfast Included" },
    { id: 2, value: "Half Board (Breakfast + Dinner)" },
    { id: 3, value: "Full Board (All Meals)" },
    { id: 4, value: "All Inclusive" },
    { id: 5, value: "No Meals" },
    { id: 6, value: "Room with Kitchenette" }
];

export const vehicleFilterOptions = [
  {id: 1, value: 'Our top picks'},
  {id: 2, value: 'Car type (SUV first)'},
  {id: 3, value: 'Price (lowest first)'},
  {id: 4, value: 'Price (highest first)'},
  {id: 5, value: 'Best reviewed and lowest price'},
  {id: 6, value: 'Vehicle rating (high to low)'},
  {id: 7, value: 'Vehicle rating (low to high)'},
  {id: 8, value: 'Vehicle rating and price'},
  {id: 9, value: 'Distance from pickup location'},
  {id: 10, value: 'Top reviewed'},
  {id: 11, value: 'Electric vehicles first'},
  {id: 12, value: 'Luxury vehicles first'},
  {id: 13, value: 'SUVs'},
  {id: 14, value: 'Sedans'},
  {id: 15, value: 'Hatchbacks'},
  {id: 16, value: 'Motorcycles'},
  {id: 17, value: 'Vans'},
  {id: 18, value: 'Motorhomes'},
  {id: 19, value: 'Convertibles'},
  {id: 20, value: 'Luxury cars'},
  {id: 21, value: 'Economy cars'},
  {id: 22, value: 'Electric cars'},
  {id: 23, value: 'Hybrid cars'},
  {id: 24, value: 'Manual transmission'},
  {id: 25, value: 'Automatic transmission'},
  {id: 26, value: 'Air-conditioning'},
  {id: 27, value: 'GPS included'},
  {id: 28, value: 'Free cancellation available'},
  {id: 29, value: 'Free Wi-Fi'},
  {id: 30, value: 'Family friendly'},
  {id: 31, value: 'Pet-friendly'},
  {id: 32, value: 'Pay at pickup'},
  {id: 33, value: 'Full-to-full fuel policy'},
  {id: 34, value: 'Unlimited mileage'},
  {id: 35, value: '⭐ 5 star rating'},
  {id: 36, value: '⭐ 4 star rating'},
  {id: 37, value: '⭐ 3 star rating'},
  {id: 38, value: '⭐ 2 star rating'},
  {id: 39, value: '⭐ 1 star rating'}
];

// Vehicle property types (for renters)
export const vehiclePropertyTypes = [
    { id: 1, value: "SUV" },
    { id: 2, value: "Sedan" },
    { id: 3, value: "Hatchback" },
    { id: 4, value: "Van" },
    { id: 5, value: "Motorcycle" },
    { id: 6, value: "Convertible" },
    { id: 7, value: "Luxury Car" },
    { id: 8, value: "Electric Car" },
    { id: 9, value: "Hybrid Car" },
    { id: 10, value: "Motorhome" }
];

// Vehicle amenities (features)
export const vehicleAmenities = [
    { id: 1, value: "Air Conditioning", icon: FaCarSide },
    { id: 2, value: "Automatic Transmission", icon: FaCogs },
    { id: 3, value: "Manual Transmission", icon: FaCogs },
    { id: 4, value: "GPS Included", icon: FaMapMarkedAlt },
    { id: 5, value: "Bluetooth", icon: FaBluetooth },
    { id: 6, value: "Child Seat", icon: FaChild },
    { id: 7, value: "Unlimited Mileage", icon: FaRoad },
    { id: 8, value: "Free Wi-Fi", icon: FaWifi },
    { id: 9, value: "Pet Friendly", icon: FaCarSide },
    { id: 10, value: "Electric Vehicle", icon: FaPlug },
    { id: 11, value: "Hybrid Vehicle", icon: FaGasPump },
    { id: 12, value: "Parking Sensors", icon: FaCarBattery },
    { id: 13, value: "Rear Camera", icon: FaCamera }
];

// Vehicle price ranges
export const vehiclePriceRanges = [
    { id: 1, value: "Under LKR 9,000/day" },
    { id: 2, value: "LKR 9,000 - 18,000/day" },
    { id: 3, value: "LKR 18,000 - 30,000/day" },
    { id: 4, value: "Over LKR 30,000/day" }
];

// Vehicle fuel policy options
export const vehicleFuelPolicies = [
    { id: 1, value: "Full-to-full" },
    { id: 2, value: "Pre-purchase" },
    { id: 3, value: "Same-to-same" }
];

// Vehicle insurance options
export const vehicleInsuranceOptions = [
    { id: 1, value: "Collision Damage Waiver (CDW)" },
    { id: 2, value: "Theft Protection" },
    { id: 3, value: "Third-Party Liability" },
    { id: 4, value: "Personal Accident Insurance" }
];

// Vehicle pickup options
export const vehiclePickupOptions = [
    { id: 1, value: "Airport Pickup" },
    { id: 2, value: "City Center Pickup" },
    { id: 3, value: "Hotel Delivery" }
];
