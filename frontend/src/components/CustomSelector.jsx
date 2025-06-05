import { useState } from 'react';

export default function CustomSelector({ 
    options = [], 
    placeholder = 'Select an option', 
    onChange 
}) {
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
        if (onChange) {
        onChange(e.target.value);
        }
    };

    return (
        <div className="w-full max-w-sm">
            <select
                value={selected}
                onChange={handleChange}
                className="w-full p-2 cursor-pointer border border-gray-300 rounded-md text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
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
        </div>
    );
}
