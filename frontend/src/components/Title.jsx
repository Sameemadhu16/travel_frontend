import PropTypes from 'prop-types'

export default function Title({
    title,
    size = 'text-[32px]',
    font = 'font-[500]',
    color = 'text-black',
}) {
    return (
        <div>
            <h1 className={`${color} ${size} ${font}`}>{title}</h1>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    font: PropTypes.string,
    color: PropTypes.string
}
