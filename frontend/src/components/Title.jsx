import PropTypes from 'prop-types'

export default function Title({
    title,
}) {
    return (
        <div>
            <h1 className='text-black text-[32px] font-semibold'>{title}</h1>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
}
