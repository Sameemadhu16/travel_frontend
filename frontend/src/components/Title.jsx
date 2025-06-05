import PropTypes from 'prop-types'

export default function Title({
    title,
    size = 'text-[32px]',
    font = 'font-[500]'
}) {
    return (
        <div>
            <h1 className={`text-black ${size} ${font}`}>{title}</h1>
        </div>
    )
}

Title.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    font: PropTypes.string
}
