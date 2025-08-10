import { createContext } from "react";

const INITIAL_STRING = '';
const INITIAL_NUMBER = 0;

const initialTripFormData = {
    formData: {
        travelDetails: {
            destination: INITIAL_STRING,
            duration: INITIAL_STRING,
            travelStyle: INITIAL_STRING,
            groupType: INITIAL_STRING,
            startDate: INITIAL_STRING,
            location: INITIAL_STRING,
            time: INITIAL_STRING,
            adults: 1,
            children: 0
        },
        itinerary: [
            { 
                day: 1, 
                activities: [{ 
                    title: INITIAL_STRING, 
                    time: INITIAL_STRING, 
                    description: INITIAL_STRING,
                    districtId: INITIAL_STRING,
                    attractionId: INITIAL_STRING,
                    customActivity: INITIAL_STRING
                }] 
            }
        ],
        tourPreferences: {
            interests: [],
            accommodation: INITIAL_STRING,
            travelStyle: INITIAL_STRING,
            budgetRange: INITIAL_STRING,
            activityLevel: INITIAL_STRING,
            diningPreference: INITIAL_STRING
        },
        contactInfo: {
            fullName: INITIAL_STRING,
            email: INITIAL_STRING,
            phone: INITIAL_STRING,
            country: INITIAL_STRING,
            isLocal: true, // Default to local visitor
            nicNumber: INITIAL_STRING,
            passportNumber: INITIAL_STRING,
            passportExpiry: INITIAL_STRING,
            optionalContact: INITIAL_STRING,
            specialRequests: INITIAL_STRING,
            ageGroup: INITIAL_STRING,
            occupation: INITIAL_STRING,
            travelExperience: INITIAL_STRING,
            referralSource: INITIAL_STRING
        },
        selectedItems: {
            guides: [],
            hotels: [], // Legacy - for compatibility
            rooms: [], // Legacy - for compatibility
            vehicles: [],
            selectedVehicle: null,
            nightHotels: [], // Array to store hotel selections for each night
            nightRooms: [] // Array to store room selections for each night (matches nightHotels index)
        },
        bookingSummary: {
            totalCost: INITIAL_NUMBER,
            guidesCost: INITIAL_NUMBER,
            hotelsCost: INITIAL_NUMBER,
            vehiclesCost: INITIAL_NUMBER,
            serviceFee: INITIAL_NUMBER,
            taxes: INITIAL_NUMBER
        },
        errors: {},
        touched: {},
        currentStep: 1,
        isLoading: false,
        agreedToTerms: false
    },
    setFormData: () => {}
};

const registerPartnerAccountForm = {
    formData: {
        email: INITIAL_STRING,
        firstName: INITIAL_STRING,
        lastName: INITIAL_STRING,
        phoneNumber: INITIAL_STRING,
    },
    setFormData: () => {},
}

const loginPartnerAccountForm = {
    formData: {
        email: INITIAL_STRING,
        password: INITIAL_STRING,
    },
    setFormData: () => {},
}

const FormContext = createContext();

export default FormContext;
export { registerPartnerAccountForm, loginPartnerAccountForm, initialTripFormData };