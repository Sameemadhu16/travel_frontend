import { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import Main from '../../components/Main';
import Card from './guideComponents/Card';
import PrimaryButton from '../../components/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton';
import { FaCalendarAlt } from 'react-icons/fa';
import NavBar from './guideComponents/NavBar'

const UnavailabilityModal = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    if (title && startDate && endDate) {
      onAdd({
        title,
        startDate,
        endDate
      });
      setTitle('');
      setStartDate('');
      setEndDate('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-orange-200">
          <h2 className="text-2xl font-semibold">Set Unavailability</h2>
          <p className="text-gray-600 text-sm mt-1">Block dates when you&apos;re not available for tours</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Reason for Unavailability</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Family Trip, Health Break, Personal Leave"
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="p-6 border-t border-orange-200 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Add Unavailability
          </button>
        </div>
      </div>
    </div>
  );
};

const GuideAvailability = () => {
  const [currentMonth, setCurrentMonth] = useState(9); // December 2024
  const [currentYear, setCurrentYear] = useState(2025);
  const [showModal, setShowModal] = useState(false);

  const [unavailablePeriods, setUnavailablePeriods] = useState([
    {
      id: 1,
      title: "Family Trip",
      startDate: "2025-10-20",
      endDate: "2025-10-25",
    },
    {
      id: 2,
      title: "Health Break",
      startDate: "2025-11-28",
      endDate: "2025-11-31",
    }
  ]);

  // Sri Lankan holidays and events
  const sriLankanEvents = [
    { date: '2025-01-14', title: 'Thai Pongal', type: 'holiday' },
    { date: '2025-02-04', title: 'Independence Day', type: 'holiday' },
    { date: '2025-03-08', title: 'Maha Shivaratri', type: 'holiday' },
    { date: '2025-04-13', title: 'Sinhala New Year', type: 'holiday' },
    { date: '2025-04-14', title: 'Sinhala New Year', type: 'holiday' },
    { date: '2025-05-01', title: 'Labour Day', type: 'holiday' },
    { date: '2025-05-23', title: 'Vesak Full Moon Poya', type: 'holiday' },
    { date: '2025-06-30', title: 'Bank Holiday', type: 'holiday' },
    { date: '2025-07-20', title: 'Esala Perahera (Kandy)', type: 'event' },
    { date: '2025-08-15', title: 'Assumption of Mary', type: 'holiday' },
    { date: '2025-10-20', title: 'Deepavali', type: 'holiday' },
    { date: '2025-10-29', title: 'Il Full Moon Poya', type: 'holiday' },
    { date: '2025-11-01', title: 'All Saints Day', type: 'holiday' },
    { date: '2025-12-25', title: 'Christmas Day', type: 'holiday' },
  ];

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

  const getDateString = (day, month, year) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const isDateUnavailable = (day) => {
    const dateStr = getDateString(day, currentMonth, currentYear);
    return unavailablePeriods.some(period => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
  };

  const isDateEvent = (day) => {
    const dateStr = getDateString(day, currentMonth, currentYear);
    return sriLankanEvents.find(event => event.date === dateStr);
  };

  const getUnavailabilityReason = (day) => {
    const dateStr = getDateString(day, currentMonth, currentYear);
    const period = unavailablePeriods.find(p => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      const current = new Date(dateStr);
      return current >= start && current <= end;
    });
    return period?.title;
  };

  const handleAddUnavailability = ({ title, startDate, endDate }) => {
    const newPeriod = {
      id: Math.max(...unavailablePeriods.map(p => p.id), 0) + 1,
      title,
      startDate,
      endDate
    };
    setUnavailablePeriods([...unavailablePeriods, newPeriod]);
    setShowModal(false);
  };

  const handleDeleteUnavailability = (id) => {
    setUnavailablePeriods(unavailablePeriods.filter(p => p.id !== id));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-16 border border-gray-100"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isUnavailable = isDateUnavailable(day);
      const event = isDateEvent(day);
      const reason = getUnavailabilityReason(day);

      days.push(
        <div 
          key={day} 
          className={`h-16 border border-gray-100 relative p-1 ${isUnavailable ? 'bg-orange-50' : ''}`}
        >
          <span className="text-sm font-medium">{day}</span>
          {isUnavailable && (
            <div className="absolute inset-x-1 bottom-1">
              <div className="bg-orange-500 text-white text-xs px-1 py-0.5 rounded text-center truncate">
                {reason}
              </div>
            </div>
          )}
          {event && !isUnavailable && (
            <div className="absolute inset-x-1 bottom-1">
              <div className="bg-blue-400 text-white text-xs px-1 py-0.5 rounded text-center truncate">
                {event.title}
              </div>
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Availability</h1>
              <p className="text-gray-600">Manage your tour schedule and block unavailable dates</p>
            </div>
            <div className="min-w-0">
              <PrimaryButton
                text={'Set New Unavailability'}
                type="button"
                className="text-base"
                onClick={() => setShowModal(true)}
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
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <span>Sri Lankan Events</span>
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

          {/* Unavailable Periods Card */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Unavailable Dates</h3>
            </div>

            {unavailablePeriods.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No unavailable dates set yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {unavailablePeriods.map((period) => (
                  <div key={period.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                        <FaCalendarAlt className='text-white text-sm' />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{period.title}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(period.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(period.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleDeleteUnavailability(period.id)}
                        className="p-1 hover:bg-orange-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-orange-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4">
              <SecondaryButton
                text="Add New Unavailable Period"
                type={'button'}
                onClick={() => setShowModal(true)}
                className={'text-base border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-orange-400 hover:text-orange-600'}
              />
            </div>
          </Card>

          {/* Modal */}
          <UnavailabilityModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onAdd={handleAddUnavailability}
          />
        </Main>
      </div>
    </div>
  );
};

export default GuideAvailability;