// components/Checkbox.js
import PropTypes from 'prop-types';

export default function Checkbox({ value, checked, onChange, label, className = "" }) {
    return (
        <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
                className="form-checkbox h-4 w-4 text-brand-primary"
            />
            <span className="text-[14px]">{label}</span>
        </label>
    );
}

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
};