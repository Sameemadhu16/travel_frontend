import shan from '../../assets/hotels/shan.jpg'
import amaya from '../../assets/hotels/amaya.avif'
import galleFort from '../../assets/hotels/galle.jpeg'
import jetwingYala from '../../assets/hotels/jetwing.jpg'
import acres98 from '../../assets/hotels/9 arches.jpg'
import araliyaGreen from '../../assets/hotels/araliya.jpg'
import trincoBlu from '../../assets/hotels/trinco.jpg'
import anantaya from '../../assets/hotels/anataya.jpg'
import cinnamonRed from '../../assets/hotels/cinnomon-red.jpg'
import mandara from '../../assets/hotels/mandara.jpg'

export const hotelImages = [
    shan, amaya, galleFort, jetwingYala, acres98,
    araliyaGreen, trincoBlu, anantaya, cinnamonRed, mandara
];

// Helper to get random images for each hotel
function getRandomImages(imagesArr, count = 5) {
    const shuffled = [...imagesArr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export const hotelList = [
    {
        id: 1,
        name: "Shangri-La Colombo",
        location: "Colombo",
        rating: 4.8,
        pricePerNight: 12490,
        images: getRandomImages(hotelImages),
        amenities: [
            "Free Wi-Fi",
            "Pool",
            "Spa",
            "Gym",
            "Restaurant",
            "Parking"
        ],
        type: "Luxury",
        leftRooms: 3,
        reviews: 321,
        about:
            "**Luxurious Accommodations:** Shangri-La Colombo offers premium suites and rooms with panoramic city and ocean views, marble bathrooms, and modern amenities. " +
            "Each room features air-conditioning, minibar, and 24-hour room service. " +
            "**World-Class Facilities:** Guests enjoy multiple dining options, infinity pool, award-winning spa, and fully equipped fitness center. " +
            "The property features concierge services, business center, and valet parking. " +
            "**Prime Location:** Located in the heart of Colombo's business district, 45 minutes from Bandaranaike International Airport. " +
            "Walking distance to shopping malls, cultural sites, and Galle Face Green promenade. " +
            "**Guest Satisfaction:** Renowned for exceptional service, fine dining experiences, and breathtaking views, ensuring an unforgettable luxury stay in Sri Lanka's commercial capital."
    },
    {
        id: 2,
        name: "Amaya Hills",
        location: "Kandy",
        rating: 4.5,
        pricePerNight: 5490,
        images: getRandomImages(hotelImages),
        amenities: [
            "Free Wi-Fi",
            "Pool",
            "Mountain View",
            "Parking"
        ],
        type: "Resort",
        leftRooms: 5,
        reviews: 210,
        about:
            "**Serene Mountain Retreat:** Amaya Hills features spacious rooms with private balconies overlooking misty mountains, air-conditioning, and traditional Sri Lankan décor. " +
            "Each room includes modern amenities, tea/coffee facilities, and scenic views. " +
            "**Natural Paradise:** Guests enjoy an outdoor pool surrounded by lush gardens, multiple restaurants serving local and international cuisine, and guided nature walks. " +
            "The property offers spa services and cultural experiences. " +
            "**Cultural Gateway:** Located 10 minutes from Kandy city center, close to Temple of the Tooth, Royal Botanical Gardens, and Kandy Lake. " +
            "Easy access to tea plantations and cultural sites. " +
            "**Guest Satisfaction:** Highly praised for its tranquil setting, friendly staff, and authentic Sri Lankan hospitality, providing a perfect blend of comfort and cultural immersion."
    },
    {
        id: 3,
        name: "Galle Fort Hotel",
        location: "Galle",
        rating: 4.6,
        pricePerNight: 11000,
        images: getRandomImages(hotelImages),
        amenities: [
            "Free Wi-Fi",
            "Historic Building",
            "Restaurant"
        ],
        type: "Boutique",
        leftRooms: 2,
        reviews: 98,
        about:
            "**Historic Elegance:** Galle Fort Hotel is a beautifully restored 17th-century mansion within the UNESCO World Heritage Galle Fort, featuring antique furnishings, high ceilings, and period architecture. " +
            "Each room combines colonial charm with modern comforts. " +
            "**Cultural Heritage:** Guests experience authentic Dutch colonial ambiance with original artwork, antique furniture, and historical artifacts. " +
            "The property offers guided fort walks and cultural tours. " +
            "**Unique Location:** Situated within the iconic Galle Fort walls, steps away from museums, galleries, and boutique shops. " +
            "Close to lighthouse, ramparts, and stunning ocean views. " +
            "**Guest Satisfaction:** Celebrated for its historical significance, intimate atmosphere, and personalized service, offering a truly unique heritage experience in Sri Lanka's most famous fort city."
    },
    {
        id: 4,
        name: "Jetwing Yala",
        location: "Yala National Park",
        rating: 4.7,
        pricePerNight: 12400,
        images: getRandomImages(hotelImages),
        amenities: [
            "Beach Access",
            "Safari Packages",
            "Pool",
            "Restaurant"
        ],
        type: "Eco-Resort",
        leftRooms: 4,
        reviews: 156,
        about:
            "**Wildlife Adventure:** Jetwing Yala offers eco-friendly accommodations with direct access to Yala National Park, featuring spacious rooms with private terraces and natural ventilation. " +
            "Each room includes modern amenities while maintaining environmental harmony. " +
            "**Safari Excellence:** Guests enjoy exclusive safari packages, professional naturalist guides, and prime wildlife viewing opportunities. " +
            "The property features an infinity pool, organic restaurant, and beach access to pristine coastline. " +
            "**Pristine Location:** Located at the edge of Yala National Park with private beach access, offering the perfect combination of wildlife safari and coastal relaxation. " +
            "Close to ancient Buddhist temples and archaeological sites. " +
            "**Guest Satisfaction:** Renowned for exceptional wildlife experiences, sustainable practices, and knowledgeable guides, providing unforgettable encounters with Sri Lanka's diverse fauna including leopards and elephants."
    },
    {
        id: 5,
        name: "98 Acres Resort & Spa",
        location: "Ella",
        rating: 4.9,
        pricePerNight: 5790,
        images: getRandomImages(hotelImages),
        amenities: [
            "Free Wi-Fi",
            "Spa",
            "Nature View",
            "Restaurant"
        ],
        type: "Resort",
        leftRooms: 5,
        reviews: 187,
        about:
            "**Mountain Paradise:** 98 Acres Resort & Spa offers luxury chalets and villas with panoramic views of Ella Gap, featuring private balconies, modern amenities, and traditional architecture. " +
            "Each accommodation includes air-conditioning, minibar, and tea plantation views. " +
            "**Wellness Sanctuary:** Guests enjoy a world-class spa, infinity pool overlooking mountains, and multiple dining venues serving organic cuisine. " +
            "The property offers yoga sessions, guided hikes, and cultural experiences. " +
            "**Scenic Location:** Perched on a mountainside overlooking Ella's famous landmarks including Nine Arch Bridge, Little Adam's Peak, and tea plantations. " +
            "Easy access to hiking trails and scenic viewpoints. " +
            "**Guest Satisfaction:** Consistently rated as one of Sri Lanka's best resorts for its breathtaking views, exceptional service, and romantic atmosphere, perfect for couples and nature lovers seeking tranquility."
    },
    {
        id: 6,
        name: "Araliya Green Hills Hotel",
        location: "Nuwara Eliya",
        rating: 4.3,
        pricePerNight: 7850,
        images: getRandomImages(hotelImages),
        amenities: [
            "Heated Pool",
            "Restaurant",
            "Garden",
            "Free Wi-Fi"
        ],
        type: "Hotel",
        leftRooms: 6,
        reviews: 142,
        about:
            "**Hill Country Comfort:** Araliya Green Hills Hotel features cozy rooms with fireplaces, mountain views, and colonial-style décor. " +
            "Each room includes heating, modern amenities, and panoramic windows overlooking manicured gardens and mountains. " +
            "**Cool Climate Retreat:** Guests enjoy a heated outdoor pool, multiple restaurants serving international and local cuisine, and extensive gardens. " +
            "The property offers indoor games, spa services, and evening entertainment. " +
            "**Central Location:** Located in the heart of Nuwara Eliya, walking distance to Gregory Lake, golf course, and Victorian-era buildings. " +
            "Close to tea factories, strawberry farms, and hiking trails. " +
            "**Guest Satisfaction:** Popular for its comfortable accommodations in cool climate, family-friendly facilities, and convenient location, providing a perfect base to explore Sri Lanka's hill country and tea plantation region."
    },
    {
        id: 7,
        name: "Trinco Blu by Cinnamon",
        location: "Trincomalee",
        rating: 4.4,
        pricePerNight: 6000,
        images: getRandomImages(hotelImages),
        amenities: [
            "Beach Access",
            "Free Wi-Fi",
            "Diving",
            "Restaurant"
        ],
        type: "Resort",
        leftRooms: 5,
        reviews: 120,
        about:
            "**Beachfront Paradise:** Trinco Blu offers modern rooms and suites with direct beach access, featuring contemporary design, private balconies, and ocean views. " +
            "Each room includes air-conditioning, modern amenities, and tropical décor. " +
            "**Marine Adventures:** Guests enjoy water sports, diving excursions, and whale watching tours. " +
            "The property features multiple restaurants, beach bar, swimming pool, and recreational facilities. " +
            "**Coastal Location:** Situated on Trincomalee's pristine coastline with access to some of Sri Lanka's best beaches and diving spots. " +
            "Close to Koneswaram Temple, Fort Frederick, and natural harbor. " +
            "**Guest Satisfaction:** Highly rated for its beachfront location, water sports facilities, and relaxed atmosphere, offering the perfect tropical getaway with excellent opportunities for marine adventures and cultural exploration."
    },
    {
        id: 8,
        name: "Anantaya Resort & Spa",
        location: "Chilaw",
        rating: 4.2,
        pricePerNight: 34000,
        images: getRandomImages(hotelImages),
        amenities: [
            "Pool",
            "Spa",
            "Free Wi-Fi",
            "Lake View"
        ],
        type: "Luxury",
        leftRooms: 3,
        reviews: 77,
        about:
            "**Lakeside Luxury:** Anantaya Resort & Spa features elegant villas and suites overlooking Chilaw Lagoon, with private pools, spacious living areas, and contemporary design. " +
            "Each accommodation includes premium amenities, butler service, and lagoon views. " +
            "**Wellness Haven:** Guests enjoy award-winning spa treatments, multiple dining venues, and recreational activities. " +
            "The property offers yoga pavilion, water sports, and cultural excursions to nearby fishing villages. " +
            "**Serene Location:** Located on the shores of Chilaw Lagoon, 1.5 hours from Colombo, offering privacy and tranquility. " +
            "Close to Munneswaram Temple, local fishing communities, and mangrove ecosystems. " +
            "**Guest Satisfaction:** Renowned for its intimate luxury experience, personalized service, and unique lagoon setting, providing an exclusive retreat away from crowds with authentic Sri Lankan hospitality and natural beauty."
    },
    {
        id: 9,
        name: "Cinnamon Red",
        location: "Colombo",
        rating: 4.1,
        pricePerNight: 2900,
        images: getRandomImages(hotelImages),
        amenities: [
            "Rooftop Pool",
            "Restaurant",
            "Free Wi-Fi",
            "City View"
        ],
        type: "Hotel",
        leftRooms: 6,
        reviews: 201,
        about:
            "**Urban Comfort:** Cinnamon Red offers modern, compact rooms with city views, contemporary design, and smart space utilization. " +
            "Each room features air-conditioning, modern amenities, and vibrant décor reflecting Colombo's energy. " +
            "**City Convenience:** Guests enjoy rooftop pool with city skyline views, multiple dining options, and 24-hour facilities. " +
            "The property features fitness center, business facilities, and easy access to shopping and entertainment. " +
            "**Prime Location:** Located in the heart of Colombo, walking distance to major shopping centers, restaurants, and business districts. " +
            "Close to Beira Lake, Independence Square, and cultural attractions. " +
            "**Guest Satisfaction:** Popular for its modern design, excellent value for money, and central location, providing comfortable urban accommodation with easy access to Colombo's attractions and business centers."
    },
    {
        id: 10,
        name: "Mandara Resort",
        location: "Mirissa",
        rating: 4.0,
        pricePerNight: 13790,
        images: getRandomImages(hotelImages),
        amenities: [
            "Beach Access",
            "Pool",
            "Free Wi-Fi",
            "Restaurant"
        ],
        type: "Beach Resort",
        leftRooms: 2,
        reviews: 65,
        about:
            "**Tropical Beach Haven:** Mandara Resort features beachfront accommodations with direct access to Mirissa's golden sand beach, offering rooms and suites with ocean views, tropical gardens, and traditional Sri Lankan architecture. " +
            "Each room includes modern amenities and private terraces. " +
            "**Coastal Activities:** Guests enjoy swimming pool, beachfront restaurant, and easy access to whale watching tours, surfing, and snorkeling. " +
            "The property offers bicycle rentals and cultural excursions to nearby temples. " +
            "**Beach Location:** Situated on Mirissa Beach, one of Sri Lanka's most beautiful coastal destinations, famous for whale watching and stunning sunsets. " +
            "Close to coconut tree hill, parrot rock, and local fishing villages. " +
            "**Guest Satisfaction:** Appreciated for its beachfront location, relaxed atmosphere, and proximity to marine activities, providing an authentic tropical beach experience with opportunities for wildlife encounters and coastal adventures."
    }
];