import convertible from '../../assets/vehicles/convertible.jpg';
import electricCar from '../../assets/vehicles/electricCar.jpg';
import hatchback from '../../assets/vehicles/hatchback.jpg';
import luxuryCar from '../../assets/vehicles/luxuryCar.jpg';
import sedan from '../../assets/vehicles/sedan.jpg';
import suv from '../../assets/vehicles/suv.jpg';

export const vehicleImages =
    [sedan, suv, hatchback, convertible, luxuryCar, electricCar];

// Helper to get random images for each vehicle
function getRandomImages(imagesArr, count = 5) {
  const shuffled = [...imagesArr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const vehicleList = [
  {
    id: 1,
    name: 'Toyota Corolla',
    location: 'Colombo',
    rating: 4.7,
    pricePerDay: 5000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'Sedan',
    availableCars: 3,
    reviews: 125,
    about:
        '**Compact Sedan:** The Toyota Corolla is a popular sedan known for its reliability and comfort. Equipped with modern features, it offers a smooth and efficient drive, perfect for city trips or long-distance drives. **Comfort and Convenience:** The car features air-conditioning, Bluetooth connectivity, and ample trunk space for luggage. Enjoy a fuel-efficient ride with low maintenance costs, making it ideal for daily rentals and business trips. **Location:** Available for pickup in Colombo, with easy access to popular tourist destinations and beaches.'
  },
  {
    id: 2,
    name: 'Ford Explorer',
    location: 'Kandy',
    rating: 4.6,
    pricePerDay: 7500,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'SUV',
    availableCars: 2,
    reviews: 110,
    about:
        '**Spacious SUV:** The Ford Explorer is a spacious and powerful SUV ideal for off-road adventures and family trips. Featuring a robust design, it offers ample space for up to 7 passengers and a large luggage area. **Adventure Ready:** With advanced features such as 4WD capability, hill descent control, and climate control, the Explorer ensures a smooth and comfortable ride in both urban and rugged terrains. **Location:** Pickup available in Kandy, located near scenic hill country destinations and adventure trails.'
  },
  {
    id: 3,
    name: 'Honda Civic',
    location: 'Galle',
    rating: 4.8,
    pricePerDay: 6000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'Sedan',
    availableCars: 4,
    reviews: 150,
    about:
        '**Stylish Sedan:** The Honda Civic is a sleek and fuel-efficient sedan that offers both comfort and performance. Perfect for urban drives and long road trips, it comes equipped with a modern infotainment system, ample interior space, and a refined exterior design. **Efficiency and Comfort:** Enjoy a smooth ride with excellent fuel economy, making it perfect for both business and leisure travel. **Location:** Available for rent in Galle, a city known for its coastal beauty and historical significance.'
  },
  {
    id: 4,
    name: 'Mercedes-Benz E-Class',
    location: 'Colombo',
    rating: 4.9,
    pricePerDay: 15000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Diesel',
    transmission: 'Automatic',
    type: 'Luxury Car',
    availableCars: 2,
    reviews: 80,
    about:
        '**Luxury Sedan:** The Mercedes-Benz E-Class offers an unrivaled luxury experience with its top-notch interiors, superior comfort, and advanced technology. It’s perfect for business trips or anyone looking for an elegant ride. **High Performance:** With a powerful engine, impeccable design, and excellent handling, the E-Class provides a superior driving experience. **Location:** Available for premium rentals in Colombo, with convenient access to business districts, malls, and luxury destinations.'
  },
  {
    id: 5,
    name: 'Nissan Leaf',
    location: 'Colombo',
    rating: 4.5,
    pricePerDay: 7000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Electric',
    transmission: 'Automatic',
    type: 'Electric',
    availableCars: 3,
    reviews: 90,
    about:
        '**Eco-Friendly Electric Car:** The Nissan Leaf is a fully electric vehicle that provides an eco-friendly driving experience. With zero emissions and cutting-edge technology, it’s the ideal car for those looking to reduce their carbon footprint. **Sustainable and Convenient:** The Leaf offers a quiet and comfortable ride with instant torque and responsive handling, ideal for urban travel. **Location:** Available for pickup in Colombo, with charging stations conveniently located around the city.'
  },
  {
    id: 6,
    name: 'Hyundai Tucson',
    location: 'Jaffna',
    rating: 4.3,
    pricePerDay: 8500,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Diesel',
    transmission: 'Automatic',
    type: 'SUV',
    availableCars: 3,
    reviews: 100,
    about:
        '**Spacious SUV:** The Hyundai Tucson is a compact SUV offering a blend of power, comfort, and practicality. It’s perfect for family vacations, off-road adventures, and long trips. **Comfort Features:** Equipped with advanced safety features, touchscreen navigation, and a spacious interior with flexible seating. The Tucson is designed for both urban and outdoor adventures. **Location:** Pickup available in Jaffna, with access to Northern Sri Lanka’s beaches and cultural landmarks.'
  },
  {
    id: 7,
    name: 'Toyota Prius',
    location: 'Nuwara Eliya',
    rating: 4.4,
    pricePerDay: 6500,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    type: 'Hybrid',
    availableCars: 4,
    reviews: 80,
    about:
        '**Efficient Hybrid Car:** The Toyota Prius offers the perfect balance between fuel efficiency and environmental sustainability. With a hybrid engine that combines a gasoline engine and electric motor, it’s the ideal car for eco-conscious travelers. **Low Fuel Consumption:** Known for its remarkable fuel efficiency, the Prius is perfect for long-distance trips and urban drives. **Location:** Available for rental in Nuwara Eliya, with easy access to hill country and nature reserves.'
  },
  {
    id: 8,
    name: 'Ford Mustang Convertible',
    location: 'Colombo',
    rating: 4.8,
    pricePerDay: 12000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    type: 'Convertible',
    availableCars: 2,
    reviews: 75,
    about:
        '**Classic Convertible:** The Ford Mustang Convertible offers an exhilarating driving experience with its powerful engine and open-top design. Ideal for road trips and special occasions, it provides a combination of classic muscle car performance and modern comfort. **Iconic Design:** Featuring a powerful V8 engine, leather interiors, and premium audio system, the Mustang offers a thrilling ride. **Location:** Pickup available in Colombo, a perfect spot for cruising the coastal roads and iconic landmarks.'
  },
  {
    id: 9,
    name: 'BMW X5',
    location: 'Negombo',
    rating: 4.6,
    pricePerDay: 9500,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Diesel',
    transmission: 'Automatic',
    type: 'Luxury SUV',
    availableCars: 3,
    reviews: 95,
    about:
        '**Premium SUV:** The BMW X5 is a luxury SUV that combines powerful performance with luxurious comfort. It features a stylish design, advanced technology, and spacious interiors, making it perfect for long drives and family vacations. **Performance and Luxury:** Equipped with advanced driving aids, premium seating, and superior audio systems, the X5 offers an exceptional driving experience. **Location:** Pickup available in Negombo, ideal for exploring both coastal regions and urban destinations.'
  },
  {
    id: 10,
    name: 'Suzuki Swift',
    location: 'Batticaloa',
    rating: 4.2,
    pricePerDay: 4000,  // LKR
    images: getRandomImages(vehicleImages),
    fuelType: 'Gasoline',
    transmission: 'Manual',
    type: 'Hatchback',
    availableCars: 5,
    reviews: 130,
    about:
        '**Compact Hatchback:** The Suzuki Swift is a compact and fuel-efficient hatchback, perfect for navigating city streets and short trips. It offers a simple yet functional design with easy handling and excellent fuel economy. **Affordable and Practical:** The Swift is ideal for budget-conscious travelers who need a reliable car for daily use. **Location:** Available for pickup in Batticaloa, offering easy access to the East Coast beaches and cultural sites.'
  }
]
