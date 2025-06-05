import Title from '../../../components/Title'
import PropTypes from 'prop-types'

export default function Tag({
    title,
    icon = '',
    textColor = 'text-blue-600',
    color = 'bg-blue-100'
}) {
    return (
        <div className={`${color} w-full py-2 flex items-center justify-center rounded-[32px]`}>
            <div className='flex gap-2'>
                <img src={icon} alt="family" />
                <Title 
                    title={title}
                    size='text-[14px]'
                    color={textColor}
                />
            </div>
        </div>
    )
}

Tag.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    textColor: PropTypes.string,
    color: PropTypes.string,
};
