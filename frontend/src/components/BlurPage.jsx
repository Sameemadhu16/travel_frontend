import PropTypes from 'prop-types';

export default function BlurPage({children}) {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-brand-accent  bg-opacity-20 
                backdrop-blur-[4px] z-50 flex items-center justify-center">
            {children}
        </div>
    )
}

BlurPage.propTypes = {
    children: PropTypes.node.isRequired,
};