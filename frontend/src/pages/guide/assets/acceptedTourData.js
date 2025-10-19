import user1 from '../../../assets/users/user1.jpg'
import user2 from '../../../assets/users/user5.jpg'
import user3 from '../../../assets/vehicles/axio.jpg'
import user4 from '../../../assets/users/user4.jpg'

export const tours = [
    {
        customer: {
            user_id: 1,
            name: "Ruvini Perera",
            image: user1,
            joined: "Feb 2024"
        },
        tour: {
            tour_id: 1,
            destination: "Sigiriya & Dambulla",
            date: 'Dec 15–17, 2025',
            groupSize: '4',
            duration: '3',
        },
        payment: {
            payment_id: 1,
            dailyRate: '5,000',
            totalAmount: '15,000',
            status: "Pending Payment",
            deadline: "6 days left",
            due: "Dec 10, 2025",
            accepted: "Dec 02, 2025"
        },
        accommodation: [
            {
                hotelName: "Heritance Kandalama",
                roomType: "Deluxe Double Room",
                nights: 2,
                dates: "Dec 15–17, 2025",
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
            name: "Sanjaya Bandara",
            image: user2,
            joined: "May 2023"
        },
        tour: {
            tour_id: 2,
            destination: "Kandy Cultural Tour",
            date: 'Jan 5–7, 2026',
            groupSize: '2',
            duration: '3',
        },
        payment: {
            payment_id: 2,
            dailyRate: '5,000',
            totalAmount: '15,000',
            status: "Pending Payment",
            deadline: "10 days left",
            due: "Dec 28, 2025",
            accepted: "Nov 30, 2025"
        },
        accommodation: [
            {
                hotelName: "Hotel Suisse Kandy",
                roomType: "Superior Room",
                nights: 2,
                dates: "Jan 5–7, 2026",
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
            name: "Nadeesha Silva",
            image: user3,
            joined: "Nov 2022"
        },
        tour: {
            tour_id: 3,
            destination: "Galle Fort & Southern Beaches",
            date: 'Feb 10–12, 2026',
            groupSize: '5',
            duration: '3',
        },
        payment: {
            payment_id: 3,
            dailyRate: '5,000',
            totalAmount: '15,000',
            status: "Pending Payment",
            deadline: "8 days left",
            due: "Feb 5, 2026",
            accepted: "Dec 20, 2025"
        },
        accommodation: [
            {
                hotelName: "Jetwing Lighthouse",
                roomType: "Family Suite",
                nights: 2,
                dates: "Feb 10–12, 2026",
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
            name: "Chaminda Fernando",
            image: user4,
            joined: "Aug 2023"
        },
        tour: {
            tour_id: 4,
            destination: "Ella & Tea Country",
            date: 'Mar 8–11, 2026',
            groupSize: '3',
            duration: '4',
        },
        payment: {
            payment_id: 4,
            dailyRate: '5,000',
            totalAmount: '20,000',
            status: "Pending Payment",
            deadline: "12 days left",
            due: "Mar 1, 2026",
            accepted: "Dec 5, 2025"
        },
        accommodation: [
            {
                hotelName: "98 Acres Resort",
                roomType: "Luxury Chalet",
                nights: 3,
                dates: "Mar 8–11, 2026",
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
            { day: 2, title: "Little Adam’s Peak", description: "Morning hike, evening leisure" },
            { day: 3, title: "Nine Arches Bridge", description: "Photo stop at Nine Arches Bridge, tea factory visit" },
            { day: 4, title: "Departure", description: "Scenic drive back to Colombo" }
        ]
    }
];
