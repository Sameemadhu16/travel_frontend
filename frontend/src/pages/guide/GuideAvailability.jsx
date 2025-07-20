import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Main from '../../components/Main';

export default function AvailabilityCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 11)); // December 2024
    const [unavailableDates] = useState([1, 15, 16, 29, 30, 31]);
    const [selectedDates, setSelectedDates] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Sample data for the unavailability table
    const [unavailabilityList, setUnavailabilityList] = useState([
        { id: 1, dateRange: 'Dec 15-16, 2024', reason: 'Family Trip', notes: 'Weekend getaway' },
        { id: 2, dateRange: 'Dec 29-31, 2024', reason: 'Personal Leave', notes: 'Year-end holiday' }
    ]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const handleDateClick = (day) => {
        if (!day) return;

        if (selectedDates.includes(day)) {
            setSelectedDates(selectedDates.filter(d => d !== day));
        } else {
            setSelectedDates([...selectedDates, day]);
        }
    };

    const getDateStatus = (day) => {
        if (!day) return 'empty';
        if (unavailableDates.includes(day)) return 'unavailable';
        if (selectedDates.includes(day)) return 'selected';
        return 'available';
    };

    const getDateClasses = (day) => {
        if (!day) return 'invisible';

        const status = getDateStatus(day);
        const baseClasses = 'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer transition-colors';

        switch (status) {
            case 'unavailable':
                return `${baseClasses} bg-red-500 text-white`;
            case 'selected':
                return `${baseClasses} bg-blue-500 text-white`;
            case 'available':
            default:
                return `${baseClasses} text-gray-700 hover:bg-gray-100`;
        }
    };

    const handleAddUnavailability = () => {
        // Handle form submission here
        console.log({
            startDate,
            endDate,
            reason,
            notes
        });

        // Reset form
        setStartDate('');
        setEndDate('');
        setReason('');
        setNotes('');
    };

    const days = getDaysInMonth(currentDate);

    return (
        <Main>
            <div className="flex flex-col bg-white">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Availability</h1>
                    <p className="text-gray-600">Update your unavailability and handle unavailability</p>
                </div>

                {/* Calendar and Form Section */}
                <div className='flex flex-col gap-5'>
                    <div className="flex gap-8">
                        {/* Calendar Section */}
                        <div className="flex-1">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => navigateMonth(-1)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                                    </button>
                                    <button
                                        onClick={() => navigateMonth(1)}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            </div>

                            {/* Days of Week Header */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {daysOfWeek.map(day => (
                                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-1 mb-6">
                                {days.map((day, index) => (
                                    <button
                                        key={index}
                                        className={getDateClasses(day)}
                                        onClick={() => handleDateClick(day)}
                                        disabled={!day}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-gray-200"></div>
                                    <span className="text-gray-600">Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-red-500"></div>
                                    <span className="text-gray-600">Unavailable</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                                    <span className="text-gray-600">Selected</span>
                                </div>
                            </div>
                        </div>

                        {/* Set Unavailability Form */}
                        <div className="w-80 bg-gray-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Set Unavailability</h3>

                            <div className="space-y-4">
                                {/* Date Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date Range
                                    </label>
                                    <div className="space-y-3">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="mm/dd/yyyy"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="mm/dd/yyyy"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Reason
                                    </label>
                                    <select
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white"
                                    >
                                        <option value="">Select reason</option>
                                        <option value="vacation">Vacation</option>
                                        <option value="sick">Sick Leave</option>
                                        <option value="personal">Personal</option>
                                        <option value="training">Training</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Notes (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Additional details..."
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent resize-none"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleAddUnavailability}
                                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 transition-colors font-medium"
                                >
                                    Add Unavailability
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Unavailability Table Section */}
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Unavailability</h3>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Range</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {unavailabilityList.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.dateRange}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reason}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.notes}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button className="text-green-500 hover:text-green-700">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}