import PropTypes from 'prop-types'

const Card = ({ children, className }) => {
    return (
        <div className={`bg-gray-50 px-6 py-4 my-5 rounded-lg flex gap-5 items-center shadow-md w-full ${className}`}>
            {children}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string, // Optional string
};

export default Card