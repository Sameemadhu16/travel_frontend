import React from 'react';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SecondaryButton from './SecondaryButton';
import { navigateTo } from '../core/navigateHelper';

const destinations = [
    {
        id: 1,
        name: 'Kandy',
        desc: 'Ancient capital with sacred temples',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop',
        category: 'Cultural',
        rating: 4.8,
        reviews: 2847,
        location: 'Central Province, Sri Lanka',
        bestTime: 'December - April',
        duration: '2-3 days',
        budget: '$50-80/day',
        temperature: '20-28°C',
        highlights: [
            'Temple of the Sacred Tooth Relic',
            'Royal Botanical Gardens',
            'Kandy Lake',
            'Traditional Cultural Shows',
            'Spice Gardens'
        ],
        activities: [
            { name: 'Temple Visits', icon: '🏛️', duration: '2-3 hours' },
            { name: 'Botanical Gardens Tour', icon: '🌺', duration: '3-4 hours' },
            { name: 'Cultural Dance Show', icon: '💃', duration: '1 hour' },
            { name: 'Lake Walking', icon: '🚶', duration: '1-2 hours' },
            { name: 'Spice Garden Tour', icon: '🌿', duration: '2 hours' }
        ],
        facilities: ['WiFi', 'Parking', 'Restaurants', 'Hotels', 'Transport'],
        gallery: [
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop'
        ],
        description: 'Nestled in the heart of Sri Lanka\'s hill country, Kandy is a UNESCO World Heritage city that serves as the cultural capital of the island. The city is famous for housing the Temple of the Sacred Tooth Relic, one of Buddhism\'s most sacred sites. Surrounded by misty mountains and lush greenery, Kandy offers a perfect blend of ancient traditions and natural beauty. The city comes alive during the annual Esala Perahera festival, featuring elaborate processions with decorated elephants, traditional dancers, and fire performers.',
        tips: [
            'Dress modestly when visiting temples',
            'Best photography light is early morning',
            'Book cultural shows in advance',
            'Try local street food at the central market'
        ]
    },
    {
        id: 2,
        name: 'Galle',
        desc: 'Historic fort and coastal charm',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
        category: 'Historical',
        rating: 4.7,
        reviews: 3124,
        location: 'Southern Province, Sri Lanka',
        bestTime: 'November - April',
        duration: '2-3 days',
        budget: '$40-70/day',
        temperature: '24-30°C',
        highlights: [
            'Galle Fort (UNESCO World Heritage)',
            'Dutch Reformed Church',
            'Galle Lighthouse',
            'National Maritime Museum',
            'Unawatuna Beach'
        ],
        activities: [
            { name: 'Fort Exploration', icon: '🏰', duration: '3-4 hours' },
            { name: 'Beach Activities', icon: '🏖️', duration: 'Full day' },
            { name: 'Lighthouse Visit', icon: '🗼', duration: '1 hour' },
            { name: 'Museum Tour', icon: '🏛️', duration: '2 hours' },
            { name: 'Sunset Watching', icon: '🌅', duration: '1 hour' }
        ],
        facilities: ['WiFi', 'Parking', 'Restaurants', 'Hotels', 'Beach Access'],
        gallery: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop'
        ],
        description: 'Galle is a historic coastal city in southern Sri Lanka, renowned for its well-preserved Dutch colonial architecture and the magnificent Galle Fort. This UNESCO World Heritage site offers a unique glimpse into Sri Lanka\'s colonial past while providing stunning ocean views. The fort\'s ramparts are perfect for sunset strolls, and the cobblestone streets are lined with boutique shops, cafes, and art galleries. The nearby beaches offer excellent opportunities for swimming, snorkeling, and whale watching.',
        tips: [
            'Walk the fort walls during sunset for best views',
            'Explore local boutiques for unique souvenirs',
            'Try fresh seafood at beachside restaurants',
            'Visit during whale watching season (December-April)'
        ]
    },
    {
        id: 3,
        name: 'Sigiriya',
        desc: 'Majestic Lion Rock fortress',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop',
        category: 'Archaeological',
        rating: 4.9,
        reviews: 4567,
        location: 'Central Province, Sri Lanka',
        bestTime: 'May - September',
        duration: '1-2 days',
        budget: '$45-75/day',
        temperature: '22-32°C',
        highlights: [
            'Sigiriya Rock Fortress',
            'Ancient Frescoes',
            'Water Gardens',
            'Lion\'s Paws',
            'Summit Palace Ruins'
        ],
        activities: [
            { name: 'Rock Climbing', icon: '🧗', duration: '3-4 hours' },
            { name: 'Fresco Viewing', icon: '🎨', duration: '1 hour' },
            { name: 'Garden Exploration', icon: '🌳', duration: '2 hours' },
            { name: 'Sunrise Viewing', icon: '🌅', duration: '1 hour' },
            { name: 'Photography', icon: '📸', duration: '2-3 hours' }
        ],
        facilities: ['Parking', 'Restaurants', 'Hotels', 'Guides', 'First Aid'],
        gallery: [
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop'
        ],
        description: 'Sigiriya, often called the "Lion Rock," is an ancient rock fortress and one of Sri Lanka\'s most iconic landmarks. This UNESCO World Heritage site rises dramatically 200 meters above the surrounding jungle, topped by the ruins of a 5th-century palace. The climb to the summit reveals incredible ancient frescoes, innovative water gardens, and breathtaking panoramic views. The site represents one of the best-preserved examples of ancient urban planning and is considered the eighth wonder of the world.',
        tips: [
            'Start early to avoid crowds and heat',
            'Wear comfortable climbing shoes',
            'Bring water and sun protection',
            'Hire a guide for historical insights'
        ]
    },
    {
        id: 4,
        name: 'Ella',
        desc: 'Scenic hills and tea plantations',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
        category: 'Nature',
        rating: 4.8,
        reviews: 2956,
        location: 'Uva Province, Sri Lanka',
        bestTime: 'December - March',
        duration: '2-4 days',
        budget: '$35-60/day',
        temperature: '16-24°C',
        highlights: [
            'Ella Rock Hiking',
            'Nine Arches Bridge',
            'Little Adam\'s Peak',
            'Tea Plantations',
            'Ravana Falls'
        ],
        activities: [
            { name: 'Hiking', icon: '🥾', duration: '4-6 hours' },
            { name: 'Tea Factory Tour', icon: '🍃', duration: '2 hours' },
            { name: 'Train Ride', icon: '🚂', duration: '3 hours' },
            { name: 'Waterfall Visit', icon: '💧', duration: '1-2 hours' },
            { name: 'Photography', icon: '📸', duration: '2-3 hours' }
        ],
        facilities: ['WiFi', 'Restaurants', 'Hotels', 'Transport', 'Guides'],
        gallery: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop'
        ],
        description: 'Ella is a charming hill station nestled in Sri Lanka\'s central highlands, famous for its stunning mountain vistas, emerald tea plantations, and cool climate. This backpacker haven offers some of the country\'s best hiking trails, including the popular Ella Rock and Little Adam\'s Peak. The iconic Nine Arches Bridge is a marvel of colonial-era engineering, while the surrounding tea estates provide insight into Sri Lanka\'s tea culture. The town\'s laid-back atmosphere and breathtaking scenery make it a perfect retreat from the tropical heat.',
        tips: [
            'Book train tickets in advance for scenic route',
            'Early morning hikes offer best weather',
            'Try fresh Ceylon tea at local plantations',
            'Bring warm clothes for cool evenings'
        ]
    },
    {
        id: 5,
        name: 'Nuwara Eliya',
        desc: 'Cool climate and beautiful landscapes',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop',
        category: 'Hill Station',
        rating: 4.6,
        reviews: 2341,
        location: 'Central Province, Sri Lanka',
        bestTime: 'April - June',
        duration: '2-3 days',
        budget: '$40-70/day',
        temperature: '14-20°C',
        highlights: [
            'Horton Plains National Park',
            'Victoria Park',
            'Tea Plantations',
            'Lake Gregory',
            'Hakgala Botanical Gardens'
        ],
        activities: [
            { name: 'World\'s End Hike', icon: '🏔️', duration: '4-5 hours' },
            { name: 'Boat Ride', icon: '🚤', duration: '1 hour' },
            { name: 'Garden Visit', icon: '🌺', duration: '2 hours' },
            { name: 'Tea Tasting', icon: '🍵', duration: '1-2 hours' },
            { name: 'Golf Playing', icon: '⛳', duration: '4 hours' }
        ],
        facilities: ['WiFi', 'Parking', 'Restaurants', 'Hotels', 'Golf Course'],
        gallery: [
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop'
        ],
        description: 'Known as "Little England," Nuwara Eliya is Sri Lanka\'s premier hill station, sitting at 1,868 meters above sea level. The town maintains its colonial charm with Tudor-style architecture, manicured gardens, and a cool climate year-round. Surrounded by rolling hills covered in tea plantations, it\'s the heart of Sri Lanka\'s tea industry. The nearby Horton Plains National Park offers the famous World\'s End viewpoint, while the town itself provides a refreshing escape with its golf course, boating lake, and beautiful botanical gardens.',
        tips: [
            'Pack warm clothes for cool weather',
            'Visit World\'s End early morning for clear views',
            'Try fresh strawberries and cream',
            'Book accommodations in advance during peak season'
        ]
    },
    {
        id: 6,
        name: 'Mirissa',
        desc: 'Pristine beaches and whale watching',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop',
        category: 'Beach',
        rating: 4.7,
        reviews: 3789,
        location: 'Southern Province, Sri Lanka',
        bestTime: 'November - April',
        duration: '2-4 days',
        budget: '$30-60/day',
        temperature: '26-32°C',
        highlights: [
            'Whale Watching',
            'Mirissa Beach',
            'Coconut Tree Hill',
            'Parrot Rock',
            'Snorkeling & Diving'
        ],
        activities: [
            { name: 'Whale Watching', icon: '🐋', duration: '4-5 hours' },
            { name: 'Beach Relaxation', icon: '🏖️', duration: 'Full day' },
            { name: 'Snorkeling', icon: '🤿', duration: '2-3 hours' },
            { name: 'Surfing', icon: '🏄', duration: '2-4 hours' },
            { name: 'Sunset Viewing', icon: '🌅', duration: '1 hour' }
        ],
        facilities: ['WiFi', 'Restaurants', 'Hotels', 'Beach Access', 'Water Sports'],
        gallery: [
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop'
        ],
        description: 'Mirissa is a tropical paradise on Sri Lanka\'s southern coast, famous for its pristine golden beaches and world-class whale watching opportunities. This crescent-shaped bay offers perfect conditions for swimming, surfing, and relaxation. The town has evolved from a quiet fishing village into a popular beach destination while maintaining its laid-back charm. Blue whales, sperm whales, and dolphins can be spotted year-round, making it one of the best whale watching destinations in the world.',
        tips: [
            'Book whale watching tours early morning',
            'Best surfing conditions from November to April',
            'Try fresh seafood at beachside restaurants',
            'Coconut Tree Hill offers best sunset views'
        ]
    },
    {
        id: 7,
        name: 'Anuradhapura',
        desc: 'Ancient ruins and Buddhist heritage',
        image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=300&fit=crop',
        category: 'Archaeological',
        rating: 4.8,
        reviews: 1987,
        location: 'North Central Province, Sri Lanka',
        bestTime: 'May - September',
        duration: '2-3 days',
        budget: '$35-55/day',
        temperature: '24-34°C',
        highlights: [
            'Ruwanwelisaya Dagoba',
            'Jetavanarama',
            'Sri Maha Bodhi Tree',
            'Abhayagiri Monastery',
            'Thuparamaya'
        ],
        activities: [
            { name: 'Temple Tours', icon: '🏛️', duration: '4-6 hours' },
            { name: 'Cycling', icon: '🚴', duration: '3-4 hours' },
            { name: 'Meditation', icon: '🧘', duration: '1-2 hours' },
            { name: 'Archaeological Tour', icon: '🏺', duration: '5-6 hours' },
            { name: 'Pilgrimage', icon: '🙏', duration: 'Full day' }
        ],
        facilities: ['Parking', 'Restaurants', 'Hotels', 'Guides', 'Bicycle Rental'],
        gallery: [
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop'
        ],
        description: 'Anuradhapura is Sri Lanka\'s ancient capital and one of the oldest continuously inhabited cities in the world. This UNESCO World Heritage site served as the island\'s political and religious center for over 1,300 years. The city is home to magnificent dagobas (stupas), ancient monasteries, and the sacred Sri Maha Bodhi tree, believed to be the oldest documented tree in the world. The vast archaeological site offers a fascinating glimpse into ancient Sinhalese civilization and remains an important pilgrimage destination for Buddhists worldwide.',
        tips: [
            'Start early to avoid heat and crowds',
            'Rent bicycles for easier site exploration',
            'Dress appropriately for religious sites',
            'Bring sun protection and plenty of water'
        ]
    }
];

export default function RecommendedDestinations() {
    const scrollContainer = React.useRef(null);

    const scrollLeft = () => {
        scrollContainer.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainer.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className="bg-gray-50">
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-semibold text-gray-800">Recommended Destinations</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={scrollLeft}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
                        >
                            <FaChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={scrollRight}
                            className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:bg-gray-50"
                        >
                            <FaChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div
                        ref={scrollContainer}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitScrollbar: { display: 'none' }
                        }}
                    >
                        {destinations.map((d, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-lg min-w-[280px] max-w-[280px] 
                                    overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer group"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={d.image}
                                        alt={d.name}
                                        className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-[24px] font-semibold mb-2 text-gray-800 
                                        group-hover:text-orange-500 transition-colors">
                                        {d.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-6 line-clamp-2">{d.desc}</p>
                                    <div className="mt-auto">
                                        <SecondaryButton text='Explore' onClick={() => navigateTo(`/destination/${d.id}`)}/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}