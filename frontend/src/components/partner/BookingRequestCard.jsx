import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';
import Card from './Card';

const BookingRequestCard = ({ booking, onViewDetails, onAccept, onDecline }) => {
    return (
        <Card>
            <div className="flex items-center gap-4 w-full">
                <img
                    src={booking.user.image}
                    alt={booking.user.name}
                    className="w-12 h-12 rounded-full"
                />
                <div>
                    <h2 className="font-semibold text-lg">{booking.user.name}</h2>
                    <p className="text-sm text-gray-500">Joined {booking.user.joinedDate}</p>
                </div>
            </div>
            <div className="flex items-start gap-4 mt-4 justify-between pb-3 border-b-2">
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Destination</p>
                    <p className='font-medium'>{booking.destination}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Tour Dates</p>
                    <p className='font-medium'>{booking.tourDates}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Duration</p>
                    <p className='font-medium'>{booking.duration}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Group Size</p>
                    <p className='font-medium'>{booking.groupSize}</p>
                </div>
                <div className='flex flex-col'>
                    <p className="mt-1 text-gray-500">Vehicle</p>
                    <p className='font-medium'>{booking.vehicle}</p>
                </div>
            </div>
            <div className="mt-4 flex flex-row justify-between gap-2 items-center">
                <div>
                    <p className="text-orange-600 font-semibold">Daily Rate: Rs. {booking.dailyRate.toLocaleString()}</p>
                    <p className="text-green-600 font-semibold">Total Earnings: Rs. {booking.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                    {booking.status === 'pending' ? (
                        <>
                            <div className="">
                                <PrimaryButton
                                    text="Accept"
                                    type={'button'}
                                    className={'text-base'}
                                    onClick={() => onAccept(booking.id)}
                                />
                            </div>
                            <div className="">
                                <SecondaryButton
                                    text="View Details"
                                    type={'button'}
                                    onClick={() => onViewDetails(booking)}
                                    className={'text-base hover:text-orange-600'}
                                />
                            </div>
                            <div className="">
                                <SecondaryButton
                                    text="✕ Decline"
                                    type={'button'}
                                    onClick={() => onDecline(booking.id)}
                                    className={'text-base hover:text-red-600 text-red-500 border-red-500 hover:bg-red-50'}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mr-4">
                                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                                    booking.status === 'accepted'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                }`}>
                                    {booking.status === 'accepted' ? 'Accepted' : 'Declined'}
                                </span>
                            </div>
                            <div className="">
                                <SecondaryButton
                                    text="View Details"
                                    type={'button'}
                                    onClick={() => onViewDetails(booking)}
                                    className={'text-base hover:text-orange-600'}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};

BookingRequestCard.propTypes = {
    booking: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            joinedDate: PropTypes.string.isRequired,
        }).isRequired,
        destination: PropTypes.string.isRequired,
        tourDates: PropTypes.string.isRequired,
        duration: PropTypes.string.isRequired,
        groupSize: PropTypes.string.isRequired,
        vehicle: PropTypes.string.isRequired,
        dailyRate: PropTypes.number.isRequired,
        totalEarnings: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
    onViewDetails: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onDecline: PropTypes.func.isRequired,
};

export default BookingRequestCard;
