import PropTypes from 'prop-types';

const ReciveMessage = ({ message, time }) => {
  const timeOnly = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col max-w-[66.66%]">
      <div className="p-3 rounded-t-[24px] bg-surface-tertiary rounded-r-[24px] shadow-sm">
        <h1 className="font-normal text-content-primary text-[16px]">{message}</h1>
      </div>
      <h2 className="text-content-tertiary text-[12px] font-normal mt-1">{timeOnly}</h2>
    </div>
  );
};

ReciveMessage.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ReciveMessage;
