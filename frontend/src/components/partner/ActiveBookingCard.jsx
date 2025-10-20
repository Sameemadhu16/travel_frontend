import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import Card from './Card';
import { FaCalendar, FaClock, FaUsers, FaCar } from 'react-icons/fa';

const ActiveBookingCard = ({ booking, onContact, onViewDetails }) => {
    return (
        <Card className="h-full">
            {/* Customer Info */}
            <div className="flex items-center mb-4">
                <img
                    src={booking.user.image}
                    alt={booking.user.name}
                    className="w-12 h-12 rounded-lg mr-3"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{booking.user.name}</h3>
                    <p className="text-sm text-gray-600">{booking.bookingId}</p>
                </div>
                <div className="flex items-center bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-1"></span>
                    {booking.paymentStatus}
                </div>
            </div>

            {/* Booking Details */}
            <div className="mb-4">
                <h4 className="font-semibold text-gray-900 mb-3">{booking.tripDetails.destination}</h4>
                <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaCalendar className='text-orange-500' />
                        {booking.tripDetails.startDate} - {booking.tripDetails.endDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaUsers className='text-orange-500' />
                        {booking.tripDetails.groupSize}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaClock className='text-orange-500' />
                        {booking.tripDetails.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-2">
                        <FaCar className='text-orange-500' />
                        {booking.vehicle.name}
                    </div>
                </div>
            </div>

            {/* Payment Deadline */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Payment Deadline</span>
                    <span className="text-sm font-bold text-red-600">{booking.paymentDeadline}</span>
                </div>
                <p className="text-xs text-gray-600">Due: {booking.paymentDue}</p>
            </div>

            {/* Earnings */}
            <div className="flex justify-between items-center mb-4">
                <div>
                    <p className="text-sm text-gray-600">Estimated Earnings</p>
                    <p className="text-2xl font-bold text-green-600">Rs. {booking.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Accepted</p>
                    <p className="text-sm font-medium text-gray-900">{booking.acceptedDate}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
                <div className="w-1/2">
                    <PrimaryButton
                        text="Contact"
                        type={'button'}
                        className={'text-base'}
                        onClick={() => onContact(booking)}
                    />
                </div>
                <div className="w-1/2">
                    <SecondaryButton
                        text="View Details"
                        type={'button'}
                        className={'text-base hover:text-orange-600'}
                        onClick={() => onViewDetails(booking)}
                    />
                </div>
            </div>
        </Card>
    );
};

ActiveBookingCard.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            phone: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        }).isRequired,
        bookingId: PropTypes.string.isRequired,
        tripDetails: PropTypes.shape({
            destination: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            duration: PropTypes.string.isRequired,
            groupSize: PropTypes.string.isRequired,
        }).isRequired,
        vehicle: PropTypes.shape({
            name: PropTypes.string.isRequired,
            regNumber: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        }).isRequired,
        paymentStatus: PropTypes.string.isRequired,
        paymentDeadline: PropTypes.string.isRequired,
        paymentDue: PropTypes.string.isRequired,
        acceptedDate: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
    }).isRequired,
    onContact: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired,
};

export default ActiveBookingCard;
