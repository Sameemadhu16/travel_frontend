import shan from '../assets/hotels/shan.jpg'
import amaya from '../assets/hotels/amaya.avif'
import galleFort from '../assets/hotels/galle.jpeg'
import jetwingYala from '../assets/hotels/jetwing.jpg'
import acres98 from '../assets/hotels/9 arches.jpg'
import araliyaGreen from '../assets/hotels/araliya.jpg'
import trincoBlu from '../assets/hotels/trinco.jpg'
import anantaya from '../assets/hotels/anataya.jpg'
import cinnamonRed from '../assets/hotels/cinnomon-red.jpg'
import mandara from '../assets/hotels/mandara.jpg'



export const travelPlaces = [
    { id: 1, value: "Colombo" },
    { id: 2, value: "Kandy" },
    { id: 3, value: "Galle" },
    { id: 4, value: "Sigiriya" },
    { id: 5, value: "Anuradhapura" },
    { id: 6, value: "Polonnaruwa" },
    { id: 7, value: "Nuwara Eliya" },
    { id: 8, value: "Ella" },
    { id: 9, value: "Mirissa" },
    { id: 10, value: "Unawatuna" },
    { id: 11, value: "Bentota" },
    { id: 12, value: "Negombo" },
    { id: 13, value: "Trincomalee" },
    { id: 14, value: "Jaffna" },
    { id: 15, value: "Dambulla" },
    { id: 16, value: "Yala National Park" },
    { id: 17, value: "Wilpattu National Park" },
    { id: 18, value: "Adam's Peak" },
    { id: 19, value: "Hikkaduwa" },
    { id: 20, value: "Arugam Bay" },
    { id: 21, value: "Pasikuda" },
    { id: 22, value: "Batticaloa" },
    { id: 23, value: "Kitulgala" },
    { id: 24, value: "Ratnapura" },
    { id: 25, value: "Sinharaja Forest Reserve" },
    { id: 26, value: "Udawalawe National Park" },
    { id: 27, value: "Minneriya National Park" },
    { id: 28, value: "Pinnawala Elephant Orphanage" },
    { id: 29, value: "Kataragama" },
    { id: 30, value: "Tangalle" },
    { id: 31, value: "Kalpitiya" },
    { id: 32, value: "Nilaveli" },
    { id: 33, value: "Dikwella" },
    { id: 34, value: "Weligama" },
    { id: 35, value: "Horton Plains" },
    { id: 36, value: "Knuckles Mountain Range" },
    { id: 37, value: "Puttalam" },
    { id: 38, value: "Mannar" },
    { id: 39, value: "Ambalangoda" },
    { id: 40, value: "Beruwala" }
];

export const hotelList = [
    {
        id: 1,
        name: "Shangri-La Colombo",
        location: "Colombo",
        rating: 4.8,
        pricePerNight: 12490, // LKR
        image: shan,
        amenities: ["Free Wi-Fi", "Pool", "Spa", "Gym", "Restaurant", "Parking"],
        type: "Luxury",
        leftRooms: 3,
        reviews: 321,
    },
    {
        id: 2,
        name: "Amaya Hills",
        location: "Kandy",
        rating: 4.5,
        pricePerNight: 5490, // LKR
        image: amaya,
        amenities: ["Free Wi-Fi", "Pool", "Mountain View", "Parking"],
        type: "Resort",
        leftRooms: 5,
        reviews: 210,
    },
    {
        id: 3,
        name: "Galle Fort Hotel",
        location: "Galle",
        rating: 4.6,
        pricePerNight: 11000, // LKR
        image: galleFort,
        amenities: ["Free Wi-Fi", "Historic Building", "Restaurant"],
        type: "Boutique",
        leftRooms: 2,
        reviews: 98,
    },
    {
        id: 4,
        name: "Jetwing Yala",
        location: "Yala National Park",
        rating: 4.7,
        pricePerNight: 12400, // LKR
        image: jetwingYala,
        amenities: ["Beach Access", "Safari Packages", "Pool", "Restaurant"],
        type: "Eco-Resort",
        leftRooms: 4,
        reviews: 156,
    },
    {
        id: 5,
        name: "98 Acres Resort & Spa",
        location: "Ella",
        rating: 4.9,
        pricePerNight: 5790, // LKR
        image: acres98,
        amenities: ["Free Wi-Fi", "Spa", "Nature View", "Restaurant"],
        type: "Resort",
        leftRooms: 5,
        reviews: 187,
    },
    {
        id: 6,
        name: "Araliya Green Hills Hotel",
        location: "Nuwara Eliya",
        rating: 4.3,
        pricePerNight: 7850, // LKR
        image: araliyaGreen,
        amenities: ["Heated Pool", "Restaurant", "Garden", "Free Wi-Fi"],
        type: "Hotel",
        leftRooms: 6,
        reviews: 142,
    },
    {
        id: 7,
        name: "Trinco Blu by Cinnamon",
        location: "Trincomalee",
        rating: 4.4,
        pricePerNight: 6000, // LKR
        image: trincoBlu,
        amenities: ["Beach Access", "Free Wi-Fi", "Diving", "Restaurant"],
        type: "Resort",
        leftRooms: 5,
        reviews: 120,
    },
    {
        id: 8,
        name: "Anantaya Resort & Spa",
        location: "Chilaw",
        rating: 4.2,
        pricePerNight: 34000, // LKR
        image: anantaya,
        amenities: ["Pool", "Spa", "Free Wi-Fi", "Lake View"],
        type: "Luxury",
        leftRooms: 3,
        reviews: 77,
    },
    {
        id: 9,
        name: "Cinnamon Red",
        location: "Colombo",
        rating: 4.1,
        pricePerNight: 2900, // LKR
        image: cinnamonRed,
        amenities: ["Rooftop Pool", "Restaurant", "Free Wi-Fi", "City View"],
        type: "Hotel",
        leftRooms: 6,
        reviews: 201,
    },
    {
        id: 10,
        name: "Mandara Resort",
        location: "Mirissa",
        rating: 4.0,
        pricePerNight: 13790, // LKR
        image: mandara,
        amenities: ["Beach Access", "Pool", "Free Wi-Fi", "Restaurant"],
        type: "Beach Resort",
        leftRooms: 2,
        reviews: 65,
    }
];

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
];

export const amenities = [
    { id: 1, value: "Free Wi-Fi" },
    { id: 2, value: "Pool" },
    { id: 3, value: "Restaurant" },
    { id: 4, value: "Fitness Center" },
    { id: 5, value: "Parking" },
    { id: 6, value: "Spa" },
    { id: 7, value: "Pet Friendly" },
    { id: 8, value: "Airport Shuttle" },
    { id: 9, value: "Beach Access" },
];

export const priceRanges = [
    { id: 1, value: "Under $50" },
    { id: 2, value: "$50 - $100" },
    { id: 3, value: "$100 - $200" },
    { id: 4, value: "Over $200" },
];

export const mealOptions = [
    { id: 1, value: "Breakfast Included" },
    { id: 2, value: "Half Board (Breakfast + Dinner)" },
    { id: 3, value: "Full Board (All Meals)" },
    { id: 4, value: "All Inclusive" },
    { id: 5, value: "No Meals" },
    { id: 6, value: "Room with Kitchenette" }
];

