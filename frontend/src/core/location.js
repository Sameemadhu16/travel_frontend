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
    { id: 1, value: "Colombo", districtId: 1 },
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