import { useState } from 'react';
import PropTypes from 'prop-types';

// PropTypes style reference: see InputField.jsx for detailed prop documentation

export default function CustomSelector({ 
    options = [], 
    label = '',
    placeholder = 'Select an option', 
    onChange ,
    error = ''
}) {
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
        if (onChange) {
        onChange(e.target.value);
        }
    };

    return (
        <div className="w-full">
            {
                label.length > 0 && (
                        <label className="font-medium text-[16px]">
                            {label}
                        </label>
                )
            }
            <select
                value={selected}
                onChange={handleChange}
                className={`border-2 w-full p-2 cursor-pointer rounded-md text-gray-700 bg-white ${
                        error ? 'border-danger' : 'border-b-2'
                    } focus:border-brand-primary focus:outline-none`}
            >
                <option className='cursor-pointer' value="" disabled>
                {placeholder}
                </option>
                {options.map((option) => (
                <option key={option.id} value={option.value}>
                    {option.value}
                </option>
                ))}
            </select>
            {error && <p className="text-danger text-[16px] font-medium">{error}</p>}
        </div>
    );
}

// PropTypes reference: see InputField for style
CustomSelector.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
};
