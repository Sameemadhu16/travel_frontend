const db = require('../config/database');

class DatabaseService {
    /**
     * Get ALL guides from the database (no filters for verification)
     */
    async getGuides(filters = {}) {
        try {
            let query = `
                SELECT 
                    g.id,
                    COALESCE(u.first_name || ' ' || u.last_name, 'Guide') as name,
                    g.experience_years as experience,
                    COALESCE(
                        (SELECT STRING_AGG(gl.language, ', ') 
                         FROM guid_languages gl 
                         WHERE gl.guid_id = g.id), 
                        'English'
                    ) as languages,
                    COALESCE(
                        (SELECT STRING_AGG(gs.specialization, ', ') 
                         FROM guid_specializations gs 
                         WHERE gs.guid_id = g.id), 
                        'General'
                    ) as specialization,
                    4.5 as rating,
                    COALESCE(g.hours_rate, 25) as "pricePerDay",
                    COALESCE(g.is_available, false) as availability,
                    g.bio,
                    COALESCE(u.email, '') as email,
                    COALESCE(
                        (SELECT pp.profile_picture 
                         FROM profile_pictures pp 
                         WHERE pp.user_id = g.user_id 
                         LIMIT 1), 
                        '/images/guides/default.jpg'
                    ) as image
                FROM guides g
                LEFT JOIN users u ON g.user_id = u.id
                WHERE 1=1
            `;
            
            const params = [];
            let paramCount = 1;

            // Filter by specialization if provided
            if (filters.specialization && filters.specialization.length > 0) {
                query += ` AND EXISTS (
                    SELECT 1 FROM guid_specializations gs 
                    WHERE gs.guid_id = g.id AND (`;
                const specializationConditions = filters.specialization.map((spec) => {
                    params.push(`%${spec}%`);
                    return `gs.specialization ILIKE $${paramCount++}`;
                });
                query += specializationConditions.join(' OR ') + '))';
            }

            // Filter by max price if provided
            if (filters.maxPrice) {
                params.push(filters.maxPrice);
                query += ` AND COALESCE(g.hours_rate, 25) <= $${paramCount++}`;
            }

            query += ` ORDER BY g.experience_years DESC, COALESCE(g.hours_rate, 25) ASC LIMIT 20`;

            const result = await db.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching guides:', error.message);
            return [];
        }
    }

    /**
     * Get ALL hotels from the database (no filters for verification)
     */
    async getHotels(filters = {}) {
        try {
            let query = `
                SELECT 
                    h.id,
                    h.hotel_name as name,
                    COALESCE(h.city || ', ' || h.district, h.city, 'Unknown Location') as location,
                    CASE 
                        WHEN h.type = '1' THEN 'Budget'
                        WHEN h.type = '2' THEN 'Mid-range'
                        WHEN h.type = '3' THEN 'Luxury'
                        ELSE 'Standard'
                    END as type,
                    4.3 as rating,
                    COALESCE(h.price_per_night, 80.00) as "pricePerNight",
                    COALESCE(
                        (SELECT STRING_AGG(ha.amenity, ', ') 
                         FROM hotel_amenities ha 
                         WHERE ha.hotel_id = h.id), 
                        'WiFi, Parking'
                    ) as amenities,
                    COALESCE(h.description, 'Comfortable hotel accommodation') as description,
                    COALESCE(u.email, '') as email,
                    COALESCE(
                        (SELECT hi.image_url 
                         FROM hotel_images hi 
                         WHERE hi.hotel_id = h.id 
                         LIMIT 1), 
                        '/images/hotels/default.jpg'
                    ) as image,
                    COALESCE(
                        (SELECT COUNT(*) FROM rooms r WHERE r.hotel_id = h.id), 
                        5
                    ) as "availableRooms"
                FROM hotels h
                LEFT JOIN users u ON h.user_id = u.id
                WHERE 1=1
            `;
            
            const params = [];
            let paramCount = 1;

            // Filter by location if provided
            if (filters.location) {
                params.push(`%${filters.location}%`);
                query += ` AND (h.city ILIKE $${paramCount} OR h.district ILIKE $${paramCount} OR h.province ILIKE $${paramCount})`;
                paramCount++;
            }

            // Filter by max price if provided
            if (filters.maxPrice) {
                params.push(filters.maxPrice);
                query += ` AND COALESCE(h.price_per_night, 80) <= $${paramCount++}`;
            }

            query += ` ORDER BY h.hotel_name ASC LIMIT 20`;

            const result = await db.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching hotels:', error.message);
            return [];
        }
    }

    /**
     * Get ALL vehicles from the database (no filters for verification)
     */
    async getVehicles(filters = {}) {
        try {
            let query = `
                SELECT 
                    v.id,
                    COALESCE(v.vehicle_model || ' - ' || v.vehicle_no, 'Vehicle') as name,
                    CASE 
                        WHEN v.vehicle_type = '1' THEN 'Car'
                        WHEN v.vehicle_type = '2' THEN 'Van'
                        WHEN v.vehicle_type = '3' THEN 'Bus'
                        WHEN v.vehicle_type = '4' THEN 'SUV'
                        ELSE 'Vehicle'
                    END as type,
                    COALESCE(v.capacity, 4) as capacity,
                    COALESCE(v.base_price, 50.00) as "pricePerDay",
                    'Diesel' as "fuelType",
                    COALESCE(
                        (SELECT STRING_AGG(va.amenity, ', ') 
                         FROM vehicle_amenities va 
                         WHERE va.vehicle_id = v.id), 
                        'AC, GPS'
                    ) as features,
                    COALESCE(v.availability, true) as availability,
                    true as "driverIncluded",
                    COALESCE(
                        (SELECT vi.image_url 
                         FROM vehicle_images vi 
                         WHERE vi.vehicle_id = v.id 
                         LIMIT 1), 
                        '/images/vehicles/default.jpg'
                    ) as image,
                    'Comfortable and reliable vehicle for your journey' as description
                FROM vehicles v
                WHERE 1=1
            `;
            
            const params = [];
            let paramCount = 1;

            // Filter by minimum capacity if provided
            if (filters.minCapacity) {
                params.push(filters.minCapacity);
                query += ` AND COALESCE(v.capacity, 4) >= $${paramCount++}`;
            }

            // Filter by max price if provided
            if (filters.maxPrice) {
                params.push(filters.maxPrice);
                query += ` AND COALESCE(v.base_price, 50) <= $${paramCount++}`;
            }

            query += ` ORDER BY COALESCE(v.capacity, 4) DESC, COALESCE(v.base_price, 50) ASC LIMIT 20`;

            const result = await db.query(query, params);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching vehicles:', error.message);
            return [];
        }
    }

    /**
     * Test database connection
     */
    async testConnection() {
        try {
            const result = await db.query('SELECT NOW()');
            console.log('Database connected successfully');
            return true;
        } catch (error) {
            console.error('Database connection failed:', error.message);
            return false;
        }
    }

    /**
     * Get database statistics (ALL data, no verification filter)
     */
    async getStats() {
        try {
            const guides = await db.query('SELECT COUNT(*) FROM guides');
            const hotels = await db.query('SELECT COUNT(*) FROM hotels');
            const vehicles = await db.query('SELECT COUNT(*) FROM vehicles');

            return {
                guides: parseInt(guides.rows[0].count),
                hotels: parseInt(hotels.rows[0].count),
                vehicles: parseInt(vehicles.rows[0].count)
            };
        } catch (error) {
            console.error('Error getting database stats:', error.message);
            return { guides: 0, hotels: 0, vehicles: 0 };
        }
    }
}

module.exports = new DatabaseService();
