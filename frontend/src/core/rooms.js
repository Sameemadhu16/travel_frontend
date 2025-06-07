import { amenities as amenitiesList } from './constant';

export const roomTypes = [
    { id: 1, value: "Single Room" },
    { id: 2, value: "Double Room" },
    { id: 3, value: "Twin Room" },
    { id: 4, value: "Triple Room" },
    { id: 5, value: "Quad Room" },
    { id: 6, value: "Junior Suite" },
    { id: 7, value: "Executive Suite" },
    { id: 8, value: "Presidential Suite" },
    { id: 9, value: "Honeymoon Suite" },
    { id: 10, value: "Family Suite" },
    { id: 11, value: "Accessible Room" },
    { id: 12, value: "Cabana Room" },
    { id: 13, value: "Villa / Bungalow" },
    { id: 14, value: "Murphy Room" },
    { id: 15, value: "Pod / Capsule Room" },
    { id: 16, value: "Studio Room" },
    { id: 17, value: "Executive Apartment" },
    { id: 18, value: "Serviced Apartment" }
];

export const bedTypes = [
    { id: 1, value: "Single Bed", width: 90, length: 190, capacity: 1 }, // cm (approx 35" x 75")
    { id: 2, value: "Twin Bed", width: 99, length: 190, capacity: 1 },  // cm (approx 39" x 75")
    { id: 3, value: "Double Bed", width: 137, length: 190, capacity: 2 }, // cm (approx 54" x 75")
    { id: 4, value: "Queen Bed", width: 152, length: 203, capacity: 2 },  // cm (approx 60" x 80")
    { id: 5, value: "King Bed", width: 183, length: 203, capacity: 2 },   // cm (approx 72" x 80")
    { id: 6, value: "Super King Bed", width: 203, length: 203, capacity: 2 }, // cm (approx 80" x 80")
    { id: 7, value: "California King Bed", width: 183, length: 213, capacity: 2 }, // cm (approx 72" x 84")
    { id: 8, value: "Bunk Bed", width: 99, length: 190, capacity: 2 },    // cm (per tier)
    { id: 9, value: "Sofa Bed", width: 137, length: 190, capacity: 2 },  // cm (when unfolded)
    { id: 10, value: "Murphy Bed", width: 137, length: 190, capacity: 2 }, // cm (wall-mounted)
    { id: 11, value: "Rollaway Bed", width: 99, length: 190, capacity: 1 }, // cm (portable)
    { id: 12, value: "Crib", width: 70, length: 130, capacity: 1 },       // cm (for infants)
    { id: 13, value: "Daybed", width: 99, length: 190, capacity: 1 },    // cm (dual-purpose)
    { id: 14, value: "Waterbed", width: 152, length: 203, capacity: 2 },  // cm (less common)
    { id: 15, value: "Futon", width: 137, length: 190, capacity: 2 }     // cm (foldable)
];

export const roomList = [
    {
        id: 1,
        hotelId: 1,  // Hotel 1 will have 2 room types (IDs 1 and 2)
        roomType: "Double Room",
        maxGuests: 2,
        bedType: "Queen Bed",
        pricePerNight: 120,
        amenities: [1, 3, 5],
        images: []
    },
    {
        id: 2,
        hotelId: 1,  // Second room for Hotel 1
        roomType: "Executive Suite",
        maxGuests: 4,
        bedType: "King Bed",
        pricePerNight: 250,
        amenities: [1, 2, 3, 6],  // WiFi, Pool, Restaurant, Spa
        images: []
    },
    {
        id: 3,
        hotelId: 2,
        roomType: "Single Room",
        maxGuests: 1,
        bedType: "Single Bed",
        pricePerNight: 80,
        amenities: [1, 11],  // WiFi, A/C
        images: []
    },
    {
        id: 4,
        hotelId: 3,
        roomType: "Family Suite",
        maxGuests: 6,
        bedType: "Bunk Bed",
        pricePerNight: 180,
        amenities: [1, 4, 7],  // WiFi, Fitness, Pet Friendly
        images: []
    },
    {
        id: 5,
        hotelId: 4,
        roomType: "Honeymoon Suite",
        maxGuests: 2,
        bedType: "California King Bed",
        pricePerNight: 300,
        amenities: [1, 6, 9],  // WiFi, Spa, Beach Access
        images: []
    },
    {
        id: 6,
        hotelId: 5,
        roomType: "Accessible Room",
        maxGuests: 2,
        bedType: "Double Bed",
        pricePerNight: 110,
        amenities: [1, 5, 11],  // WiFi, Parking, A/C
        images: []
    },
    {
        id: 7,
        hotelId: 6,
        roomType: "Pod / Capsule Room",
        maxGuests: 1,
        bedType: "Single Bed",
        pricePerNight: 50,
        amenities: [1],  // Just WiFi
        images: []
    },
    {
        id: 8,
        hotelId: 7,
        roomType: "Villa / Bungalow",
        maxGuests: 4,
        bedType: "Super King Bed",
        pricePerNight: 400,
        amenities: [1, 2, 3, 6, 9],  // WiFi, Pool, Restaurant, Spa, Beach
        images: []
    },
    {
        id: 9,
        hotelId: 8,
        roomType: "Presidential Suite",
        maxGuests: 4,
        bedType: "King Bed",
        pricePerNight: 600,
        amenities: [1, 2, 3, 4, 5, 6, 8],  // Almost all amenities
        images: []
    },
    {
        id: 10,
        hotelId: 9,
        roomType: "Cabana Room",
        maxGuests: 2,
        bedType: "Daybed",
        pricePerNight: 220,
        amenities: [1, 2, 9],  // WiFi, Pool, Beach
        images: []
    },
    {
        id: 11,
        hotelId: 10,
        roomType: "Murphy Room",
        maxGuests: 2,
        bedType: "Murphy Bed",
        pricePerNight: 90,
        amenities: [1, 11],  // WiFi, A/C
        images: []
    }
].map(room => ({
    ...room,
    amenities: room.amenities
        ? room.amenities.map(id => {
            const amenity = amenitiesList.find(a => a.id === id);
            return amenity ? { value: amenity.value, icon: amenity.icon } : null;
        }).filter(Boolean)
        : []
}));