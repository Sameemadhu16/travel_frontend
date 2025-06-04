import React, { useState, useRef, useEffect } from 'react';

export default function SearchContainer() {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectingDate, setSelectingDate] = useState('start'); // 'start' or 'end'
    const datePickerRef = useRef(null);

    const handleCalenderPicker = () => {
        setShowDatePicker(!showDatePicker);
        setSelectingDate('start'); // Always start with start date
    };

    // Close date picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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

    return (
        <div className='relative h-[60px] p-4 bg-white flex flex-row items-center justify-between shadow-md rounded-[16px]'>
            {/* From location */}
            <div className='flex flex-col items-center cursor-pointer'>
                <div className='flex gap-1'>
                    <h1 className='text-gray-400 text-[20px]'>From:</h1>
                    <h1 className='text-orange-500 text-[20px]'>Colombo</h1>
                </div>
                <h2 className='text-gray-400 text-[14px]'>Click here to change</h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* Destination */}
            <div className='flex flex-col items-center cursor-pointer'>
                <h1 className='text-black text-[20px]'>Destination</h1>
                <h2 className='text-gray-400 text-[14px]'>Search where you want to go</h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* Date picker */}
            <div onClick={handleCalenderPicker} className='flex flex-col items-center cursor-pointer relative'>
                <div className='flex items-center gap-1'>
                    <span className='text-black text-[20px]'>📅</span>
                    <h1 className='text-black text-[20px]'>Dates</h1>
                </div>
                <h2 className='text-gray-400 text-[12px] text-center max-w-[120px] truncate'>
                    {formatDateRange()}
                </h2>
            </div>

            <div className='h-[50px] w-[2px] bg-gray-600 shrink-0'></div>

            {/* Search button */}
            <div className='flex flex-col items-center cursor-pointer'>
                <div className='bg-orange-400 hover:bg-orange-500 transition-colors text-white px-6 py-2 rounded-lg font-medium'>
                    Search
                </div>
            </div>

            {/* Custom Date Picker */}
            {showDatePicker && (
                <div 
                    ref={datePickerRef}
                    className="absolute top-[70px] right-1 z-20 bg-white shadow-lg border rounded-lg p-4 min-w-[320px]"
                >
                    {/* Date picker header */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="text-sm text-gray-600">
                            {selectingDate === 'start' ? 'Select start date' : 'Select end date'}
                        </div>
                        <button 
                            onClick={clearDates}
                            className="text-sm text-orange-500 hover:text-orange-600"
                        >
                            Clear
                        </button>
                    </div>

                    {/* Selected dates display */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center text-sm">
                            <div>
                                <span className="text-gray-500">Start: </span>
                                <span className={`${selectingDate === 'start' ? 'text-orange-500 font-medium' : 'text-gray-700'}`}>
                                    {formatDate(startDate)}
                                </span>
                            </div>
                            <div>
                                <span className="text-gray-500">End: </span>
                                <span className={`${selectingDate === 'end' ? 'text-orange-500 font-medium' : 'text-gray-700'}`}>
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
                                            ${isDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100 cursor-pointer'}
                                            ${isStartDate(date) ? 'bg-orange-400 text-white hover:bg-orange-500' : ''}
                                            ${isEndDate(date) ? 'bg-orange-400 text-white hover:bg-orange-500' : ''}
                                            ${isInRange(date) ? 'bg-orange-100 text-orange-600' : ''}
                                            ${isToday(date) && !isStartDate(date) && !isEndDate(date) && !isInRange(date) ? 'bg-blue-100 text-blue-600' : ''}
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
                                className="px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
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