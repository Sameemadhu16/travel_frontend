# TourContext Documentation

## Overview

The `TourContext` is a comprehensive React context that manages the entire state of a tour booking application using `useState`. It provides centralized state management for all tour-related data, including travel details, preferences, contact information, selected items, and booking summaries.

## Features

- **Complete State Management**: Manages all tour booking data in one place
- **Form Validation**: Built-in validation for all forms with error handling
- **Step Navigation**: Tracks current step and provides navigation functions
- **Local Storage Persistence**: Automatically saves and restores tour data
- **Real-time Cost Calculation**: Automatically calculates costs when items are selected
- **Reset Functionality**: Multiple reset options for different scenarios

## Installation & Setup

### 1. Wrap your application with TourProvider

```jsx
// App.jsx or main application file
import React from 'react';
import { TourProvider } from './context/TourContext';
import YourComponents from './components/YourComponents';

function App() {
  return (
    <TourProvider>
      <YourComponents />
    </TourProvider>
  );
}

export default App;
```

### 2. Use the context in your components

```jsx
// Any component that needs tour data
import React from 'react';
import { useTourContext } from '../context/TourContext';

const YourComponent = () => {
  const { travelDetails, updateTravelDetails, errors } = useTourContext();
  
  // Your component logic here
  return (
    // Your JSX here
  );
};
```

## State Structure

### Travel Details
```javascript
{
  destination: '',        // Selected destination
  duration: '',          // Trip duration (e.g., "3-days")
  startDate: '',         // Trip start date
  location: '',          // Pickup location
  time: '',             // Pickup time
  adults: 2,            // Number of adults
  children: 0           // Number of children
}
```

### Itinerary
```javascript
[
  {
    day: 1,
    activities: [
      {
        title: '',          // Activity title
        time: '',          // Activity time
        description: ''    // Activity description
      }
    ]
  }
]
```

### Tour Preferences
```javascript
{
  interests: [],         // Array of selected interests
  accommodation: '',     // Accommodation preference
  travelStyle: '',      // Travel style preference
  budgetRange: ''       // Budget range
}
```

### Contact Information
```javascript
{
  firstName: '',         // Contact first name
  lastName: '',         // Contact last name
  email: '',            // Contact email
  phoneNumber: '',      // Contact phone
  emergencyContact: '', // Emergency contact
  specialRequirements: '' // Special requirements
}
```

### Selected Items
```javascript
{
  guides: [],           // Array of selected guides
  hotels: [],          // Array of selected hotels
  rooms: [],           // Array of selected rooms
  vehicles: [],        // Array of selected vehicles
  selectedVehicle: null // Currently selected vehicle
}
```

### Booking Summary
```javascript
{
  totalCost: 0,         // Total cost
  guidesCost: 0,        // Cost of guides
  hotelsCost: 0,        // Cost of hotels/rooms
  vehiclesCost: 0,      // Cost of vehicles
  serviceFee: 0,        // Service fee (5%)
  taxes: 0              // Taxes (8%)
}
```

## Available Functions

### Travel Details Functions

```jsx
const {
  // Update travel details
  updateTravelDetails,
  
  // Itinerary management
  updateItinerary,
  addItineraryDay,
  removeItineraryDay,
  addItineraryActivity,
  removeItineraryActivity,
  updateItineraryActivity
} = useTourContext();

// Examples
updateTravelDetails({ destination: 'colombo', adults: 3 });
addItineraryDay();
updateItineraryActivity(0, 0, 'title', 'Visit Temple');
```

### Tour Preferences Functions

```jsx
const {
  updateTourPreferences,
  updateInterests
} = useTourContext();

// Examples
updateTourPreferences({ accommodation: 'luxury' });
updateInterests('Cultural Sites'); // Toggles interest
```

### Contact Information Functions

```jsx
const {
  updateContactInfo
} = useTourContext();

// Example
updateContactInfo({ 
  firstName: 'John', 
  lastName: 'Doe', 
  email: 'john@example.com' 
});
```

### Selected Items Functions

```jsx
const {
  addSelectedGuide,
  removeSelectedGuide,
  addSelectedHotel,
  removeSelectedHotel,
  addSelectedRoom,
  removeSelectedRoom,
  setSelectedVehicle,
  addSelectedVehicle,
  removeSelectedVehicle
} = useTourContext();

// Examples
addSelectedGuide({ id: 1, name: 'John Guide', price: 5000 });
removeSelectedGuide(1);
setSelectedVehicle({ id: 1, name: 'Toyota Car', price: 8000 });
```

### Validation Functions

```jsx
const {
  validateTravelDetails,
  validateTourPreferences,
  validateContactInfo,
  setFieldError,
  clearFieldError,
  setFieldTouched,
  clearAllErrors
} = useTourContext();

// Examples
const isValid = validateTravelDetails(); // Returns boolean
setFieldError('email', 'Email is required');
clearFieldError('email');
setFieldTouched('destination', true);
```

### Step Navigation Functions

```jsx
const {
  currentStep,
  nextStep,
  prevStep,
  goToStep,
  isStepValid,
  isTourComplete
} = useTourContext();

// Examples
nextStep();
prevStep();
goToStep(3);
const stepValid = isStepValid(1);
const tourReady = isTourComplete();
```

### Reset Functions

```jsx
const {
  resetTour,
  resetToStep
} = useTourContext();

// Examples
resetTour(); // Reset everything
resetToStep(2); // Reset from step 2 onwards
```

## Complete Usage Example

```jsx
import React from 'react';
import { useTourContext } from '../context/TourContext';

const TravelDetailsForm = () => {
  const {
    // State
    travelDetails,
    errors,
    touched,
    
    // Actions
    updateTravelDetails,
    setFieldTouched,
    validateTravelDetails,
    nextStep
  } = useTourContext();

  const handleInputChange = (field, value) => {
    updateTravelDetails({ [field]: value });
    
    // Mark field as touched
    if (!touched[field]) {
      setFieldTouched(field, true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateTravelDetails()) {
      nextStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Destination *
        </label>
        <select
          value={travelDetails.destination}
          onChange={(e) => handleInputChange('destination', e.target.value)}
          className={`w-full border rounded px-3 py-2 ${
            errors.destination ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select Destination</option>
          <option value="colombo">Colombo</option>
          <option value="kandy">Kandy</option>
          <option value="galle">Galle</option>
        </select>
        {errors.destination && (
          <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Adults *</label>
          <input
            type="number"
            min="1"
            value={travelDetails.adults}
            onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Children</label>
          <input
            type="number"
            min="0"
            value={travelDetails.children}
            onChange={(e) => handleInputChange('children', parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Next Step
      </button>
    </form>
  );
};

export default TravelDetailsForm;
```

## Advanced Features

### Custom Validation

You can add custom validation by using the validation functions:

```jsx
const CustomForm = () => {
  const { setFieldError, clearFieldError } = useTourContext();
  
  const customValidation = (field, value) => {
    if (field === 'customField' && value.length < 5) {
      setFieldError(field, 'Must be at least 5 characters');
      return false;
    }
    clearFieldError(field);
    return true;
  };
};
```

### Conditional Rendering Based on Step

```jsx
const TourWizard = () => {
  const { currentStep } = useTourContext();
  
  return (
    <div>
      {currentStep === 1 && <TravelDetailsForm />}
      {currentStep === 2 && <TourPreferencesForm />}
      {currentStep === 3 && <ContactInfoForm />}
      {currentStep === 4 && <GuideSelection />}
      {currentStep === 5 && <HotelSelection />}
      {currentStep === 6 && <VehicleSelection />}
      {currentStep === 7 && <BookingSummary />}
    </div>
  );
};
```

### Real-time Cost Updates

The context automatically calculates costs when items are selected:

```jsx
const CostDisplay = () => {
  const { bookingSummary, selectedItems } = useTourContext();
  
  // Costs are automatically updated when selectedItems change
  return (
    <div>
      <p>Guides: LKR {bookingSummary.guidesCost.toLocaleString()}</p>
      <p>Hotels: LKR {bookingSummary.hotelsCost.toLocaleString()}</p>
      <p>Total: LKR {bookingSummary.totalCost.toLocaleString()}</p>
    </div>
  );
};
```

## Best Practices

1. **Always validate before navigation**: Use validation functions before moving to next steps
2. **Handle loading states**: Use `isLoading` state for async operations
3. **Provide user feedback**: Use error messages and validation states
4. **Save frequently**: The context auto-saves to localStorage, but you can also manually save
5. **Reset appropriately**: Use `resetToStep` instead of full reset when possible

## Error Handling

The context provides comprehensive error handling:

```jsx
const { errors, touched, setFieldError } = useTourContext();

// Check if field has error and was touched
const showError = errors.fieldName && touched.fieldName;

// Set custom errors
setFieldError('customField', 'Custom error message');
```

This context provides a complete state management solution for your tour booking application with built-in validation, persistence, and cost calculation features.
