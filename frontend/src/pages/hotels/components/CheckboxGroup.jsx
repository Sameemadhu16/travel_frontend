import { useMemo } from "react";
import Title from "../../../components/Title";
import PropTypes from 'prop-types';

export default function CheckboxGroup({ title, options = [], selected = [], onChange }) {
    
    const handleChange = (value) => {
        if (selected.includes(value)) {
        onChange(selected.filter(item => item !== value));
        } else {
        onChange([...selected, value]);
        }
    };

    const optionsMap = useMemo(()=>{
        return options.map((option) => (
        <label key={option.id} className="flex items-center gap-2 cursor-pointer">
            <input
            type="checkbox"
            value={option.value}
            checked={selected.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="form-checkbox h-4 w-4 text-brand-primary"
            />
            <span className="text-sm">{option.value}</span>
        </label>
        ))
    },[options, selected]);

    return (
        <div className="">
            <Title
                title={title}
                size='text-[16px]'
                font='font-[500]'
            />
            <div className="flex flex-col gap-2 mt-2">
                { optionsMap }
            </div>
        </div>
    );
}

CheckboxGroup.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            value: PropTypes.string.isRequired,
        })
    ),
    selected: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
};
