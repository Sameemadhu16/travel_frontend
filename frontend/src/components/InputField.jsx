import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * @param {string} label - Label text displayed above the input field.
 * @param {string} type - HTML input type (e.g., "text", "password").
 * @param {string} value - Current value of the input field.
 * @param {Function} onChange - Callback for handling input value changes.
 * @param {string} placeholder - Placeholder for input.
 * @param {string} [error=""] - Optional error message displayed below the input.
 * @param {boolean} [icon=false] - Optional flag to show/hide the eye icon.
 * @returns {JSX.Element} InputField component - A labeled input with error display.
 */

const InputField = ({
    label,
    type = 'text',
    value = '',
    onChange = () => {},
    placeholder = '',
    error = '',
    icon = false
}) => {

    const [visibility, setVisibility] = useState(false);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }

    return (
        <div className="text-start ">
            <label className="font-medium text-[16px]">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    type={visibility ? "text" : type}
                    className={`border-2 w-full py-2 px-4 rounded-md ${
                        error ? 'border-danger' : 'border-b-2'
                    } focus:border-brand-primary focus:outline-none`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    min={0}
                />
                {icon && type === 'password' && (
                <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={toggleVisibility}>
                    {visibility ? <FaEye className='text-gray-400'/> : <FaEyeSlash className='text-gray-400'/>}
                </div>
                )}
            </div>
            {error && <p className="text-danger text-[16px] font-medium">{error}</p>}
        </div>
    );
};

// Remove defaultProps here
InputField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    icon: PropTypes.bool
};

export default InputField;
