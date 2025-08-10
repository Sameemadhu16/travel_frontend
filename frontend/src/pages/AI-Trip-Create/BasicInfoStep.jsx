import InputField from '../../components/InputField';
import Main from '../../components/Main';
import CustomSelector from '../../components/CustomSelector';
import StepIndicator from '../../components/StepIndicator';
import { useCallback, useContext, useState } from 'react';
import { navigateTo } from '../../core/navigateHelper';
import FormContext from '../../context/InitialValues';
import { formValidator } from '../../core/validation';
import ButtonContainer from './components/ButtonContainer';

const durationOptions = [
    { id: "", value: "Select duration" },
    { id: "1", value: "1 Day" },
    { id: "2", value: "2 Days" },
    { id: "3", value: "3 Days" },
    { id: "4", value: "4 Days" },
    { id: "5", value: "5 Days" },
    { id: "7", value: "1 Week" },
    { id: "10", value: "10 Days" },
    { id: "14", value: "2 Weeks" }
];

const budgetOptions = [
    { id:"", value: "Select Budget"},
    { id:"Budget (Under $50/day)", value: "Budget (Under $50/day)"},
    { id:"Mid-range ($50-150/day)", value: "Mid-range ($50-150/day)"},
    { id:"Luxury ($150+/day)", value: "Luxury ($150+/day)"},
];

export default function BasicInfoStep() {
    const { formData, setFormData } = useContext(FormContext);
    const [error, setError] = useState('');

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleBack = useCallback(() => {
        navigateTo('/')
    })

    const handleNext = useCallback(() => {
        const errors = formValidator(formData, ['destination', 'duration', 'adults', 'children', 'startDate'], {});
        setError(errors?.message);
        if(errors === null){
            navigateTo('/ai-trip/preference-info')
        }
    },[formData])

    return (
        <Main>
            <StepIndicator currentStep={1} />
            <div className="space-y-6">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-content-primary mb-2">Let's Plan Your Perfect Trip</h2>
                    <p className="text-content-secondary">Tell us about your travel preferences and we'll create a personalized itinerary</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                        label="Where would you like to go?"
                        type="text"
                        value={formData.destination}
                        onChange={(e) => handleChange('destination', e.target.value)}
                        placeholder="e.g., Colombo, Kandy, Galle"
                    />

                    <CustomSelector 
                        value={formData.duration}
                        onChange={(value) => handleChange('duration', value)} 
                        label='Trip Duration' 
                        options={durationOptions}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                        label="Number of Adults"
                        type="number"
                        value={formData.adults}
                        onChange={(e) => handleChange('adults', e.target.value)}
                        min="0"
                        placeholder="0"
                    />

                    <InputField
                        label="Number of Children"
                        type="number"
                        value={formData.children}
                        onChange={(e) => handleChange('children', e.target.value)}
                        min="0"
                        placeholder="0"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <InputField
                        label="Start Date"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleChange('startDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />

                    <CustomSelector 
                        value={formData.budget}
                        onChange={(value) => handleChange('budget', value)}
                        label='Budget Range (Optional)'
                        options={budgetOptions}
                    />
                </div>
            </div>
            {
                error && (
                    <p className='text-danger text-[16px] mt-5'>*All field are required</p>
                )
            }
            <ButtonContainer handleNext={handleNext} handleBack={handleBack}/>
        </Main>
    );
}



