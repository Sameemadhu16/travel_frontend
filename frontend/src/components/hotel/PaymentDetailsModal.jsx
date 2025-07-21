import { FaCalendarAlt, FaHotel, FaMoneyBillWave, FaUser, FaReceipt, FaTimes } from 'react-icons/fa';

export default function PaymentDetailsModal({ payment, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <FaTimes className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Payment Basic Info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Payment ID</h3>
              <p className="font-medium">{payment.paymentId}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Booking ID</h3>
              <p className="font-medium">{payment.bookingId}</p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FaUser className="mt-1 text-gray-400 text-xl" />
                <div>
                  <h3 className="text-sm text-gray-500">Guest Information</h3>
                  <p className="font-medium">{payment.guestName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FaHotel className="mt-1 text-gray-400 text-xl" />
                <div>
                  <h3 className="text-sm text-gray-500">Hotel Branch</h3>
                  <p className="font-medium">{payment.branch}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaCalendarAlt className="mt-1 text-gray-400 text-xl" />
                <div>
                  <h3 className="text-sm text-gray-500">Payment Date</h3>
                  <p className="font-medium">{payment.paymentDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaMoneyBillWave className="mt-1 text-gray-400 text-xl" />
                <div>
                  <h3 className="text-sm text-gray-500">Amount</h3>
                  <p className="font-medium">LKR {payment.amount}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaReceipt className="mt-1 text-gray-400 text-xl" />
                <div>
                  <h3 className="text-sm text-gray-500">Payment Method</h3>
                  <p className="font-medium">{payment.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Stay Details */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Stay Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Room Type</h4>
                  <p className="font-medium">{payment.roomType}</p>
                </div>
                <div>
                  <h4 className="text-sm text-gray-500 mb-1">Duration</h4>
                  <p className="font-medium">{payment.duration}</p>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Payment Status</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Current Status</p>
                    <p className={`font-medium ${
                      payment.status === 'Completed' ? 'text-green-600' :
                      payment.status === 'Pending' ? 'text-yellow-600' :
                      payment.status === 'Failed' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {payment.status}
                    </p>
                  </div>
                  {payment.status === 'Pending' && (
                    <button className="px-4 py-2 bg-brand-primary text-white rounded-lg">
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
