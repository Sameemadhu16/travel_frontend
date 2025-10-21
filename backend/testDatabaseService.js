require('dotenv').config();
const databaseService = require('./services/databaseService');

async function testDatabaseService() {
    console.log('🔍 Testing Database Service - SHOW ALL DATA\n');

    try {
        // Test connection
        console.log('1️⃣ Testing database connection...');
        const connected = await databaseService.testConnection();
        if (!connected) {
            console.log('❌ Database connection failed. Exiting...\n');
            return;
        }

        // Test statistics
        console.log('\n2️⃣ Getting database statistics...');
        const stats = await databaseService.getStats();
        console.log('✅ Total counts in database:', stats);

        // Test guides query
        console.log('\n3️⃣ Fetching ALL guides...');
        const guides = await databaseService.getGuides({});
        console.log(`✅ Found ${guides.length} guides`);
        if (guides.length > 0) {
            guides.forEach(guide => {
                console.log(`   - ${guide.name} (${guide.experience} years, $${guide.pricePerDay}/day)`);
            });
        } else {
            console.log('   ⚠️ No guides in database');
        }

        // Test hotels query
        console.log('\n4️⃣ Fetching ALL hotels...');
        const hotels = await databaseService.getHotels({});
        console.log(`✅ Found ${hotels.length} hotels`);
        if (hotels.length > 0) {
            hotels.forEach(hotel => {
                console.log(`   - ${hotel.name} (${hotel.location}, ${hotel.type}, $${hotel.pricePerNight}/night)`);
            });
        } else {
            console.log('   ⚠️ No hotels in database');
        }

        // Test vehicles query
        console.log('\n5️⃣ Fetching ALL vehicles...');
        const vehicles = await databaseService.getVehicles({});
        console.log(`✅ Found ${vehicles.length} vehicles`);
        if (vehicles.length > 0) {
            vehicles.forEach(vehicle => {
                console.log(`   - ${vehicle.name} (${vehicle.type}, ${vehicle.capacity} seats, $${vehicle.pricePerDay}/day)`);
            });
        } else {
            console.log('   ⚠️ No vehicles in database');
        }

        console.log('\n✅ Database service test completed!\n');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        // Close database connection
        process.exit(0);
    }
}

// Run the test
testDatabaseService();
