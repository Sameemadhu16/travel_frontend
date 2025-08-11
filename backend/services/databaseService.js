const db = require('../config/database');

class DatabaseService {
    
    async fetchGuides(destination) {
        try {
            const query = `
                SELECT 
                g.id,
                u.first_name,  
                g.bio as description,
                g.hours_rate * 8 as price_per_day,  
                g.experience_years,
                g.is_verified,
                g.is_available,
                g.slta_license_id,
                g.slta_license_expiry,
                g.nic_number,
                g.created_at
            FROM guides g
            JOIN users u ON g.user_id = u.id
            WHERE g.is_available = true
                AND g.is_verified = true
                AND (g.slta_license_expiry IS NULL OR g.slta_license_expiry > NOW())
            ORDER BY g.experience_years DESC, g.created_at DESC
            LIMIT 20
            `;

            const result = await db.query(query);
            
            if (result.rows.length === 0) {
                return [];
            }
            
            return result.rows.map(guide => ({
                id: guide.id,
                name: guide.name,
                specialties: this.getGuideSpecialties(guide.experience_years),
                rating: parseFloat(guide.rating) || 4.5,
                price: parseInt(guide.price_per_day) || 15000, // LKR instead of USD
                reviews: parseInt(guide.reviews) || 10,
                verified: guide.is_verified,
                experience: guide.experience_years,
                description: guide.description
            }));
            
        } catch (e) {
            console.error('❌ Database error fetching guides:', e.message);
            return [];
        }
    }

    async fetchHotels(destination) {
        try {
            const query = `
                SELECT 
                    h.id,
                    h.hotel_name,
                    h.city,
                    h.description,
                    h.type
                FROM hotels h
                WHERE h.city ILIKE $1 
            `;
            
            const result = await db.query(query, [`%${destination}%`]);
            
            if (result.rows.length === 0) {
                console.log(`❌ No hotels found in ${destination}`);
                return [];
            }
            
            return result.rows.map(hotel => ({
                id: hotel.id,
                name: hotel.name,
                price: parseInt(hotel.price) || 22500, // LKR instead of USD
                rating: parseFloat(hotel.rating) || 4.3,
                reviews: parseInt(hotel.reviews) || 50,
                location: hotel.city,
                type: hotel.type,
                description: hotel.description
            }));
            
        } catch (e) {
            console.error('❌ Database error fetching hotels:', e.message);
            return [];
        }
    }

    async fetchVehicles(adults, children) {
        try {
            const totalPeople = parseInt(adults) + parseInt(children);
            
            const query = `
                SELECT 
                    v.id,
                    v.vehicle_type as name,
                    v.vehicle_model,
                    v.vehicle_no,
                    v.capacity,
                    v.base_price,
                    v.price_per_kilometer
                FROM vehicles v
                WHERE v.capacity >= $1 
                ORDER BY v.capacity ASC, v.id ASC
                LIMIT 15
            `;
            
            const result = await db.query(query, [totalPeople]);
            
            if (result.rows.length === 0) {
                return [];
            }
            
            return result.rows.map(vehicle => ({
                id: vehicle.id,
                name: `${vehicle.name} ${vehicle.vehicle_model}`.trim(),
                capacity: vehicle.capacity,
                price: parseInt(vehicle.price) || 9000, // LKR instead of USD
                rating: parseFloat(vehicle.rating) || 4.2,
                reviews: parseInt(vehicle.reviews) || 25,
                pricePerKm: parseFloat(vehicle.price_per_kilometer) || 150, // LKR per km
                vehicleNo: vehicle.vehicle_no
            }));
            
        } catch (e) {
            console.error('❌ Database error fetching vehicles:', e.message);
            return [];
        }
    }

    // Helper method to determine guide specialties based on experience
    getGuideSpecialties(experience) {
        if (experience >= 10) return "Expert Cultural & Adventure Tours";
        if (experience >= 5) return "Cultural Tours & Nature Walks";
        if (experience >= 2) return "City Tours & Local Experiences";
        return "Local Area Tours";
    }

    // Test database connection
    async testConnection() {
        try {
            const result = await db.query('SELECT NOW() as current_time');
            console.log("DB Connected");
            return true;
        } catch (error) {
            console.error('❌ Database connection failed:', error.message);
            return false;
        }
    }
}

module.exports = DatabaseService;
