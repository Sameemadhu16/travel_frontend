import { useContext, useMemo, useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CustomSelector from '../../../components/CustomSelector'
import Main from '../../../components/Main'
import Title from '../../../components/Title'
import { amenities, hotelFilterOptions, mealOptions, priceRanges, propertyTypes } from '../../../core/constant'
import { hotelList } from '../../../core/Lists/hotels'
import { districts, provinces } from '../../../core/Lists/location'
import HotelCard from '../components/HotelCard'
import CheckboxGroup from '../components/CheckboxGroup'
import Breadcrumb from '../../../components/Breadcrumb'
import FormContext from '../../../context/InitialValues'

const breadcrumbItems = [
    { label: "Home", path: "/home" },
    { label: "Hotels", path: "/hotels-search" },
];

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const isTourSelectHotel = location.pathname === '/tour/select-hotel';
    const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [currentNightIndex, setCurrentNightIndex] = useState(0);
    const { formData, setFormData } = useContext(FormContext);
    const { travelDetails, itinerary, selectedItems } = formData;

    // Get number of nights from duration
    const getNightsFromDuration = (duration) => {
        if (!duration) return 0;
        if (duration === '1-day') return 0;
        const match = duration.match(/(\d+)-days/);
        return match ? parseInt(match[1]) - 1 : 0;
    };

    const numberOfNights = getNightsFromDuration(travelDetails.duration);

    // Debug logging for formData and selections
    useEffect(() => {
        console.log('=== HOTEL SELECTION DEBUG ===');
        console.log('Full formData:', formData);
        console.log('Selected Items:', selectedItems);
        console.log('Night Hotels:', selectedItems.nightHotels);
        console.log('Night Rooms:', selectedItems.nightRooms);
        console.log('Current Night Index:', currentNightIndex);
        console.log('Number of Nights:', numberOfNights);
        console.log('Travel Details:', travelDetails);
        
        // Log each night's selections
        for (let i = 0; i < numberOfNights; i++) {
            const nightHotel = selectedItems.nightHotels?.[i];
            const nightRoom = selectedItems.nightRooms?.[i];
            console.log(`Night ${i + 1}:`, {
                hotel: nightHotel,
                room: nightRoom,
                hotelName: nightHotel?.name || 'No hotel selected',
                roomType: nightRoom?.roomType || 'No room selected',
                hotelId: nightHotel?.id || 'N/A',
                roomId: nightRoom?.id || 'N/A'
            });
        }
        console.log('=== END DEBUG ===');
    }, [formData, selectedItems, currentNightIndex, numberOfNights, travelDetails]);

    // Log when night index changes
    useEffect(() => {
        console.log('🌙 NIGHT INDEX CHANGED TO:', currentNightIndex + 1);
    }, [currentNightIndex]);

    // Calculate provinces for each night based on itinerary
    const nightProvinces = useMemo(() => {
        if (!itinerary || numberOfNights === 0) return [];
        
        const nights = [];
        for (let nightIndex = 0; nightIndex < numberOfNights; nightIndex++) {
            const dayIndex = nightIndex; // Night 1 is after Day 1, Night 2 is after Day 2, etc.
            
            if (dayIndex < itinerary.length) {
                const day = itinerary[dayIndex];
                const provinces = new Set();
                
                // Get all provinces visited on this day
                day.activities?.forEach(activity => {
                    if (activity.districtId) {
                        const district = districts.find(d => d.id === parseInt(activity.districtId));
                        if (district) {
                            provinces.add(district.provinceId);
                        }
                    }
                });
                
                nights.push({
                    nightNumber: nightIndex + 1,
                    dayNumber: dayIndex + 1,
                    provinces: Array.from(provinces),
                    selectedHotel: selectedItems.nightHotels?.[nightIndex] || null,
                    isSkipped: selectedItems.nightHotels?.[nightIndex] === 'skip'
                });
            }
        }
        
        return nights;
    }, [itinerary, numberOfNights, selectedItems.nightHotels]);

    // Get hotels for current night
    const filteredHotels = useMemo(() => {
        if (!isTourSelectHotel) {
            // Regular hotel search
            if (!travelDetails?.destination) {
                return hotelList;
            }
            const dest = travelDetails.destination.trim().toLowerCase();
            const filtered = hotelList.filter(hotel => 
                hotel.location?.toLowerCase().includes(dest) ||
                hotel.city?.toLowerCase().includes(dest)
            );
            return filtered.length > 0 ? filtered : hotelList;
        }

        // Tour hotel selection
        if (numberOfNights === 0 || !nightProvinces[currentNightIndex]) {
            return [];
        }

        const currentNight = nightProvinces[currentNightIndex];
        if (currentNight.provinces.length === 0) {
            return hotelList; // Show all hotels if no provinces selected
        }

        // Filter hotels by provinces visited on the current day
        return hotelList.filter(hotel => 
            currentNight.provinces.includes(hotel.provinceId)
        );
    }, [isTourSelectHotel, travelDetails?.destination, currentNightIndex, nightProvinces, numberOfNights]);

    const handleHotelSelect = useCallback((hotel) => {
        console.log('=== HOTEL SELECTION EVENT ===');
        console.log('Selected hotel:', hotel);
        console.log('Current night index:', currentNightIndex);
        console.log('Night number:', currentNightIndex + 1);
        
        const updatedNightHotels = [...(selectedItems.nightHotels || [])];
        updatedNightHotels[currentNightIndex] = {
            ...hotel,
            selectedForNight: currentNightIndex + 1 // Store which night this was selected for
        };
        
        console.log('Updated night hotels array:', updatedNightHotels);
        
        setFormData(prev => {
            const newFormData = {
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    nightHotels: updatedNightHotels,
                    // Clear room selection for this night when hotel changes
                    nightRooms: prev.selectedItems.nightRooms ? (() => {
                        const updatedNightRooms = [...prev.selectedItems.nightRooms];
                        updatedNightRooms[currentNightIndex] = null;
                        return updatedNightRooms;
                    })() : []
                }
            };
            
            console.log('New formData being set:', newFormData);
            console.log('=== END HOTEL SELECTION EVENT ===');
            return newFormData;
        });

        // Don't auto-advance - let user manually navigate
    }, [currentNightIndex, selectedItems.nightHotels, setFormData]);

    const handleSkipNight = () => {
        console.log('=== SKIP NIGHT EVENT ===');
        console.log('Skipping night:', currentNightIndex + 1);
        
        const updatedNightHotels = [...(selectedItems.nightHotels || [])];
        updatedNightHotels[currentNightIndex] = 'skip';
        
        console.log('Updated night hotels after skip:', updatedNightHotels);
        
        setFormData(prev => {
            const newFormData = {
                ...prev,
                selectedItems: {
                    ...prev.selectedItems,
                    nightHotels: updatedNightHotels
                }
            };
            
            console.log('FormData after skip:', newFormData);
            console.log('=== END SKIP NIGHT EVENT ===');
            return newFormData;
        });

        // Don't auto-advance - let user manually navigate
    };

    const handleNextNight = () => {
        if (currentNightIndex < numberOfNights - 1) {
            setCurrentNightIndex(currentNightIndex + 1);
        } else {
            navigate('/tour/select-vehicle');
        }
    };

    const handlePreviousNight = () => {
        if (currentNightIndex > 0) {
            setCurrentNightIndex(currentNightIndex - 1);
        }
    };

    const handleSkipAll = () => {
        navigate('/tour/select-vehicle');
    };

    const hotelsContainer = useMemo(() => {
        if (!isTourSelectHotel) {
            // Regular hotel search mode
            return filteredHotels.map((hotel) => (
                <div key={`hotel-${hotel.id}`}>
                    <HotelCard
                        id={hotel.id}
                        name={hotel.name}
                        location={hotel.location}
                        rating={hotel.rating}
                        pricePerNight={hotel.pricePerNight}
                        images={hotel.images}
                        amenities={hotel.amenities}
                        type={hotel.type}
                        roomLeft={hotel.leftRooms}
                        reviews={hotel.reviews}
                        isTourMode={false}
                    />
                </div>
            ));
        }

        // Tour mode - enhanced hotel cards with selection
        return filteredHotels.map((hotel) => {
            const isSelectedForCurrentNight = selectedItems.nightHotels?.[currentNightIndex]?.id === hotel.id;
            
            return (
                <div key={`hotel-${hotel.id}`}>
                    <HotelCard
                        id={hotel.id}
                        name={hotel.name}
                        location={hotel.location}
                        rating={hotel.rating}
                        pricePerNight={hotel.pricePerNight}
                        images={hotel.images}
                        amenities={hotel.amenities}
                        type={hotel.type}
                        roomLeft={hotel.leftRooms}
                        reviews={hotel.reviews}
                        isTourMode={true}
                        onHotelSelect={handleHotelSelect}
                        currentNight={currentNightIndex + 1}
                        isSelectedForCurrentNight={isSelectedForCurrentNight}
                    />
                </div>
            );
        });
    }, [filteredHotels, isTourSelectHotel, currentNightIndex, handleHotelSelect, selectedItems.nightHotels]);

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    // Debug function to log complete formData
    const debugFormData = () => {
        console.log('🔍 === COMPLETE FORMDATA DEBUG ===');
        console.log('Raw formData object:', JSON.stringify(formData, null, 2));
        console.log('');
        console.log('📅 Travel Details:');
        console.log('- Duration:', travelDetails.duration);
        console.log('- Start Date:', travelDetails.startDate);
        console.log('- End Date:', travelDetails.endDate);
        console.log('- Number of Nights:', numberOfNights);
        console.log('');
        console.log('🏨 Hotel Selections by Night:');
        for (let i = 0; i < numberOfNights; i++) {
            const nightHotel = selectedItems.nightHotels?.[i];
            const nightRoom = selectedItems.nightRooms?.[i];
            console.log(`Night ${i + 1}:`);
            console.log('  Hotel:', nightHotel === 'skip' ? 'SKIPPED' : (nightHotel?.name || 'Not selected'));
            console.log('  Hotel ID:', nightHotel === 'skip' ? 'N/A' : (nightHotel?.id || 'N/A'));
            console.log('  Room Type:', nightRoom?.roomType || 'Not selected');
            console.log('  Room ID:', nightRoom?.id || 'N/A');
            console.log('  Room Price:', nightRoom?.price || 'N/A');
        }
        console.log('');
        console.log('🗺️ Itinerary Summary:');
        itinerary?.forEach((day, index) => {
            console.log(`Day ${index + 1}:`, day.activities?.map(a => a.name).join(', ') || 'No activities');
        });
        console.log('');
        console.log('📊 Arrays State:');
        console.log('- nightHotels array length:', selectedItems.nightHotels?.length || 0);
        console.log('- nightRooms array length:', selectedItems.nightRooms?.length || 0);
        console.log('- nightHotels array:', selectedItems.nightHotels);
        console.log('- nightRooms array:', selectedItems.nightRooms);
        console.log('🔍 === END FORMDATA DEBUG ===');
    };

    // Tour mode UI
    if (isTourSelectHotel) {
        if (numberOfNights === 0) {
            return (
                <Main>
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-4">No Hotel Selection Needed</h2>
                            <p className="text-gray-600 mb-6">
                                Your trip is a day trip and doesn&apos;t require overnight accommodation.
                            </p>
                            <button
                                onClick={() => navigate('/tour/select-vehicle')}
                                className="px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-primary-dark transition"
                            >
                                Continue to Vehicle Selection
                            </button>
                        </div>
                    </div>
                </Main>
            );
        }

        return (
            <>
                <Main>
                    <div className='flex items-center w-full mt-5'>
                        <div className='w-1/4'>
                            <Breadcrumb items={breadcrumbItems} />
                        </div>
                        <div className='flex flex-1'>
                            <div className='w-full flex justify-between items-center'>
                                <Title 
                                    title={`Night ${currentNightIndex + 1} Accommodation (After Day ${nightProvinces[currentNightIndex]?.dayNumber})`}
                                    size='text-[18px]'
                                />
                                <div className='flex gap-4'>
                                    {currentNightIndex > 0 && (
                                        <button 
                                            onClick={handlePreviousNight}
                                            className="px-4 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                                        >
                                            Previous Night
                                        </button>
                                    )}
                                    <button 
                                        onClick={handleSkipNight}
                                        className="px-4 py-2 rounded border border-orange-300 text-orange-700 font-medium hover:bg-orange-50 transition"
                                    >
                                        Skip Night {currentNightIndex + 1}
                                    </button>
                                    <button 
                                        onClick={handleSkipAll}
                                        className="px-4 py-2 rounded border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                                    >
                                        Skip All Hotels
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Night Progress Indicator */}
                    <div className="mt-4 mb-6">
                        <div className="flex items-center justify-center space-x-2">
                            {Array.from({ length: numberOfNights }).map((_, index) => {
                                const nightSelection = selectedItems.nightHotels?.[index];
                                const getStepStatus = () => {
                                    if (index === currentNightIndex) return 'bg-brand-primary text-white border-2 border-brand-primary-dark';
                                    if (nightSelection === 'skip') return 'bg-orange-500 text-white';
                                    if (nightSelection && nightSelection !== 'skip') return 'bg-green-500 text-white';
                                    if (index < currentNightIndex) return 'bg-gray-400 text-white';
                                    return 'bg-gray-200 text-gray-600 hover:bg-gray-300';
                                };
                                
                                const getConnectorStatus = () => {
                                    return index < currentNightIndex ? 'bg-green-500' : 'bg-gray-200';
                                };

                                const getStatusIcon = () => {
                                    if (nightSelection === 'skip') return '⊘';
                                    if (nightSelection && nightSelection !== 'skip') return '✓';
                                    return (index + 1).toString();
                                };

                                const getTooltipText = () => {
                                    if (nightSelection === 'skip') return `Night ${index + 1} - Skipped`;
                                    if (nightSelection && nightSelection !== 'skip') return `Night ${index + 1} - ${nightSelection.name}`;
                                    return `Night ${index + 1} - Click to select`;
                                };

                                return (
                                    <div key={`night-${index + 1}`} className="flex items-center">
                                        <button 
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ${getStepStatus()}`}
                                            title={getTooltipText()}
                                            onClick={() => setCurrentNightIndex(index)}
                                        >
                                            {getStatusIcon()}
                                        </button>
                                        {index < numberOfNights - 1 && (
                                            <div className={`w-8 h-0.5 ${getConnectorStatus()}`} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="text-center mt-2 text-sm text-gray-600">
                            Night {currentNightIndex + 1} of {numberOfNights}
                            {selectedItems.nightHotels?.[currentNightIndex] === 'skip' && (
                                <span className="ml-2 text-orange-600 font-medium">(Skipped)</span>
                            )}
                            {selectedItems.nightHotels?.[currentNightIndex] && selectedItems.nightHotels?.[currentNightIndex] !== 'skip' && (
                                <span className="ml-2 text-green-600 font-medium">(Hotel Selected)</span>
                            )}
                        </div>
                        <div className="text-center mt-1 text-xs text-gray-500">
                            Click on any night number to jump to that night
                        </div>
                    </div>

                    {/* Province Information */}
                    {nightProvinces[currentNightIndex] && (
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">
                                Hotels available for Night {currentNightIndex + 1}
                            </h3>
                            <p className="text-blue-800 text-sm">
                                Based on your Day {nightProvinces[currentNightIndex].dayNumber} itinerary, 
                                showing hotels in: {' '}
                                {nightProvinces[currentNightIndex].provinces.map(pId => 
                                    provinces.find(p => p.id === pId)?.value
                                ).join(', ') || 'All provinces (no specific activities selected)'}
                            </p>
                            <p className="text-blue-700 text-xs mt-1">
                                Found {filteredHotels.length} suitable hotels
                            </p>
                        </div>
                    )}

                    {/* Selected Hotel Display */}
                    {selectedItems.nightHotels?.[currentNightIndex] && selectedItems.nightHotels?.[currentNightIndex] !== 'skip' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-green-900">
                                        Selected Hotel for Night {currentNightIndex + 1}
                                    </h4>
                                    <p className="text-green-800">
                                        {selectedItems.nightHotels[currentNightIndex].name} - {selectedItems.nightHotels[currentNightIndex].location}
                                    </p>
                                    <p className="text-green-700 text-sm">
                                        LKR {selectedItems.nightHotels[currentNightIndex].pricePerNight} / night
                                    </p>
                                    {selectedItems.nightRooms?.[currentNightIndex] && (
                                        <div className="mt-2 p-2 bg-white border border-green-300 rounded">
                                            <p className="text-green-900 text-sm font-medium">
                                                Selected Room: {selectedItems.nightRooms[currentNightIndex].roomType}
                                            </p>
                                            <p className="text-green-800 text-xs">
                                                LKR {selectedItems.nightRooms[currentNightIndex].pricePerNight} / night
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigate(`/tour/select-hotel/${selectedItems.nightHotels[currentNightIndex].id}`)}
                                        className="px-3 py-1 text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition text-sm"
                                    >
                                        {selectedItems.nightRooms?.[currentNightIndex] ? 'Change Room' : 'Select Room'}
                                    </button>
                                    <button
                                        onClick={() => {
                                            const updatedNightHotels = [...(selectedItems.nightHotels || [])];
                                            const updatedNightRooms = [...(selectedItems.nightRooms || [])];
                                            updatedNightHotels[currentNightIndex] = null;
                                            updatedNightRooms[currentNightIndex] = null;
                                            setFormData(prev => ({
                                                ...prev,
                                                selectedItems: {
                                                    ...prev.selectedItems,
                                                    nightHotels: updatedNightHotels,
                                                    nightRooms: updatedNightRooms
                                                }
                                            }));
                                        }}
                                        className="px-3 py-1 text-red-600 border border-red-300 rounded hover:bg-red-50 transition text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Skipped Night Display */}
                    {selectedItems.nightHotels?.[currentNightIndex] === 'skip' && (
                        <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-semibold text-orange-900">
                                        Night {currentNightIndex + 1} - Hotel Skipped
                                    </h4>
                                    <p className="text-orange-800 text-sm">
                                        You have chosen not to book accommodation for this night.
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        const updatedNightHotels = [...(selectedItems.nightHotels || [])];
                                        updatedNightHotels[currentNightIndex] = null;
                                        setFormData(prev => ({
                                            ...prev,
                                            selectedItems: {
                                                ...prev.selectedItems,
                                                nightHotels: updatedNightHotels
                                            }
                                        }));
                                    }}
                                    className="px-3 py-1 text-blue-600 border border-blue-300 rounded hover:bg-blue-50 transition text-sm"
                                >
                                    Select Hotel Instead
                                </button>
                            </div>
                        </div>
                    )}
                </Main>

                <Main>
                    <div className='flex gap-2 mt-5'>
                        {/* Filter Section */}
                        <div className='w-1/4 h-full overflow-y-auto sticky top-[100px] scrollbar-hide'>
                            <div className='flex flex-col gap-2 border rounded-[8px]'>
                                <div className='p-4 border-b'>
                                    <Title
                                        title='Filter Hotels:'
                                        size='text-[20px]'
                                        font='font-[600]'
                                    />
                                </div>
                                <div className='p-4 border-b'>
                                    <CheckboxGroup
                                        title="Property Type"
                                        options={propertyTypes}
                                        selected={selectedPropertyTypes}
                                        onChange={setSelectedPropertyTypes}
                                    />
                                </div>
                                <div className='p-4 border-b'>
                                    <CheckboxGroup
                                        title="Meals"
                                        options={mealOptions}
                                        selected={selectedMeals}
                                        onChange={setSelectedMeals}
                                    />
                                </div>
                                <div className='p-4 border-b'>
                                    <CheckboxGroup
                                        title="Facilities"
                                        options={amenities}
                                        selected={selectedFacilities}
                                        onChange={setSelectedFacilities}
                                    />
                                </div>
                                <div className='p-4 border-b'>
                                    <CheckboxGroup
                                        title="Price range"
                                        options={priceRanges}
                                        selected={selectedPriceRanges}
                                        onChange={setSelectedPriceRanges}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hotels List */}
                        <div className='flex flex-col flex-1'>
                            {filteredHotels.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-600 mb-4">
                                        No hotels found for Night {currentNightIndex + 1}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-6">
                                        This might be because you haven&apos;t selected any activities for the day, 
                                        or there are no hotels available in the visited provinces.
                                    </p>
                                    <button
                                        onClick={handleSkipNight}
                                        className="px-6 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition"
                                    >
                                        Skip Night {currentNightIndex + 1}
                                    </button>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2 w-full'>
                                    {hotelsContainer}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Footer */}
                    <div className="mt-8 flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div className="flex gap-4">
                            {currentNightIndex > 0 && (
                                <button 
                                    onClick={handlePreviousNight}
                                    className="px-6 py-2 rounded border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
                                >
                                    ← Previous Night
                                </button>
                            )}
                        </div>
                        
                        <div className="text-sm text-gray-600">
                            Night {currentNightIndex + 1} of {numberOfNights}
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={handleNextNight}
                                className="px-6 py-2 rounded bg-brand-primary text-white font-semibold hover:bg-brand-primary-dark transition flex items-center gap-2"
                            >
                                {currentNightIndex < numberOfNights - 1 ? 'Next Night' : 'Continue to Vehicles'}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Hotel Selection Summary */}
                    {selectedItems.nightHotels && Object.keys(selectedItems.nightHotels).some(key => selectedItems.nightHotels[key]) && (
                        <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
                            <h3 className="font-semibold text-gray-900 mb-3">Hotel & Room Selection Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {Array.from({ length: numberOfNights }).map((_, index) => {
                                    const nightSelection = selectedItems.nightHotels?.[index];
                                    const roomSelection = selectedItems.nightRooms?.[index];
                                    const renderNightStatus = () => {
                                        if (nightSelection === 'skip') {
                                            return <div className="text-orange-600 text-sm">Skipped</div>;
                                        }
                                        if (nightSelection) {
                                            return (
                                                <div>
                                                    <div className="text-sm font-medium">{nightSelection.name}</div>
                                                    <div className="text-xs text-gray-600">{nightSelection.location}</div>
                                                    <div className="text-xs text-brand-primary">LKR {nightSelection.pricePerNight}/night</div>
                                                    {roomSelection && (
                                                        <div className="mt-1 p-1 bg-blue-50 border border-blue-200 rounded text-xs">
                                                            <div className="font-medium text-blue-900">Room: {roomSelection.roomType}</div>
                                                            <div className="text-blue-700">LKR {roomSelection.pricePerNight}/night</div>
                                                        </div>
                                                    )}
                                                    {!roomSelection && (
                                                        <div className="mt-1 text-xs text-amber-600">No room selected</div>
                                                    )}
                                                </div>
                                            );
                                        }
                                        return <div className="text-gray-500 text-sm">Not selected</div>;
                                    };

                                    return (
                                        <div key={`summary-night-${index + 1}`} className="p-3 bg-white border rounded-lg">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-medium text-sm text-gray-700">
                                                    Night {index + 1}
                                                </div>
                                                {index !== currentNightIndex && (
                                                    <button
                                                        onClick={() => setCurrentNightIndex(index)}
                                                        className="text-xs px-2 py-1 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 transition"
                                                    >
                                                        View
                                                    </button>
                                                )}
                                                {index === currentNightIndex && (
                                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            {renderNightStatus()}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </Main>
            </>
        );
    }

    // Regular hotel search UI
    return (
        <>
            <Main>
                <div className='flex items-center w-full mt-5'>
                    <div className='w-1/4'>
                        <Breadcrumb
                            items={breadcrumbItems}
                        />
                    </div>
                    <div className='flex flex-1'>
                        <div className='w-full flex justify-between items-center'>
                            <Title 
                                title={`Hotels: ${filteredHotels.length} matches`}
                                size='text-[16px]'
                            />
                            <div className='w-1/2'>
                                <CustomSelector
                                    options={hotelFilterOptions}
                                    placeholder="Recommended"
                                    onChange={handleSelect}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
            <Main>
                <div className='flex gap-2 mt-5'>
                    {/* Filter Section */}
                    <div className='w-1/4 h-full overflow-y-auto sticky top-[100px] scrollbar-hide'>
                        <div className='flex flex-col gap-2 border rounded-[8px]'>
                            <div className='p-4 border-b'>
                                <Title
                                    title='Filter By:'
                                    size='text-[20px]'
                                    font='font-[600]'
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Property Type"
                                    options={propertyTypes}
                                    selected={selectedPropertyTypes}
                                    onChange={setSelectedPropertyTypes}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Meals"
                                    options={mealOptions}
                                    selected={selectedMeals}
                                    onChange={setSelectedMeals}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Facilities"
                                    options={amenities}
                                    selected={selectedFacilities}
                                    onChange={setSelectedFacilities}
                                />
                            </div>
                            <div className='p-4 border-b'>
                                <CheckboxGroup
                                    title="Price range"
                                    options={priceRanges}
                                    selected={selectedPriceRanges}
                                    onChange={setSelectedPriceRanges}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Hotels List */}
                    <div className='flex flex-col flex-1'>
                        <div className='flex flex-col gap-2 w-full'>
                            {hotelsContainer}
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
}
