import PropTypes from 'prop-types'

const AdminCard = ({ children, className }) => {
    return (
        <div className={`bg-white border border-orange-400 shadow rounded-lg p-4 flex flex-col justify-between mb-4 ${className}`}>
            {children}
        </div>
    );
};

AdminCard.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string, // Optional string
};

export default AdminCard
