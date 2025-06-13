import hondaCivic from '../../assets/vehicles/hondaCivic.jpg'
import hyundaiTucson from '../../assets/vehicles/hyundaiTucson.jpg'
import mercedesBenz from '../../assets/vehicles/mercedesBenz.jpg'
import nissanLeaf from '../../assets/vehicles/nissanLeaf.jpg'
import sedan from '../../assets/vehicles/sedan.jpg'
import suv from '../../assets/vehicles/suv.jpg';
import toyotaPrius from '../../assets/vehicles/toyotaPrius.jpg'
import fordMustang from '../../assets/vehicles/fordMustang.jpg'
import BMWX5 from '../../assets/vehicles/BMWX5.jpg'
import suzukiSwift from '../../assets/vehicles/suzukiSwift.jpg'

export const vehicleImages = [
  sedan, suv, hondaCivic, mercedesBenz, nissanLeaf, hyundaiTucson, toyotaPrius,
  fordMustang, BMWX5, suzukiSwift
];

// Helper to get random images for each vehicle
function getRandomImages(imagesArr, count = 5) {
  const shuffled = [...imagesArr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const vehicleList = [
  {
    id: "1",
    name: 'Toyota Corolla',
    brand: 'Toyota',
    model: 'Corolla',
    type: 'Sedan',
    pricePerDay: 5000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Air Conditioning",
      "Bluetooth",
      "ABS",
      "Power Steering",
      "USB Charger"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    rating: 4.7,
    reviews: 125,
    isFavorite: false,
    available: true,
    rentalAgency: 'CityDrive Rentals',
    location: 'Colombo',
    about: '**Compact Sedan:** The Toyota Corolla is a popular sedan known for its reliability and comfort. Equipped with modern features, it offers a smooth and efficient drive, perfect for city trips or long-distance drives. **Comfort and Convenience:** The car features air-conditioning, Bluetooth connectivity, and ample trunk space for luggage. Enjoy a fuel-efficient ride with low maintenance costs, making it ideal for daily rentals and business trips. **Location:** Available for pickup in Colombo, with easy access to popular tourist destinations and beaches.'
  },
  {
    id: "2",
    name: 'Ford Explorer',
    brand: 'Ford',
    model: 'Explorer',
    type: 'SUV',
    pricePerDay: 7500,
    images: getRandomImages(vehicleImages),
    amenities: [
      "4WD",
      "Air Conditioning",
      "Navigation System",
      "Bluetooth",
      "Parking Sensors"
    ],
    seats: 7,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    rating: 4.6,
    reviews: 110,
    isFavorite: false,
    available: true,
    rentalAgency: 'Adventure Wheels',
    location: 'Kandy',
    about: '**Spacious SUV:** The Ford Explorer is a spacious and powerful SUV ideal for off-road adventures and family trips. Featuring a robust design, it offers ample space for up to 7 passengers and a large luggage area. **Adventure Ready:** With advanced features such as 4WD capability, hill descent control, and climate control, the Explorer ensures a smooth and comfortable ride in both urban and rugged terrains. **Location:** Pickup available in Kandy, located near scenic hill country destinations and adventure trails.'
  },
  {
    id: "3",
    name: 'Honda Civic',
    brand: 'Honda',
    model: 'Civic',
    type: 'Sedan',
    pricePerDay: 6000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Air Conditioning",
      "Cruise Control",
      "Bluetooth",
      "Rear Camera",
      "USB Charger"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    rating: 4.8,
    reviews: 150,
    isFavorite: false,
    available: true,
    rentalAgency: 'Urban Mobility',
    location: 'Galle',
    about: '**Stylish Sedan:** The Honda Civic is a sleek and fuel-efficient sedan that offers both comfort and performance. Perfect for urban drives and long road trips, it comes equipped with a modern infotainment system, ample interior space, and a refined exterior design. **Efficiency and Comfort:** Enjoy a smooth ride with excellent fuel economy, making it perfect for both business and leisure travel. **Location:** Available for rent in Galle, a city known for its coastal beauty and historical significance.'
  },
  {
    id: "4",
    name: 'Mercedes-Benz E-Class',
    brand: 'Mercedes-Benz',
    model: 'E-Class',
    type: 'Luxury Car',
    pricePerDay: 15000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Leather Seats",
      "Navigation System",
      "Bluetooth",
      "Sunroof",
      "Premium Audio"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    rating: 4.9,
    reviews: 80,
    isFavorite: false,
    available: false,
    rentalAgency: 'Elite Auto Hire',
    location: 'Colombo',
    about: '**Luxury Sedan:** The Mercedes-Benz E-Class offers an unrivaled luxury experience with its top-notch interiors, superior comfort, and advanced technology. It’s perfect for business trips or anyone looking for an elegant ride. **High Performance:** With a powerful engine, impeccable design, and excellent handling, the E-Class provides a superior driving experience. **Location:** Available for premium rentals in Colombo, with convenient access to business districts, malls, and luxury destinations.'
  },
  {
    id: "5",
    name: 'Nissan Leaf',
    brand: 'Nissan',
    model: 'Leaf',
    type: 'Electric',
    pricePerDay: 7000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Electric Charging",
      "Bluetooth",
      "Navigation System",
      "Rear Camera",
      "Climate Control"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Electric',
    rating: 4.5,
    reviews: 90,
    isFavorite: false,
    available: true,
    rentalAgency: 'EcoDrive Rentals',
    location: 'Colombo',
    about: '**Eco-Friendly Electric Car:** The Nissan Leaf is a fully electric vehicle that provides an eco-friendly driving experience. With zero emissions and cutting-edge technology, it’s the ideal car for those looking to reduce their carbon footprint. **Sustainable and Convenient:** The Leaf offers a quiet and comfortable ride with instant torque and responsive handling, ideal for urban travel. **Location:** Available for pickup in Colombo, with charging stations conveniently located around the city.'
  },
  {
    id: "6",
    name: 'Hyundai Tucson',
    brand: 'Hyundai',
    model: 'Tucson',
    type: 'SUV',
    pricePerDay: 8500,
    images: getRandomImages(vehicleImages),
    amenities: [
      "4WD",
      "Bluetooth",
      "Navigation System",
      "Rear Camera",
      "Parking Sensors"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    rating: 4.3,
    reviews: 100,
    isFavorite: false,
    available: true,
    rentalAgency: 'Family Ride',
    location: 'Jaffna',
    about: '**Spacious SUV:** The Hyundai Tucson is a compact SUV offering a blend of power, comfort, and practicality. It’s perfect for family vacations, off-road adventures, and long trips. **Comfort Features:** Equipped with advanced safety features, touchscreen navigation, and a spacious interior with flexible seating. The Tucson is designed for both urban and outdoor adventures. **Location:** Pickup available in Jaffna, with access to Northern Sri Lanka’s beaches and cultural landmarks.'
  },
  {
    id: "7",
    name: 'Toyota Prius',
    brand: 'Toyota',
    model: 'Prius',
    type: 'Hybrid',
    pricePerDay: 6500,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Hybrid Engine",
      "Bluetooth",
      "Navigation System",
      "Climate Control",
      "Rear Camera"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    rating: 4.4,
    reviews: 80,
    isFavorite: false,
    available: false,
    rentalAgency: 'Green Wheels',
    location: 'Nuwara Eliya',
    about: '**Efficient Hybrid Car:** The Toyota Prius offers the perfect balance between fuel efficiency and environmental sustainability. With a hybrid engine that combines a gasoline engine and electric motor, it’s the ideal car for eco-conscious travelers. **Low Fuel Consumption:** Known for its remarkable fuel efficiency, the Prius is perfect for long-distance trips and urban drives. **Location:** Available for rental in Nuwara Eliya, with easy access to hill country and nature reserves.'
  },
  {
    id: "8",
    name: 'Ford Mustang Convertible',
    brand: 'Ford',
    model: 'Mustang Convertible',
    type: 'Convertible',
    pricePerDay: 12000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Convertible Roof",
      "Leather Seats",
      "Bluetooth",
      "Premium Audio",
      "Navigation System"
    ],
    seats: 4,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    rating: 4.8,
    reviews: 75,
    isFavorite: false,
    available: true,
    rentalAgency: 'Classic Cars Lanka',
    location: 'Colombo',
    about: '**Classic Convertible:** The Ford Mustang Convertible offers an exhilarating driving experience with its powerful engine and open-top design. Ideal for road trips and special occasions, it provides a combination of classic muscle car performance and modern comfort. **Iconic Design:** Featuring a powerful V8 engine, leather interiors, and premium audio system, the Mustang offers a thrilling ride. **Location:** Pickup available in Colombo, a perfect spot for cruising the coastal roads and iconic landmarks.'
  },
  {
    id: "9",
    name: 'BMW X5',
    brand: 'BMW',
    model: 'X5',
    type: 'Luxury SUV',
    pricePerDay: 9500,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Leather Seats",
      "Navigation System",
      "Bluetooth",
      "Parking Sensors",
      "Sunroof"
    ],
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    rating: 4.6,
    reviews: 95,
    isFavorite: false,
    available: true,
    rentalAgency: 'Luxury Drive',
    location: 'Negombo',
    about: '**Premium SUV:** The BMW X5 is a luxury SUV that combines powerful performance with luxurious comfort. It features a stylish design, advanced technology, and spacious interiors, making it perfect for long drives and family vacations. **Performance and Luxury:** Equipped with advanced driving aids, premium seating, and superior audio systems, the X5 offers an exceptional driving experience. **Location:** Pickup available in Negombo, ideal for exploring both coastal regions and urban destinations.'
  },
  {
    id: "10",
    name: 'Suzuki Swift',
    brand: 'Suzuki',
    model: 'Swift',
    type: 'Hatchback',
    pricePerDay: 4000,
    images: getRandomImages(vehicleImages),
    amenities: [
      "Air Conditioning",
      "Bluetooth",
      "USB Charger",
      "Power Steering",
      "ABS"
    ],
    seats: 5,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    rating: 4.2,
    reviews: 130,
    isFavorite: false,
    available: true,
    rentalAgency: 'Budget Auto',
    location: 'Batticaloa',
    about: '**Compact Hatchback:** The Suzuki Swift is a compact and fuel-efficient hatchback, perfect for navigating city streets and short trips. It offers a simple yet functional design with easy handling and excellent fuel economy. **Affordable and Practical:** The Swift is ideal for budget-conscious travelers who need a reliable car for daily use. **Location:** Available for pickup in Batticaloa, offering easy access to the East Coast beaches and cultural sites.'
  }
]
