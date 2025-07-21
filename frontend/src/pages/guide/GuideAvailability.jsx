import { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus } from 'lucide-react';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import PrimaryButton from '../../components/PrimaryButton';
import { FaCalendarAlt } from 'react-icons/fa';
import NavBar from './guideComponents/NavBar'
import SecondaryButton from '../../components/SecondaryButton';

const GuideAvailability = () => {
  const [currentMonth, setCurrentMonth] = useState(6); // July (0-based)
  const [currentYear, setCurrentYear] = useState(2025);

  // Sample blocked dates data
  const [blockedDates] = useState([
    {
      id: 1,
      title: "Family Trip",
      startDate: "July 2",
      endDate: "July 4, 2025",
      dates: [10, 11, 12, 13, 14] // July dates
    },
    {
      id: 2,
      title: "Health Break",
      startDate: "July 22",
      endDate: "July 31, 2025",
      dates: [22, 23] // July dates
    }
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const isDateBlocked = (date) => {
    return blockedDates.some(block => block.dates.includes(date));
  };

  const getBlockedDateInfo = (date) => {
    const block = blockedDates.find(block => block.dates.includes(date));
    return block ? block.title : null;
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 border border-gray-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isBlocked = isDateBlocked(day);
      const blockInfo = getBlockedDateInfo(day);

      days.push(
        <div key={day} className="h-16 border border-gray-100 relative p-1">
          <span className="text-sm font-medium">{day}</span>
          {isBlocked && (
            <div className="absolute inset-x-1 bottom-1">
              {day === 5 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Cancelled Tour
                </div>
              )}
              {(day >= 10 && day <= 14) && (
                <div className="bg-orange-300 text-orange-800 text-xs px-1 py-0.5 rounded text-center">
                  Family Trip
                </div>
              )}
              {day === 18 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Ready Tour
                </div>
              )}
              {day === 19 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Yellow Tour
                </div>
              )}
              {day === 20 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Green Tour
                </div>
              )}
              {day === 22 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Afghanistan Day
                </div>
              )}
              {day === 23 && (
                <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center">
                  Afghanistan Day
                </div>
              )}
              {day === 27 && (
                <div className="bg-orange-400 text-white text-xs px-1 py-0.5 rounded text-center">
                  Cable Tour
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className='flex'>
      <div className='sticky top-0 h-fit'>
        <NavBar />
      </div>
      <div className='flex-1'>
        <Main hasNavbar={true}>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Availability</h1>
              <p className="text-gray-600 mb-6">Update your unavailability and handle unavailability</p>

            </div>
            <div className="min-w-0">
              <PrimaryButton
                text={'Set New Unavailability'}
                type="button"
                className="text-base"
              />
            </div>
          </div>

          {/* Calendar Card */}
          <Card className="mb-6">
            {/* Calendar Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold">
                  {months[currentMonth]} {currentYear}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-300 rounded"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Booked Tour</span>
                </div>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="h-8 flex items-center justify-center font-medium text-gray-600 text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded">
              {renderCalendar()}
            </div>
          </Card>

          {/* Blocked Dates & Reasons Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Unavailable Dates & Reasons</h3>
            </div>

            <div className="space-y-3">
              {blockedDates.map((block) => (
                <div key={block.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                      <FaCalendarAlt className='text-white' />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{block.title}</h4>
                      <p className="text-sm text-gray-600">{block.startDate} - {block.endDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-orange-100 rounded">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-orange-100 rounded">
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <SecondaryButton
                text="Add New Unavailable Period"
                type={'button'}
                className={'text-base border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600'}
              />
            </div>
          </Card>
        </Main>
      </div>
    </div>
  );
};

export default GuideAvailability;