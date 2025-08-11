const db = require('../config/database');

class DatabaseService {
    
    async fetchGuides(destination) {
        try {
            const query = `
                SELECT 
                g.id,
                u.first_name as name,  
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

            console.log('🔍 Executing guides query...');
            const result = await db.query(query);
            console.log(`📊 Database returned ${result.rows.length} guides`);
            
            if (result.rows.length === 0) {
                console.log('⚠️ No guides found in database');
                return [];
            }
            
            const mappedGuides = result.rows.map(guide => ({
                id: guide.id.toString(),
                name: guide.name,
                specialties: this.getGuideSpecialties(guide.experience_years),
                rating: 4.5, // Fixed rating for now
                price: parseInt(guide.price_per_day) || 15000,
                reviews: 10, // Fixed reviews for now
                verified: guide.is_verified,
                experience: guide.experience_years,
                description: guide.description
            }));

            console.log('✅ Mapped guides:', mappedGuides.length);
            return mappedGuides;
            
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
                    h.hotel_name as name,
                    h.city,
                    h.description,
                    h.type
                FROM hotels h
                WHERE h.city ILIKE $1 
                LIMIT 20
            `;
            
            console.log('🔍 Executing hotels query for:', destination);
            const result = await db.query(query, [`%${destination}%`]);
            console.log(`📊 Database returned ${result.rows.length} hotels`);
            
            if (result.rows.length === 0) {
                console.log(`⚠️ No hotels found in ${destination}`);
                return [];
            }
            
            const mappedHotels = result.rows.map(hotel => ({
                id: hotel.id.toString(),
                name: hotel.name,
                price: 22500, // Fixed price for now
                rating: 4.3, // Fixed rating for now
                reviews: 50, // Fixed reviews for now
                location: hotel.city,
                type: hotel.type,
                description: hotel.description
            }));

            console.log('✅ Mapped hotels:', mappedHotels.length);
            return mappedHotels;
            
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
            
            console.log('🔍 Executing vehicles query for capacity:', totalPeople);
            const result = await db.query(query, [totalPeople]);
            console.log(`📊 Database returned ${result.rows.length} vehicles`);
            
            if (result.rows.length === 0) {
                console.log(`⚠️ No vehicles found for ${totalPeople} people`);
                return [];
            }
            
            const mappedVehicles = result.rows.map(vehicle => ({
                id: vehicle.id.toString(),
                name: `${vehicle.name} ${vehicle.vehicle_model}`.trim(),
                capacity: vehicle.capacity,
                price: parseInt(vehicle.base_price) || 9000,
                rating: 4.2, // Fixed rating for now
                reviews: 25, // Fixed reviews for now
                pricePerKm: parseFloat(vehicle.price_per_kilometer) || 150,
                vehicleNo: vehicle.vehicle_no
            }));

            console.log('✅ Mapped vehicles:', mappedVehicles.length);
            return mappedVehicles;
            
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
