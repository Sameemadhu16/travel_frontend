/* eslint-disable react/prop-types */
import { FaRobot } from 'react-icons/fa';
import InputField from '../../components/InputField';

export default function BasicInfoStep({ formData, setFormData, errors, setErrors }) {
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent rounded-full mb-4">
                    <FaRobot className="text-brand-primary text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-2">Let&#39;s Plan Your Perfect Trip</h2>
                <p className="text-content-secondary">Tell us about your travel preferences and we&#39;ll create a personalized itinerary</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField
                    label="Where would you like to go?"
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                    placeholder="e.g., Colombo, Kandy, Galle"
                    error={errors.destination}
                />

                <div className="space-y-2">
                    <label className="font-medium text-[16px] text-content-primary">Trip Duration</label>
                    <select
                        className="border-2 w-full py-2 px-4 rounded-md border-border-light focus:border-brand-primary focus:outline-none bg-white"
                        value={formData.duration}
                        onChange={(e) => handleChange('duration', e.target.value)}
                    >
                        <option value="">Select duration</option>
                        <option value="1">1 Day</option>
                        <option value="2">2 Days</option>
                        <option value="3">3 Days</option>
                        <option value="4">4 Days</option>
                        <option value="5">5 Days</option>
                        <option value="7">1 Week</option>
                        <option value="10">10 Days</option>
                        <option value="14">2 Weeks</option>
                    </select>
                    {errors.duration && <p className="text-danger text-[16px] font-medium">{errors.duration}</p>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <InputField
                    label="Number of Adults"
                    type="number"
                    value={formData.adults}
                    onChange={(e) => handleChange('adults', parseInt(e.target.value) || 0)}
                    placeholder="0"
                    error={errors.adults}
                />

                <InputField
                    label="Number of Children"
                    type="number"
                    value={formData.children}
                    onChange={(e) => handleChange('children', parseInt(e.target.value) || 0)}
                    placeholder="0"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="font-medium text-[16px] text-content-primary">Start Date</label>
                    <input
                        type="date"
                        className="border-2 w-full py-2 px-4 rounded-md border-border-light focus:border-brand-primary focus:outline-none bg-white"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-medium text-[16px] text-content-primary">Budget Range (Optional)</label>
                    <select 
                        className="border-2 w-full py-2 px-4 rounded-md border-border-light focus:border-brand-primary focus:outline-none bg-white"
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                    >
                        <option value="">Select budget</option>
                        <option value="budget">Budget (Under $50/day)</option>
                        <option value="mid-range">Mid-range ($50-150/day)</option>
                        <option value="luxury">Luxury ($150+/day)</option>
                    </select>
                </div>
            </div>
        </div>
    );
}



