import { useNavigate } from 'react-router-dom';
import TravelDetails from './components/TravelDetails';
import ContactInformation from './components/ContactInformation';
import Main from '../../components/Main';


export default function CreateTour() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/');
    };
    const handleNext = (e) => {
        e.preventDefault();
        navigate('/tour/select-guide');
    };


    return (
        <Main>
            {/* Main Content */}
            <div className="max-w-4xl mx-auto py-8 px-2">
                <h2 className="text-2xl font-bold mb-2 text-content-primary">Create a new tour</h2>
                {/* <Stepper /> */}
                <form className="flex flex-col gap-8 mt-6" onSubmit={handleNext}>
                    <TravelDetails setValid={setValidateTravelDetails}/>
                    <ContactInformation setValid={setValidateContactInfo}/>
                    <div className="flex justify-between mt-4">
                        <button 
                            type="button" 
                            onClick={handleBack}
                            className="px-8 py-2 rounded border border-brand-primary text-brand-primary font-semibold bg-white hover:bg-brand-accent transition"
                        >
                            Back
                        </button>
                        <button type="submit" className="px-10 py-2 rounded bg-brand-primary text-white font-semibold flex items-center gap-2 hover:bg-brand-secondary transition">
                            Next
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Main>
    );
}
