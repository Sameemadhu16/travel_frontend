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

export default function PrimaryButton({
    text,
    type = "button",
    onClick,
    isDisabled = false,
    textColor = "#ffffff",
    className = "",
    image = ""
}) {
    return (
        <button
            type={type}
            className={`w-full text-[20px] px-4 py-2 rounded-md hover:opacity-95 bg-brand-primary ${className}`}
            style={{
                color: isDisabled ? "#a9a9a9" : textColor, 
                cursor: isDisabled ? "not-allowed" : "pointer",
            }}
            onClick={!isDisabled ? onClick : undefined}
            disabled={isDisabled}
            > 
            {image && <img src={image} alt="" className="inline-block mr-2" />}
            {text}
        </button>
    )
}

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    bgColor: PropTypes.string,
    textColor: PropTypes.string,
    className: PropTypes.string,
    image: PropTypes.string
}
