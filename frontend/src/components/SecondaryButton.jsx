import PropTypes from "prop-types";


/**
 * CustomButton - A reusable button component with dynamic styling and functionality.
 *
 * @param {string} text - The button text to be displayed.
 * @param {string} [type="button"] - The button type (e.g., "button", "submit", "reset").
 * @param {Function} [onClick] - Callback function to handle button clicks.
 * @param {boolean} [isDisabled=false] - Whether the button is disabled or not.
 * @param {string} [bgColor=colors.primaryColor] - Background color of the button.
 * @param {string} [textColor="#ffffff"] - Text color of the button.
 * @param {string} [className=""] - Additional custom CSS classes for the button.
 * @returns {JSX.Element} CustomButton - A stylized button component with hover and disabled states.
 */

export default function SecondaryButton({
    text,
    type = "button",
    onClick,
    textColor = "text-brand-primary",
    className = "",
    image = ""
}) {
    return (
        <button
            type={type}
            className={`w-full text-[20px] px-4 py-2 rounded-md hover:bg-brand-accent 
                    bg-transparent border text-brand-primary  border-brand-primary ${className}`}
            onClick={onClick}
            > 
            {image && <img src={image} alt="" className="inline-block mr-2" />}
            {text}
        </button>
    )
}

SecondaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string
}
