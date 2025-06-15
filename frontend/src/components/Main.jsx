import PropTypes from 'prop-types';

export default function Main({ children }) {
    return (
        <div className='w-full font-poppins mb-3 sm:mb-4 md:mb-5'>
            <div className='px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-60'>
                {children}
            </div>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
};