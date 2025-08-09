export const provinces = [
    { id: 1, value: "Western Province" },
    { id: 2, value: "Central Province" },
    { id: 3, value: "Southern Province" },
    { id: 4, value: "Northern Province" },
    { id: 5, value: "Eastern Province" },
    { id: 6, value: "North Western Province" },
    { id: 7, value: "North Central Province" },
    { id: 8, value: "Sabaragamuwa Province" },
    { id: 9, value: "Uva Province" },
];

export const districts = [
    // Western Province (1)
    { id: 1, value: "Colombo", provinceId: 1 },
    { id: 2, value: "Gampaha", provinceId: 1 },
    { id: 3, value: "Kalutara", provinceId: 1 },

    // Central Province (2)
    { id: 4, value: "Kandy", provinceId: 2 },
    { id: 5, value: "Matale", provinceId: 2 },
    { id: 6, value: "Nuwara Eliya", provinceId: 2 },

    // Southern Province (3)
    { id: 7, value: "Galle", provinceId: 3 },
    { id: 8, value: "Matara", provinceId: 3 },
    { id: 9, value: "Hambantota", provinceId: 3 },

    // Northern Province (4)
    { id: 10, value: "Jaffna", provinceId: 4 },
    { id: 11, value: "Kilinochchi", provinceId: 4 },
    { id: 12, value: "Mannar", provinceId: 4 },
    { id: 13, value: "Mullaitivu", provinceId: 4 },
    { id: 14, value: "Vavuniya", provinceId: 4 },

    // Eastern Province (5)
    { id: 15, value: "Ampara", provinceId: 5 },
    { id: 16, value: "Batticaloa", provinceId: 5 },
    { id: 17, value: "Trincomalee", provinceId: 5 },

    // North Western Province (6)
    { id: 18, value: "Kurunegala", provinceId: 6 },
    { id: 19, value: "Puttalam", provinceId: 6 },

    // North Central Province (7)
    { id: 20, value: "Anuradhapura", provinceId: 7 },
    { id: 21, value: "Polonnaruwa", provinceId: 7 },

    // Sabaragamuwa Province (8)
    { id: 22, value: "Kegalle", provinceId: 8 },
    { id: 23, value: "Ratnapura", provinceId: 8 },

    // Uva Province (9)
    { id: 24, value: "Badulla", provinceId: 9 },
    { id: 25, value: "Monaragala", provinceId: 9 },
];

export const cities = [
    // Colombo District (1)
    { id: 101, value: "Colombo 01", districtId: 1 },
    { id: 102, value: "Colombo 02", districtId: 1 },
    { id: 103, value: "Colombo 03", districtId: 1 },
    { id: 104, value: "Colombo 04", districtId: 1 },
    { id: 105, value: "Colombo 05", districtId: 1 },
    { id: 106, value: "Colombo 06", districtId: 1 },
    { id: 107, value: "Colombo 07", districtId: 1 },
    { id: 108, value: "Colombo 08", districtId: 1 },
    { id: 109, value: "Colombo 09", districtId: 1 },
    { id: 110, value: "Colombo 10", districtId: 1 },
    { id: 111, value: "Colombo 11", districtId: 1 },
    { id: 112, value: "Colombo 12", districtId: 1 },
    { id: 113, value: "Colombo 13", districtId: 1 },
    { id: 114, value: "Colombo 14", districtId: 1 },
    { id: 115, value: "Colombo 15", districtId: 1 },
    { id: 2, value: "Dehiwala", districtId: 1 },
    { id: 3, value: "Moratuwa", districtId: 1 },
    { id: 4, value: "Sri Jayawardenepura Kotte", districtId: 1 },
    { id: 5, value: "Kaduwela", districtId: 1 },
    { id: 6, value: "Kolonnawa", districtId: 1 },

    // Gampaha District (2)
    { id: 7, value: "Gampaha", districtId: 2 },
    { id: 8, value: "Negombo", districtId: 2 },
    { id: 9, value: "Kelaniya", districtId: 2 },
    { id: 10, value: "Wattala", districtId: 2 },
    { id: 11, value: "Ja-Ela", districtId: 2 },

    // Kalutara District (3)
    { id: 12, value: "Kalutara", districtId: 3 },
    { id: 13, value: "Panadura", districtId: 3 },
    { id: 14, value: "Horana", districtId: 3 },
    { id: 15, value: "Beruwala", districtId: 3 },

    // Kandy District (4)
    { id: 16, value: "Kandy", districtId: 4 },
    { id: 17, value: "Peradeniya", districtId: 4 },
    { id: 18, value: "Gampola", districtId: 4 },
    { id: 19, value: "Nawalapitiya", districtId: 4 },

    // Matale District (5)
    { id: 20, value: "Matale", districtId: 5 },
    { id: 21, value: "Dambulla", districtId: 5 },

    // Nuwara Eliya District (6)
    { id: 22, value: "Nuwara Eliya", districtId: 6 },
    { id: 23, value: "Hatton", districtId: 6 },

    // Galle District (7)
    { id: 24, value: "Galle", districtId: 7 },
    { id: 25, value: "Ambalangoda", districtId: 7 },
    { id: 26, value: "Hikkaduwa", districtId: 7 },

    // Matara District (8)
    { id: 27, value: "Matara", districtId: 8 },
    { id: 28, value: "Weligama", districtId: 8 },

    // Hambantota District (9)
    { id: 29, value: "Hambantota", districtId: 9 },
    { id: 30, value: "Tangalle", districtId: 9 },

    // Jaffna District (10)
    { id: 31, value: "Jaffna", districtId: 10 },
    { id: 32, value: "Chavakachcheri", districtId: 10 },

    // Trincomalee District (17)
    { id: 33, value: "Trincomalee", districtId: 17 },
    { id: 34, value: "Kinniya", districtId: 17 },

    // Kurunegala District (18)
    { id: 35, value: "Kurunegala", districtId: 18 },
    { id: 36, value: "Kuliyapitiya", districtId: 18 },

    // Anuradhapura District (20)
    { id: 37, value: "Anuradhapura", districtId: 20 },
    { id: 38, value: "Polonnaruwa", districtId: 21 }, // Note: Polonnaruwa is a district and city

    // Badulla District (24)
    { id: 39, value: "Badulla", districtId: 24 },
    { id: 40, value: "Bandarawela", districtId: 24 },

    // Other notable towns
    { id: 41, value: "Batticaloa", districtId: 16 },
    { id: 42, value: "Mannar", districtId: 12 },
    { id: 43, value: "Ratnapura", districtId: 23 },
    { id: 44, value: "Monaragala", districtId: 25 },
];

export const touristAttractions = [
    // Colombo District Attractions (District ID: 1)
    { id: 1, value: "Gangaramaya Temple", cityId: 101, districtId: 1, type: "Religious" },
    { id: 2, value: "Independence Memorial Hall", cityId: 101, districtId: 1, type: "Historical" },
    { id: 3, value: "National Museum", cityId: 101, districtId: 1, type: "Cultural" },
    { id: 4, value: "Galle Face Green", cityId: 101, districtId: 1, type: "Recreation" },
    { id: 5, value: "Red Mosque", cityId: 101, districtId: 1, type: "Religious" },
    { id: 6, value: "Viharamahadevi Park", cityId: 101, districtId: 1, type: "Recreation" },
    { id: 7, value: "Dutch Hospital Shopping Precinct", cityId: 101, districtId: 1, type: "Shopping" },
    
    // Kandy District Attractions (District ID: 4)
    { id: 8, value: "Temple of the Sacred Tooth Relic", cityId: 16, districtId: 4, type: "Religious" },
    { id: 9, value: "Royal Botanical Gardens", cityId: 17, districtId: 4, type: "Nature" },
    { id: 10, value: "Kandy Lake", cityId: 16, districtId: 4, type: "Nature" },
    { id: 11, value: "Udawattakele Forest Reserve", cityId: 16, districtId: 4, type: "Nature" },
    { id: 12, value: "Bahirawakanda Vihara Buddha Statue", cityId: 16, districtId: 4, type: "Religious" },
    
    // Galle District Attractions (District ID: 7)
    { id: 13, value: "Galle Fort", cityId: 24, districtId: 7, type: "Historical" },
    { id: 14, value: "Galle Lighthouse", cityId: 24, districtId: 7, type: "Historical" },
    { id: 15, value: "Dutch Reformed Church", cityId: 24, districtId: 7, type: "Historical" },
    { id: 16, value: "National Maritime Museum", cityId: 24, districtId: 7, type: "Cultural" },
    { id: 42, value: "Hikkaduwa Beach", cityId: 26, districtId: 7, type: "Beach" },
    { id: 43, value: "Hikkaduwa Coral Sanctuary", cityId: 26, districtId: 7, type: "Nature" },
    { id: 44, value: "Turtle Hatchery", cityId: 26, districtId: 7, type: "Wildlife" },
    
    // Nuwara Eliya District Attractions (District ID: 6)
    { id: 17, value: "Gregory Lake", cityId: 22, districtId: 6, type: "Nature" },
    { id: 18, value: "Hakgala Botanical Garden", cityId: 22, districtId: 6, type: "Nature" },
    { id: 19, value: "Seetha Amman Temple", cityId: 22, districtId: 6, type: "Religious" },
    { id: 20, value: "Tea Factory Visit", cityId: 22, districtId: 6, type: "Cultural" },
    { id: 21, value: "Horton Plains National Park", cityId: 22, districtId: 6, type: "Nature" },
    { id: 22, value: "World's End", cityId: 22, districtId: 6, type: "Nature" },
    
    // Matale District Attractions (District ID: 5)
    { id: 23, value: "Sigiriya Rock Fortress", cityId: 21, districtId: 5, type: "Historical" },
    { id: 24, value: "Dambulla Cave Temple", cityId: 21, districtId: 5, type: "Religious" },
    { id: 25, value: "Pidurangala Rock", cityId: 21, districtId: 5, type: "Adventure" },
    { id: 49, value: "Spice Garden Visit", cityId: 20, districtId: 5, type: "Cultural" },
    
    // Anuradhapura District Attractions (District ID: 20)
    { id: 26, value: "Sri Maha Bodhi", cityId: 37, districtId: 20, type: "Religious" },
    { id: 27, value: "Ruwanwelisaya", cityId: 37, districtId: 20, type: "Religious" },
    { id: 28, value: "Jetavanaramaya", cityId: 37, districtId: 20, type: "Historical" },
    
    // Trincomalee District Attractions (District ID: 17)
    { id: 29, value: "Koneswaram Temple", cityId: 33, districtId: 17, type: "Religious" },
    { id: 30, value: "Nilaveli Beach", cityId: 33, districtId: 17, type: "Beach" },
    { id: 31, value: "Pigeon Island National Park", cityId: 33, districtId: 17, type: "Nature" },
    
    // Badulla District Attractions (District ID: 24)
    { id: 32, value: "Nine Arch Bridge", cityId: 39, districtId: 24, type: "Adventure" },
    { id: 33, value: "Little Adam's Peak", cityId: 39, districtId: 24, type: "Adventure" },
    { id: 34, value: "Ella Rock", cityId: 39, districtId: 24, type: "Adventure" },
    { id: 35, value: "Ravana Falls", cityId: 39, districtId: 24, type: "Nature" },
    
    // Matara District Attractions (District ID: 8)
    { id: 36, value: "Whale Watching", cityId: 28, districtId: 8, type: "Adventure" },
    { id: 37, value: "Mirissa Beach", cityId: 28, districtId: 8, type: "Beach" },
    { id: 38, value: "Snake Island", cityId: 28, districtId: 8, type: "Nature" },
    
    // Gampaha District Attractions (District ID: 2)
    { id: 39, value: "Negombo Beach", cityId: 8, districtId: 2, type: "Beach" },
    { id: 40, value: "Negombo Fish Market", cityId: 8, districtId: 2, type: "Cultural" },
    { id: 41, value: "St. Mary's Church", cityId: 8, districtId: 2, type: "Religious" },
    
    // Hambantota District Attractions (District ID: 9)
    { id: 46, value: "Safari - Yala National Park", cityId: 29, districtId: 9, type: "Wildlife" },
    
    // Ratnapura District Attractions (District ID: 23)
    { id: 47, value: "Safari - Udawalawe National Park", cityId: 43, districtId: 23, type: "Wildlife" },
    { id: 48, value: "White Water Rafting", cityId: 43, districtId: 23, type: "Adventure" },
    
    // Kurunegala District Attractions (District ID: 18)
    { id: 50, value: "Traditional Village Tour", cityId: 35, districtId: 18, type: "Cultural" },
    
    // Polonnaruwa District Attractions (District ID: 21)
    { id: 51, value: "Polonnaruwa Ancient City", cityId: 38, districtId: 21, type: "Historical" },
    { id: 52, value: "Gal Vihara", cityId: 38, districtId: 21, type: "Religious" },
    { id: 53, value: "Parakrama Samudra", cityId: 38, districtId: 21, type: "Nature" },
    
    // Kalutara District Attractions (District ID: 3)
    { id: 54, value: "Kalutara Beach", cityId: 12, districtId: 3, type: "Beach" },
    { id: 55, value: "Kalutara Bodhiya", cityId: 12, districtId: 3, type: "Religious" },
    { id: 56, value: "Brief Garden", cityId: 15, districtId: 3, type: "Nature" },
    
];