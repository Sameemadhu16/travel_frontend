import PropTypes from 'prop-types';

const SendMessage = ({ message, time }) => {
  const timeOnly = new Date(time).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return (
    <div className="flex flex-col max-w-[66.66%]">
      <div className="p-3 rounded-t-[24px] bg-brand-secondary rounded-l-[24px] shadow-sm">
        <h1 className="font-normal text-content-primary text-[16px]">{message}</h1>
      </div>
      <div className="w-full flex justify-end">
        <h2 className="text-content-tertiary text-[12px] font-normal mt-1">{timeOnly}</h2>
      </div>
    </div>
  );
};

SendMessage.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default SendMessage;
