import user1 from '../../../assets/users/user1.jpg'
import user2 from '../../../assets/users/user5.jpg'
import user3 from '../../../assets/vehicles/axio.jpg'
import user4 from '../../../assets/users/user4.jpg'

export const tours = [
    {
        customer: {
            user_id: 1,
            name: "Ishara Jayawardena",
            image: user1,
            joined: "Feb 2024"
        },
        tour: {
            tour_id: 1,
            destination: "Anuradhapura Heritage Tour",
            date: 'Dec 20–22, 2025',
            groupSize: '6',
            duration: '3',
        },
        payment: {
            payment_id: 1,
            dailyRate: '6,000',
            totalAmount: '18,000',
            status: "Pending Payment",
            deadline: "5 days left",
            due: "Dec 15, 2025",
        },
        accommodation: [
            {
                hotelName: "Heritance Kandalama",
                roomType: "Deluxe Double Room",
                nights: 2,
                dates: "Dec 20–22, 2025",
                price: "28,000"
            }
        ],
        transport: {
            type: "Private Van",
            details: "Air-conditioned, driver included",
            price: "18,000"
        },
        itinerary: [
            { day: 1, title: "Arrival & Dambulla", description: "Pick up, visit Dambulla Cave Temple, hotel check-in" },
            { day: 2, title: "Sigiriya Rock Fortress", description: "Climb Sigiriya, explore gardens and frescoes" },
            { day: 3, title: "Village Safari & Departure", description: "Cultural village safari, return to Colombo" }
        ]
    },
    {
        customer: {
            user_id: 2,
            name: "Malith De Silva",
            image: user2,
            joined: "May 2023"
        },
        tour: {
            tour_id: 2,
            destination: "Nuwara Eliya & Horton Plains",
            date: 'Jan 12–14, 2026',
            groupSize: '4',
            duration: '3',
        },
        payment: {
            payment_id: 2,
            dailyRate: '7,000',
            totalAmount: '21,000',
            status: "Pending Payment",
            deadline: "9 days left",
            due: "Jan 3, 2026",
        },
        accommodation: [
            {
                hotelName: "Hotel Suisse Kandy",
                roomType: "Superior Room",
                nights: 2,
                dates: "Jan 12–14, 2026",
                price: "22,000"
            }
        ],
        transport: {
            type: "Car with Driver",
            details: "Toyota Prius, fuel included",
            price: "12,000"
        },
        itinerary: [
            { day: 1, title: "Colombo to Kandy", description: "Visit Pinnawala Elephant Orphanage, check-in at hotel" },
            { day: 2, title: "Kandy City Tour", description: "Temple of the Tooth Relic, Royal Botanical Gardens" },
            { day: 3, title: "Return Journey", description: "Cultural show, shopping, return to Colombo" }
        ]
    },
    {
        customer: {
            user_id: 3,
            name: "Dilini Wijesinghe",
            image: user3,
            joined: "Nov 2022"
        },
        tour: {
            tour_id: 3,
            destination: "Trincomalee Beach Getaway",
            date: 'Feb 18–20, 2026',
            groupSize: '2',
            duration: '3',
        },
        payment: {
            payment_id: 3,
            dailyRate: '8,000',
            totalAmount: '24,000',
            status: "Pending Payment",
            deadline: "7 days left",
            due: "Feb 11, 2026",
        },
        accommodation: [
            {
                hotelName: "Jetwing Lighthouse",
                roomType: "Family Suite",
                nights: 2,
                dates: "Feb 18–20, 2026",
                price: "40,000"
            }
        ],
        transport: {
            type: "Mini Bus",
            details: "Air-conditioned, suitable for groups",
            price: "20,000"
        },
        itinerary: [
            { day: 1, title: "Colombo to Galle", description: "En route visit Bentota beach, check-in at hotel" },
            { day: 2, title: "Explore Galle Fort", description: "Walking tour inside Galle Fort, sunset by the ramparts" },
            { day: 3, title: "Unawatuna & Departure", description: "Morning at Unawatuna Beach, return to Colombo" }
        ]
    },
    {
        customer: {
            user_id: 4,
            name: "Kasun Rathnayake",
            image: user4,
            joined: "Aug 2023"
        },
        tour: {
            tour_id: 4,
            destination: "Yala Safari Adventure",
            date: 'Mar 5–8, 2026',
            groupSize: '5',
            duration: '4',
        },
        payment: {
            payment_id: 4,
            dailyRate: '9,000',
            totalAmount: '27,000',
            status: "Pending Payment",
            deadline: "10 days left",
            due: "Feb 24, 2026",
        },
        accommodation: [
            {
                hotelName: "98 Acres Resort",
                roomType: "Luxury Chalet",
                nights: 3,
                dates: "Mar 5–4, 2026",
                price: "55,000"
            }
        ],
        transport: {
            type: "SUV",
            details: "4x4 suitable for hill country travel",
            price: "25,000"
        },
        itinerary: [
            { day: 1, title: "Colombo to Ella", description: "Train ride from Kandy to Ella, hotel check-in" },
            { day: 2, title: "Little Adam's Peak", description: "Morning hike, evening leisure" },
            { day: 3, title: "Nine Arches Bridge", description: "Photo stop at Nine Arches Bridge, tea factory visit" },
            { day: 4, title: "Departure", description: "Scenic drive back to Colombo" }
        ]
    }
];