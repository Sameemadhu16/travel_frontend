import PropTypes from 'prop-types';

/**
 * @param {string} label - Label text displayed above the textarea.
 * @param {string} value - Current value of the textarea.
 * @param {Function} onChange - Callback for handling textarea value changes.
 * @param {string} placeholder - Placeholder for textarea.
 * @param {string} [error=""] - Optional error message displayed below the textarea.
 * @param {string} [warningHeading=""] - Optional warning heading (e.g. "**Heading**").
 * @returns {JSX.Element} InputArea component - A labeled textarea with error and warning heading display.
 */

export default function InputArea({
    label,
    value = '',
    onChange = () => {},
    placeholder = '',
    error = '',
    warningHeading = ''
}) {
    return (
        <div className="text-start mt-2">
            <label className="font-medium text-[16px]">
                {label}
            </label>
            <div className="relative w-full">
                <textarea
                    className={`border-2 w-full py-2 px-4 rounded-md resize-none min-h-[100px] ${
                        error ? 'border-danger' : 'border-b-2'
                    } focus:border-brand-primary focus:outline-none`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {warningHeading && (
                <div className="text-warning text-[16px]" dangerouslySetInnerHTML={{ __html: warningHeading }} />
            )}
            {error && <p className="text-danger text-[16px] font-medium">{error}</p>}
        </div>
    )
}

InputArea.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    warningHeading: PropTypes.string
};
