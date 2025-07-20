import PropTypes from 'prop-types';

export default function Main({ children, hasNavbar = false }) {
    return (
        <div className='w-full font-poppins mb-3 sm:mb-4 md:mb-5 mt-5'>
            <div className={`${
                hasNavbar 
                    ? 'pl-2 sm:pl-3 md:pl-4 lg:pl-6 xl:pl-8 2xl:pl-12 pr-4 sm:pr-6 md:pr-10 lg:pr-20 xl:pr-40 2xl:pr-60' 
                    : 'px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 2xl:px-60'
            }`}>
                {children}
            </div>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
    hasNavbar: PropTypes.bool,
};