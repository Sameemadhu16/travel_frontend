import PropTypes from 'prop-types';

export default function Main({ children }) {
    return (
        <div className='w-full font-poppins mb-5'>
            <div className='md:px-60 px-10'>
                {children}
            </div>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
};
