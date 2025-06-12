import PropTypes from 'prop-types';
import Title from '../../../components/Title';
import Navigate from '../../../components/Navigate';


export default function TextLink({
    path,
    title,
    className = '',
    size = 'text-[18px]',
    font = 'font-[500]',
    color = 'text-brand-primary',
}) {
    return (
        <Navigate
        path={path}
        className={`w-full py-3 flex justify-center hover:bg-brand-accent rounded-[8px] cursor-pointer mt-10 ${className}`}
        >
        <Title title={title} size={size} font={font} color={color} />
        </Navigate>
    );
}

TextLink.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
    size: PropTypes.string,
    font: PropTypes.string,
    color: PropTypes.string,
};
