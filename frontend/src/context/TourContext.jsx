import React, { createContext, useContext, useState, useEffect } from 'react';

const TourContext = createContext();

// Custom hook to use tour context
export const useTourContext = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTourContext must be used within a TourProvider');
  }
  return context;
};

// Initial state values
const initialTravelDetails = {
  destination: '',
  duration: '',
  travelStyle: '',
  groupType: '',
  startDate: '',
  location: '',
  time: '',
  adults: 1,
  children: 0
};

const initialItinerary = [
  { day: 1, activities: [{ title: '', time: '', description: '' }] }
];

const initialTourPreferences = {
  interests: [],
  accommodation: '',
  travelStyle: '',
  budgetRange: '',
  activityLevel: '',
  diningPreference: ''
};

const initialContactInfo = {
    fullName: '',
    email: '',
    phone: '',
    country: '',
    nicNumber: '',
    optionalContact: '',
    specialRequests: '',
    ageGroup: '',
    occupation: '',
    travelExperience: '',
    referralSource: ''
};

const initialSelectedItems = {
  guides: [],
  hotels: [],
  rooms: [],
  vehicles: [],
  selectedVehicle: null
};

const initialBookingSummary = {
  totalCost: 0,
  guidesCost: 0,
  hotelsCost: 0,
  vehiclesCost: 0,
  serviceFee: 0,
  taxes: 0
};

export const TourProvider = ({ children }) => {
  // Travel Details State
  const [travelDetails, setTravelDetails] = useState(initialTravelDetails);
  const [itinerary, setItinerary] = useState(initialItinerary);
  
  // Tour Preferences State
  const [tourPreferences, setTourPreferences] = useState(initialTourPreferences);
  
  // Contact Information State
  const [contactInfo, setContactInfo] = useState(initialContactInfo);
  
  // Selected Items State
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  
  // Booking Summary State
  const [bookingSummary, setBookingSummary] = useState(initialBookingSummary);
  
  // Form Validation State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // UI State
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Travel Details Actions
  const updateTravelDetails = (updates) => {
    setTravelDetails(prev => ({ ...prev, ...updates }));
  };

  const updateItinerary = (newItinerary) => {
    setItinerary(newItinerary);
  };

  const addItineraryDay = () => {
    const newDay = {
      day: itinerary.length + 1,
      activities: [{ title: '', time: '', description: '' }]
    };
    setItinerary(prev => [...prev, newDay]);
  };

  const removeItineraryDay = (dayIndex) => {
    if (itinerary.length > 1) {
      setItinerary(prev => 
        prev.filter((_, index) => index !== dayIndex)
            .map((day, index) => ({ ...day, day: index + 1 }))
      );
    }
  };

  const addItineraryActivity = (dayIndex) => {
    const newActivity = { title: '', time: '', description: '' };
    setItinerary(prev => 
      prev.map((day, index) => 
        index === dayIndex 
          ? { ...day, activities: [...day.activities, newActivity] }
          : day
      )
    );
  };

  const removeItineraryActivity = (dayIndex, activityIndex) => {
    setItinerary(prev =>
      prev.map((day, dIndex) =>
        dIndex === dayIndex && day.activities.length > 1
          ? {
              ...day,
              activities: day.activities.filter((_, aIndex) => aIndex !== activityIndex)
            }
          : day
      )
    );
  };

  const updateItineraryActivity = (dayIndex, activityIndex, field, value) => {
    setItinerary(prev =>
      prev.map((day, dIndex) =>
        dIndex === dayIndex
          ? {
              ...day,
              activities: day.activities.map((activity, aIndex) =>
                aIndex === activityIndex
                  ? { ...activity, [field]: value }
                  : activity
              )
            }
          : day
      )
    );
  };

  // Tour Preferences Actions
  const updateTourPreferences = (updates) => {
    setTourPreferences(prev => ({ ...prev, ...updates }));
  };

  const updateInterests = (interest) => {
    const currentInterests = tourPreferences.interests;
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(item => item !== interest)
      : [...currentInterests, interest];
    
    setTourPreferences(prev => ({ ...prev, interests: newInterests }));
  };

  // Contact Information Actions
  const updateContactInfo = (updates) => {
    setContactInfo(prev => ({ ...prev, ...updates }));
  };

  // Selected Items Actions
  const addSelectedGuide = (guide) => {
    setSelectedItems(prev => ({
      ...prev,
      guides: [...prev.guides, guide]
    }));
  };

  const removeSelectedGuide = (guideId) => {
    setSelectedItems(prev => ({
      ...prev,
      guides: prev.guides.filter(guide => guide.id !== guideId)
    }));
  };

  const addSelectedHotel = (hotel) => {
    setSelectedItems(prev => ({
      ...prev,
      hotels: [...prev.hotels, hotel]
    }));
  };

  const removeSelectedHotel = (hotelId) => {
    setSelectedItems(prev => ({
      ...prev,
      hotels: prev.hotels.filter(hotel => hotel.id !== hotelId)
    }));
  };

  const addSelectedRoom = (room) => {
    setSelectedItems(prev => ({
      ...prev,
      rooms: [...prev.rooms, room]
    }));
  };

  const removeSelectedRoom = (roomId) => {
    setSelectedItems(prev => ({
      ...prev,
      rooms: prev.rooms.filter(room => room.id !== roomId)
    }));
  };

  const setSelectedVehicle = (vehicle) => {
    setSelectedItems(prev => ({
      ...prev,
      selectedVehicle: vehicle
    }));
  };

  const addSelectedVehicle = (vehicle) => {
    setSelectedItems(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, vehicle]
    }));
  };

  const removeSelectedVehicle = (vehicleId) => {
    setSelectedItems(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(vehicle => vehicle.id !== vehicleId)
    }));
  };

  // Booking Summary Actions
  const updateBookingSummary = (updates) => {
    setBookingSummary(prev => ({ ...prev, ...updates }));
  };

  const calculateTotalCost = () => {
    // Extract duration in days for calculations
    const duration = travelDetails.duration ? 
      parseInt(travelDetails.duration.match(/(\d+)/)?.[1] || '1') : 1;
    
    // Calculate guides cost (per day * duration)
    const guidesCost = selectedItems.guides.reduce((total, guide) => {
      const dailyRate = guide.price || guide.pricePerDay || 0;
      return total + (dailyRate * duration);
    }, 0);
    
    // Calculate hotels cost (per night * number of nights)
    // Assuming duration - 1 nights (e.g., 3 days = 2 nights)
    const nights = Math.max(duration - 1, 1);
    const hotelsCost = selectedItems.hotels.reduce((total, hotel) => {
      const nightlyRate = hotel.pricePerNight || hotel.price || 0;
      return total + (nightlyRate * nights);
    }, 0);
    
    // Calculate rooms cost (per night * number of nights)
    const roomsCost = selectedItems.rooms.reduce((total, room) => {
      const nightlyRate = room.pricePerNight || room.price || 0;
      return total + (nightlyRate * nights);
    }, 0);
    
    // Calculate vehicles cost (per day * duration)
    const vehiclesCost = selectedItems.vehicles.reduce((total, vehicle) => {
      const dailyRate = vehicle.pricePerDay || vehicle.price || 0;
      return total + (dailyRate * duration);
    }, 0);
    
    // Calculate selected vehicle cost (per day * duration)
    const selectedVehicleCost = selectedItems.selectedVehicle ? 
      (selectedItems.selectedVehicle.pricePerDay || selectedItems.selectedVehicle.price || 0) * duration : 0;
    
    const subtotal = guidesCost + hotelsCost + roomsCost + vehiclesCost + selectedVehicleCost;
    const serviceFee = Math.round(subtotal * 0.05); // 5% service fee
    const taxes = Math.round(subtotal * 0.08); // 8% taxes
    const totalCost = subtotal + serviceFee + taxes;

    setBookingSummary({
      guidesCost,
      hotelsCost: hotelsCost + roomsCost,
      vehiclesCost: vehiclesCost + selectedVehicleCost,
      serviceFee,
      taxes,
      totalCost,
      duration,
      nights
    });
  };

  // Auto-calculate costs when selections change
  useEffect(() => {
    calculateTotalCost();
  }, [selectedItems, travelDetails.duration]);

  // Validation Actions
  const setFieldError = (field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const clearFieldError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const setFieldTouched = (field, touched = true) => {
    setTouched(prev => ({ ...prev, [field]: touched }));
  };

  const clearAllErrors = () => {
    setErrors({});
    setTouched({});
  };

  // Validation helpers
  const validateTravelDetails = () => {
    const newErrors = {};
    
    if (!travelDetails.destination) newErrors.destination = 'Please select a destination package';
    if (!travelDetails.duration) newErrors.duration = 'Please select trip duration';
    if (!travelDetails.travelStyle) newErrors.travelStyle = 'Please select your preferred travel style';
    if (!travelDetails.startDate) newErrors.startDate = 'Start date is required';
    if (!travelDetails.location) newErrors.location = 'Pickup location is required';
    if (!travelDetails.time) newErrors.time = 'Pickup time is required';
    if (!travelDetails.adults || travelDetails.adults < 1) newErrors.adults = 'At least 1 adult is required';

    // Validate start date is not in the past
    if (travelDetails.startDate) {
      const selectedDate = new Date(travelDetails.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.startDate = 'Start date cannot be in the past';
      }
    }

    // Validate itinerary
    let hasItineraryError = false;
    for (let dayIndex = 0; dayIndex < itinerary.length; dayIndex++) {
      const day = itinerary[dayIndex];
      for (let activityIndex = 0; activityIndex < day.activities.length; activityIndex++) {
        const activity = day.activities[activityIndex];
        if (!activity.title.trim() || !activity.time || !activity.description.trim()) {
          hasItineraryError = true;
          break;
        }
      }
      if (hasItineraryError) break;
    }
    
    if (hasItineraryError) newErrors.itinerary = 'Please complete all itinerary activities';

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateTourPreferences = () => {
    const newErrors = {};
    
    if (tourPreferences.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }
    if (!tourPreferences.accommodation) {
      newErrors.accommodation = 'Please select an accommodation preference';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateContactInfo = () => {
    const newErrors = {};
    
    if (!contactInfo.fullName || !contactInfo.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!contactInfo.email || !contactInfo.email.trim()) newErrors.email = 'Email is required';
    if (!contactInfo.phone || !contactInfo.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!contactInfo.country) newErrors.country = 'Please select your country';
    if (!contactInfo.nicNumber || !contactInfo.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (contactInfo.email && !emailRegex.test(contactInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-()]{10,15}$/;
    if (contactInfo.phone && !phoneRegex.test(contactInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // NIC validation (Sri Lankan format)
    const nicRegex = /^(\d{9}[vVxX]|\d{12})$/;
    if (contactInfo.nicNumber && !nicRegex.test(contactInfo.nicNumber.replace(/\s/g, ''))) {
      newErrors.nicNumber = 'Please enter a valid NIC number (e.g., 123456789V or 199812345678)';
    }

    // Optional contact validation
    if (contactInfo.optionalContact && !phoneRegex.test(contactInfo.optionalContact.replace(/\s/g, ''))) {
      newErrors.optionalContact = 'Please enter a valid phone number';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const validateGuideSelection = () => {
    const newErrors = {};
    
    if (!selectedItems.guides || selectedItems.guides.length === 0) {
      newErrors.guideSelection = 'Please select at least one guide';
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation
  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  // Reset functions
  const resetTour = () => {
    setTravelDetails(initialTravelDetails);
    setItinerary(initialItinerary);
    setTourPreferences(initialTourPreferences);
    setContactInfo(initialContactInfo);
    setSelectedItems(initialSelectedItems);
    setBookingSummary(initialBookingSummary);
    setErrors({});
    setTouched({});
    setCurrentStep(1);
    setAgreedToTerms(false);
  };

  const resetToStep = (step) => {
    if (step <= 1) {
      setTravelDetails(initialTravelDetails);
      setItinerary(initialItinerary);
    }
    if (step <= 2) {
      setTourPreferences(initialTourPreferences);
    }
    if (step <= 3) {
      setContactInfo(initialContactInfo);
    }
    if (step <= 4) {
      setSelectedItems(prev => ({ ...prev, guides: [] }));
    }
    if (step <= 5) {
      setSelectedItems(prev => ({ ...prev, hotels: [], rooms: [] }));
    }
    if (step <= 6) {
      setSelectedItems(prev => ({ ...prev, vehicles: [], selectedVehicle: null }));
    }
    
    setCurrentStep(step);
    clearAllErrors();
  };

  // Local storage persistence
  useEffect(() => {
    const savedTourData = localStorage.getItem('tourData');
    if (savedTourData) {
      try {
        const parsed = JSON.parse(savedTourData);
        if (parsed.travelDetails) setTravelDetails(parsed.travelDetails);
        if (parsed.itinerary) setItinerary(parsed.itinerary);
        if (parsed.tourPreferences) setTourPreferences(parsed.tourPreferences);
        if (parsed.contactInfo) setContactInfo(parsed.contactInfo);
        if (parsed.selectedItems) setSelectedItems(parsed.selectedItems);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.agreedToTerms) setAgreedToTerms(parsed.agreedToTerms);
      } catch (error) {
        console.error('Error loading saved tour data:', error);
      }
    }
  }, []);

  // Save to local storage whenever state changes
  useEffect(() => {
    const tourData = {
      travelDetails,
      itinerary,
      tourPreferences,
      contactInfo,
      selectedItems,
      currentStep,
      agreedToTerms
    };
    localStorage.setItem('tourData', JSON.stringify(tourData));
  }, [travelDetails, itinerary, tourPreferences, contactInfo, selectedItems, currentStep, agreedToTerms]);

  // Calculate costs whenever selected items change
  useEffect(() => {
    calculateTotalCost();
  }, [selectedItems]);

  const contextValue = {
    // State
    travelDetails,
    itinerary,
    tourPreferences,
    contactInfo,
    selectedItems,
    bookingSummary,
    errors,
    touched,
    currentStep,
    isLoading,
    agreedToTerms,

    // Travel Details Actions
    updateTravelDetails,
    updateItinerary,
    addItineraryDay,
    removeItineraryDay,
    addItineraryActivity,
    removeItineraryActivity,
    updateItineraryActivity,

    // Tour Preferences Actions
    updateTourPreferences,
    updateInterests,

    // Contact Information Actions
    updateContactInfo,

    // Selected Items Actions
    addSelectedGuide,
    removeSelectedGuide,
    addSelectedHotel,
    removeSelectedHotel,
    addSelectedRoom,
    removeSelectedRoom,
    setSelectedVehicle,
    addSelectedVehicle,
    removeSelectedVehicle,

    // Booking Summary Actions
    updateBookingSummary,
    calculateTotalCost,

    // Validation Actions
    setFieldError,
    clearFieldError,
    setFieldTouched,
    clearAllErrors,
    validateTravelDetails,
    validateTourPreferences,
    validateContactInfo,
    validateGuideSelection,

    // UI Actions
    setIsLoading,
    setAgreedToTerms,

    // Step Navigation
    nextStep,
    prevStep,
    goToStep,

    // Reset Functions
    resetTour,
    resetToStep,

    // Computed Properties
    isStepValid: (step) => {
      switch (step) {
        case 1:
          return validateTravelDetails();
        case 2:
          return validateTourPreferences();
        case 3:
          return validateContactInfo();
        case 4:
          return validateGuideSelection();
        case 5:
          return true; // Hotels/rooms are now optional
        case 6:
          return true; // Vehicles are now optional
        default:
          return true;
      }
    },

    isTourComplete: () => {
      return validateTravelDetails() &&
             validateTourPreferences() &&
             validateContactInfo() &&
             validateGuideSelection();
      // Note: Hotels/rooms and vehicles are now optional
    },

    // Render-safe version that doesn't trigger state updates
    isTourCompleteCheck: () => {
      // Basic checks without calling validation functions that update state
      const hasTravelDetails = travelDetails.destination && travelDetails.duration && 
                              travelDetails.travelStyle && travelDetails.startDate && 
                              travelDetails.location && travelDetails.time && 
                              travelDetails.adults >= 1;
      
      const hasItinerary = itinerary.length > 0 && 
                          itinerary.every(day => 
                            day.activities.length > 0 && 
                            day.activities.every(activity => 
                              activity.title.trim() && activity.time && activity.description.trim()
                            )
                          );
      
      const hasPreferences = tourPreferences.interests.length > 0 && 
                            tourPreferences.accommodation;
      
      const hasContactInfo = contactInfo.fullName && contactInfo.fullName.trim() && 
                            contactInfo.email && contactInfo.email.trim() && 
                            contactInfo.phone && contactInfo.phone.trim() &&
                            contactInfo.country && contactInfo.nicNumber && 
                            contactInfo.nicNumber.trim();
      
      const hasGuides = selectedItems.guides.length > 0; // Required
      // Hotels/rooms and vehicles are now optional
      
      return hasTravelDetails && hasItinerary && hasPreferences && 
             hasContactInfo && hasGuides;
    }
  };

  return (
    <TourContext.Provider value={contextValue}>
      {children}
    </TourContext.Provider>
  );
};

export default TourContext;
