import { FaCheckCircle, FaClock, FaBan } from 'react-icons/fa';

export default function StatusBadge({ status }) {
  const statusConfig = {
    Approved: {
      icon: <FaCheckCircle />,
      className: 'text-green-600',
    },
    Pending: {
      icon: <FaClock />,
      className: 'text-yellow-600',
    },
    Rejected: {
      icon: <FaBan />,
      className: 'text-red-600',
    },
  };

  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span className={`flex items-center gap-1 ${config.className}`}>
      {config.icon} {status}
    </span>
  );
}
