import { useState, useRef, useEffect } from 'react';
import { travelPlaces } from '../core/Lists/travelPlaces';

export default function SearchContainer() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectingDate, setSelectingDate] = useState('start'); // 'start' or 'end'
    const datePickerRef = useRef(null);
    const [destinationInput, setDestinationInput] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const destinationRef = useRef(null);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [fromInput, setFromInput] = useState('');
    const [showFromSuggestions, setShowFromSuggestions] = useState(false);
    const [filteredFromPlaces, setFilteredFromPlaces] = useState([]);
    const [selectedFrom, setSelectedFrom] = useState('Colombo');
    const fromRef = useRef(null);
    const sriLankaTravelPlaces = travelPlaces;
    const [pickupTime, setPickupTime] = useState('');
    const [showTimePicker, setShowTimePicker] = useState(false);
    const timePickerRef = useRef(null);

    // Close date picker and suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target) &&
                !event.target.closest('.dates-trigger')) {
                setShowDatePicker(false);
            }
            if (destinationRef.current && !destinationRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
            if (fromRef.current && !fromRef.current.contains(event.target)) {
                setShowFromSuggestions(false);
            }
            if (timePickerRef.current && !timePickerRef.current.contains(event.target) &&
                !event.target.closest('.time-trigger')) {
                setShowTimePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter places based on input
    useEffect(() => {
        if (destinationInput.trim() === '') {
            setFilteredPlaces([]);
            return;
        }

        const filtered = sriLankaTravelPlaces
            .filter(place => 
                place.value.toLowerCase().includes(destinationInput.toLowerCase())
            )
            .slice(0, 5); // Show only top 5 matches

        setFilteredPlaces(filtered);
    }, [destinationInput, sriLankaTravelPlaces]);

    // Filter places for "From" input
    useEffect(() => {
        if (fromInput.trim() === '') {
            setFilteredFromPlaces([]);
            return;
        }
        const filtered = travelPlaces
            .filter(place =>
                place.value.toLowerCase().includes(fromInput.toLowerCase())
            )
            .slice(0, 5);
        setFilteredFromPlaces(filtered);
    }, [fromInput]);

    const handleDestinationChange = (e) => {
        setDestinationInput(e.target.value);
        setShowSuggestions(true);
    };

    const selectDestination = (place) => {
        setSelectedDestination(place);
        setDestinationInput(place);
        setShowSuggestions(false);
    };

    const handleFromChange = (e) => {
        setFromInput(e.target.value);
        setShowFromSuggestions(true);
    };

    const selectFrom = (place) => {
        setSelectedFrom(place);
        setFromInput(place);
        setShowFromSuggestions(false);
    };

    const formatDate = (date) => {
        if (!date) return 'Select date';
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatDateRange = () => {
        if (!startDate && !endDate) return 'Select dates';
        if (startDate && !endDate) return formatDate(startDate);
        if (startDate && endDate) {
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
        return 'Select dates';
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        
        // Add all days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(new Date(year, month, day));
        }
        
        return days;
    };

    const navigateMonth = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(prev.getMonth() + direction);
            return newMonth;
        });
    };

    const selectDate = (date) => {
        if (selectingDate === 'start') {
            setStartDate(date);
            setEndDate(null); // Reset end date when start date changes
            setSelectingDate('end');
        } else {
            // If selecting end date, make sure it's after start date
            if (startDate && date < startDate) {
                // If selected date is before start date, make it the new start date
                setStartDate(date);
                setEndDate(null);
                setSelectingDate('end');
            } else {
                setEndDate(date);
                setShowDatePicker(false); // Close picker after selecting end date
            }
        }
    };

    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isStartDate = (date) => {
        return startDate && date.toDateString() === startDate.toDateString();
    };

    const isEndDate = (date) => {
        return endDate && date.toDateString() === endDate.toDateString();
    };

    const isInRange = (date) => {
        if (!startDate || !endDate) return false;
        return date > startDate && date < endDate;
    };

    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    const isDisabled = (date) => {
        if (isPastDate(date)) return true;
        // If selecting end date and date is before start date, disable it
        if (selectingDate === 'end' && startDate && date < startDate) return true;
        return false;
    };

    const clearDates = () => {
        setStartDate(new Date());
        setEndDate(null);
        setSelectingDate('start');
    };

    // Time picker state
    const [tempHour, setTempHour] = useState('12');
    const [tempMinute, setTempMinute] = useState('00');

    const openTimePicker = () => {
        setTempHour(pickupTime ? pickupTime.split(':')[0] : '12');
        setTempMinute(pickupTime ? pickupTime.split(':')[1] : '00');
        setShowTimePicker(true);
    };

    const handleTimeDone = () => {
        setPickupTime(`${tempHour.padStart(2, '0')}:${tempMinute.padStart(2, '0')}`);
        setShowTimePicker(false);
    };

    const handleTimeCancel = () => {
        setShowTimePicker(false);
    };

    return (
        <div className='relative h-[60px] p-4 bg-white flex flex-col 
            md:flex-row items-center justify-between shadow-md rounded-[16px]'>
            {/* From location */}
            <div ref={fromRef} className='relative flex flex-col items-center cursor-pointer'>
                <div
                    className='flex gap-1 items-center'
                    onClick={() => {
                        setFromInput(selectedFrom);
                        setShowFromSuggestions(true);
                        setTimeout(() => {
                            document.getElementById('fromInput')?.focus();
                        }, 0);
                    }}
                >
                    <h1 className='text-gray-400 text-[20px]'>From:</h1>
                    <h1 className='text-brand-primary text-[20px]'>{selectedFrom}</h1>
                </div>
                <h2 className='text-gray-400 text-[14px]'>Click here to change</h2>
                {showFromSuggestions && (
                    <div className='absolute top-full mt-2 z-10 w-[250px] 
                        bg-white shadow-lg rounded-lg p-2'>
                        <input
                            id="fromInput"
                            type="text"
                            value={fromInput}
                            onChange={handleFromChange}
                            placeholder="Search from location..."
                            className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300'
                            autoFocus
                        />
                        {filteredFromPlaces.length > 0 && (
                            <ul className='mt-2 border-t'>
                                {filteredFromPlaces.map(place => (
                                    <li
                                        key={place.id}
                                        className='p-2 hover:bg-orange-50 cursor-pointer'
                                        onClick={() => selectFrom(place.value)}
                                    >
                                        {place.value}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {fromInput && filteredFromPlaces.length === 0 && (
                            <div className='p-2 text-gray-500 text-sm'>
                                No locations found
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* Destination */}
            <div ref={destinationRef} className='relative flex flex-col items-center cursor-pointer'>
                {/* Show selected destination or placeholder */}
                <div
                    className='flex flex-col items-center'
                    onClick={() => {
                        setDestinationInput(selectedDestination); // Pre-fill input with selected destination
                        setShowSuggestions(true);
                        setTimeout(() => {
                            document.getElementById('destinationInput')?.focus();
                        }, 0);
                    }}
                >
                    <h1 className='text-black text-[20px]'>
                        {'Destination'}
                    </h1>
                    <h2 className='text-gray-400 text-[14px]'>
                        {selectedDestination ? selectedDestination : 'Search where you want to go'}
                    </h2>
                </div>

                {/* Input field that appears only when searching */}
                {showSuggestions && (
                    <div className='absolute top-full mt-2 z-10 w-[250px] bg-white shadow-lg rounded-lg p-2'>
                        <input
                            id="destinationInput"
                            type="text"
                            value={destinationInput}
                            onChange={handleDestinationChange}
                            placeholder="Search destinations..."
                            className='w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300'
                            autoFocus
                        />

                        {/* Suggestions dropdown */}
                        {filteredPlaces.length > 0 && (
                            <ul className='mt-2 border-t'>
                                {filteredPlaces.map(place => (
                                    <li
                                        key={place.id}
                                        className='p-2 hover:bg-orange-50 cursor-pointer'
                                        onClick={() => selectDestination(place.value)}
                                    >
                                        {place.value}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* No results message */}
                        {destinationInput && filteredPlaces.length === 0 && (
                            <div className='p-2 text-gray-500 text-sm'>
                                No destinations found
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* Date picker */}
            <div
                onClick={() => setShowDatePicker((prev) => !prev)}
                className='flex flex-col items-center cursor-pointer relative dates-trigger'
            >
                <div className='flex items-center gap-1'>
                    <span className='text-black text-[20px]'>📅</span>
                    <h1 className='text-black text-[20px]'>Dates</h1>
                </div>
                <h2 className='text-gray-400 text-[12px] text-center max-w-[120px] truncate'>
                    {formatDateRange()}
                </h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* 🔸 Pickup Time */}
            <div className='flex flex-col items-center cursor-pointer relative'>
                <label htmlFor="pickup-time" className='text-black text-[20px] cursor-pointer'>Time</label>
                <input
                    id="pickup-time"
                    type="text"
                    value={pickupTime ? pickupTime : ''}
                    placeholder="Select time"
                    className='text-gray-600 text-[14px] bg-white border rounded px-2 py-1 w-[100px] focus:outline-none focus:ring-2 focus:ring-orange-300 time-trigger text-center'
                    readOnly
                    onClick={openTimePicker}
                    style={{ cursor: 'pointer', backgroundColor: '#fff' }}
                />
                {/* Custom Time Picker */}
                {showTimePicker && (
                    <div
                        ref={timePickerRef}
                        className="absolute top-[60px] z-20 bg-white shadow-lg border rounded-lg p-4 min-w-[240px]"
                    >
                        <div className="mb-3 text-gray-700 font-medium text-center">Select Pickup Time</div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-brand-primary">
                                {tempHour.padStart(2, '0')}:{tempMinute.padStart(2, '0')}
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-6 mb-4">
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-500 mb-1">Hour</span>
                                {/* <button
                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-orange-100 mb-1 text-lg"
                                    onClick={() => setTempHour(h => (String((parseInt(h, 10) + 1) % 24).padStart(2, '0')))}
                                    tabIndex={-1}
                                    type="button"
                                >▲</button> */}
                                <select
                                    value={tempHour}
                                    onChange={e => setTempHour(e.target.value)}
                                    className="border rounded p-1 text-lg w-14 text-center"
                                >
                                    {[...Array(24).keys()].map(h => (
                                        <option key={h} value={h.toString().padStart(2, '0')}>
                                            {h.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                                {/* <button
                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-orange-100 mt-1 text-lg"
                                    onClick={() => setTempHour(h => (String((parseInt(h, 10) + 23) % 24).padStart(2, '0')))}
                                    tabIndex={-1}
                                    type="button"
                                >▼</button> */}
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-500 mb-1">Minute</span>
                                {/* <button
                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-orange-100 mb-1 text-lg"
                                    onClick={() => setTempMinute(m => {
                                        const mins = ['00','05','10','15','20','25','30','35','40','45','50','55'];
                                        let idx = mins.indexOf(m);
                                        return mins[(idx + 1) % mins.length];
                                    })}
                                    tabIndex={-1}
                                    type="button"
                                >▲</button> */}
                                <select
                                    value={tempMinute}
                                    onChange={e => setTempMinute(e.target.value)}
                                    className="border rounded p-1 text-lg w-14 text-center"
                                >
                                    {['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'].map(m => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                {/* <button
                                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-orange-100 mt-1 text-lg"
                                    onClick={() => setTempMinute(m => {
                                        const mins = ['00','05','10','15','20','25','30','35','40','45','50','55'];
                                        let idx = mins.indexOf(m);
                                        return mins[(idx + mins.length - 1) % mins.length];
                                    })}
                                    tabIndex={-1}
                                    type="button"
                                >▼</button> */}
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t">
                            <button
                                onClick={handleTimeCancel}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleTimeDone}
                                className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-primary-dark"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>
            {/* Search button */}
            <div className='flex flex-col items-center cursor-pointer'>
                <div className='bg-brand-primary hover:bg-opacity-95 
                    transition-colors text-white px-6 py-2 rounded-lg font-medium'>
                    Search
                </div>
            </div>

            {/* Custom Date Picker */}
            {showDatePicker && (
                <div
                    ref={datePickerRef}
                    className="absolute top-[70px] right-1 z-20 
                        bg-white shadow-lg border rounded-lg p-4 min-w-[320px]"
                >
                    {/* Date picker header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                            {selectingDate === 'start' ? 'Select start date' : 'Select end date'}
                        </div>
                        <button 
                            onClick={clearDates}
                            className="text-sm text-brand-primary hover:text-brand-primary-dark"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Selected dates display */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                            <div>
                                <span className="text-gray-500">Start: </span>
                                <span className={`${selectingDate === 'start' ? 
                                        'text-brand-primary font-medium' : 'text-gray-700'}`}>
                                    {formatDate(startDate)}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">End: </span>
                                <span className={`${selectingDate === 'end' ? 
                                        'text-brand-primary font-medium' : 'text-gray-700'}`}>
                                    {formatDate(endDate)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button 
                            onClick={() => navigateMonth(-1)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <span className="text-xl">‹</span>
                        </button>
                        <h3 className="text-lg font-semibold">
                            {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </h3>
                        <button 
                            onClick={() => navigateMonth(1)}
                            className="p-1 hover:bg-gray-100 rounded"
                        >
                            <span className="text-xl">›</span>
                        </button>
                    </div>

                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar days */}
                    <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((date, index) => (
                            <div key={index} className="aspect-square">
                                {date && (
                                    <button
                                        onClick={() => !isDisabled(date) && selectDate(date)}
                                        disabled={isDisabled(date)}
                                        className={`
                                            w-full h-full rounded text-sm font-medium transition-colors
                                            ${isDisabled(date) ? 
                                                'text-gray-300 cursor-not-allowed' : 
                                                'hover:bg-gray-100 cursor-pointer'}
                                            ${isStartDate(date) ? 
                                                'bg-brand-primary text-white hover:bg-brand-primary-dark' : ''}
                                            ${isEndDate(date) ? 
                                                'bg-brand-primary text-white hover:bg-brand-primary-dark' : ''}
                                            ${isInRange(date) ? 
                                                'bg-orange-100 text-orange-600' : ''}
                                            ${isToday(date) && !isStartDate(date) && 
                                                !isEndDate(date) && !isInRange(date) ? 
                                                    'bg-blue-100 text-blue-600' : ''}
                                        `}
                                    >
                                        {date.getDate()}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-between mt-4 pt-3 border-t">
                        <button
                            onClick={() => setShowDatePicker(false)}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        {endDate && (
                            <button
                                onClick={() => setShowDatePicker(false)}
                                className="px-4 py-2 bg-brand-primary 
                                    text-white rounded hover:bg-brand-primary-dark"
                            >
                                Done
                            </button>
                        )}
                    </div>
                </div>
            )}

            
        </div>
    );
}