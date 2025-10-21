import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import CustomSelector from "../../../components/CustomSelector";
import ImageUploader from "../../../components/ImageUploader";
import InputField from "../../../components/InputField";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import InputArea from "../../../components/InputArea";
import PrimaryButton from "../../../components/PrimaryButton";
import { handleSelect, postRequest } from "../../../core/service";
import Checkbox from "../../../components/CheckBox";
import { formValidator } from "../../../core/validation";
import { showToastMessage } from "../../../utils/toastHelper";
import { navigateTo } from "../../../core/navigateHelper";
import Spinner from '../../../components/Spinner';
import Breadcrumb from "../../../components/Breadcrumb";

const breadcrumbItems = [
    { label: "Property Choose", path: "/choose-property" },
    { label: "Guide Register", path: "/guide-registration" },
];

// Guide specializations
const specializations = [
    { id: 1, value: "Cultural Heritage", icon: "🏛️" },
    { id: 2, value: "Wildlife Safari", icon: "🦁" },
    { id: 3, value: "Adventure Tourism", icon: "🏔️" },
    { id: 4, value: "Beach & Water Sports", icon: "🏖️" },
    { id: 5, value: "Religious Sites", icon: "🕌" },
    { id: 6, value: "Tea Plantation Tours", icon: "🍃" },
    { id: 7, value: "Historical Sites", icon: "🏰" },
    { id: 8, value: "Nature & Trekking", icon: "🌲" },
    { id: 9, value: "Photography Tours", icon: "📸" },
    { id: 10, value: "Culinary Tours", icon: "🍛" },
    { id: 11, value: "Ayurveda & Wellness", icon: "🧘" },
    { id: 12, value: "Gem Mining Tours", icon: "💎" }
];

// Languages
const languages = [
    { id: 1, value: "English", label: "English" },
    { id: 2, value: "Sinhala", label: "Sinhala" },
    { id: 3, value: "Tamil", label: "Tamil" },
    { id: 4, value: "German", label: "German" },
    { id: 5, value: "French", label: "French" },
    { id: 6, value: "Spanish", label: "Spanish" },
    { id: 7, value: "Italian", label: "Italian" },
    { id: 8, value: "Russian", label: "Russian" },
    { id: 9, value: "Chinese", label: "Chinese (Mandarin)" },
    { id: 10, value: "Japanese", label: "Japanese" },
    { id: 11, value: "Korean", label: "Korean" },
    { id: 12, value: "Hindi", label: "Hindi" },
    { id: 13, value: "Arabic", label: "Arabic" },
    { id: 14, value: "Dutch", label: "Dutch" },
    { id: 15, value: "Portuguese", label: "Portuguese" }
];

// Experience years options
const experienceYears = [
    { id: 1, value: 1, label: "1 Year" },
    { id: 2, value: 2, label: "2 Years" },
    { id: 3, value: 3, label: "3 Years" },
    { id: 4, value: 4, label: "4 Years" },
    { id: 5, value: 5, label: "5 Years" },
    { id: 6, value: 8, label: "6-10 Years" },
    { id: 7, value: 13, label: "11-15 Years" },
    { id: 8, value: 18, label: "16-20 Years" },
    { id: 9, value: 25, label: "20+ Years" }
];

export default function GuideRegister() {
    const { user } = useSelector((state) => state.auth);
    const [sltaLicenseImages, setSltaLicenseImages] = useState([]);
    const [nicFrontImages, setNicFrontImages] = useState([]);
    const [nicBackImages, setNicBackImages] = useState([]);
    const [sltaError, setSltaError] = useState('');
    const [nicFrontError, setNicFrontError] = useState('');
    const [nicBackError, setNicBackError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        bio: '',
        languagesSpoken: [],
        specialization: [],
        experienceYears: '',
        hoursRate: '',
        sltaLicenseId: '',
        sltaLicensePhoto: [],
        sltaLicenseExpiry: '',
        nicNumber: '',
        nicPhotoFront: [],
        nicPhotoBack: [],
    });
    const [error, setError] = useState({});

    const handleLanguageChange = useCallback((languageValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.languagesSpoken.includes(languageValue);
            const updatedLanguages = alreadySelected
                ? prev.languagesSpoken.filter((item) => item !== languageValue)
                : [...prev.languagesSpoken, languageValue];

            return { ...prev, languagesSpoken: updatedLanguages };
        });
    }, []);

    const handleSpecializationChange = useCallback((specializationValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.specialization.includes(specializationValue);
            const updatedSpecializations = alreadySelected
                ? prev.specialization.filter((item) => item !== specializationValue)
                : [...prev.specialization, specializationValue];

            return { ...prev, specialization: updatedSpecializations };
        });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const submissionData = {
                ...formData,
                userId: user?.data?.id, // Add user ID
                sltaLicensePhoto: sltaLicenseImages,
                nicPhotoFront: nicFrontImages,
                nicPhotoBack: nicBackImages,
                hoursRate: parseFloat(formData.hoursRate),
                experienceYears: parseInt(formData.experienceYears),
                sltaLicenseExpiry: formData.sltaLicenseExpiry ? new Date(formData.sltaLicenseExpiry).toISOString() : null
            };

            const customValidations = {
                sltaLicensePhoto: {
                    exactLength: 1,
                    message: '*Please add one SLTA license photo'
                },
                nicPhotoFront: {
                    exactLength: 1,
                    message: '*Please add NIC front photo'
                },
                nicPhotoBack: {
                    exactLength: 1,
                    message: '*Please add NIC back photo'
                },
                languagesSpoken: {
                    minLength: 1,
                    message: '*Please select at least one language'
                },
                specialization: {
                    minLength: 1,
                    message: '*Please select at least one specialization'
                }
            };

            const validator = formValidator(submissionData, [], customValidations);
            setError(validator);
            
            const hasValidationErrors = validator !== null || sltaError.length > 0 || 
                                     nicFrontError.length > 0 || nicBackError.length > 0;

            if (hasValidationErrors) {
                showToastMessage('error', 'Please correct the highlighted errors before submitting.');
                setLoading(false);
                return;
            }

            // Call your API
            await postRequest("/api/guides", submissionData);
            showToastMessage('success', 'Guide registration submitted successfully!');
            navigateTo('/guide-pending');

        } catch (error) {
            console.error(error);
            showToastMessage('error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [formData, sltaLicenseImages, nicFrontImages, nicBackImages, sltaError, nicFrontError, nicBackError, user]);

    const languageList = useMemo(() => {
        return languages.map((language) => {
            const isChecked = formData.languagesSpoken.includes(language.value);
            return (
                <div key={language.id} className="py-2">
                    <label className="flex items-center gap-3 px-3">
                        <Checkbox
                            value={language.value}
                            checked={isChecked}
                            onChange={() => handleLanguageChange(language.value)}
                        />
                        <span className="text-gray-800">{language.label}</span>
                    </label>
                </div>
            );
        });
    }, [formData.languagesSpoken, handleLanguageChange]);

    const specializationList = useMemo(() => {
        return specializations.map((spec) => {
            const isChecked = formData.specialization.includes(spec.value);
            return (
                <div key={spec.id} className="py-2">
                    <label className="flex items-center gap-3 px-3">
                        <Checkbox
                            value={spec.value}
                            checked={isChecked}
                            onChange={() => handleSpecializationChange(spec.value)}
                        />
                        <div className="flex items-center gap-2 flex-1">
                            <span className="text-lg">{spec.icon}</span>
                            <span className="text-gray-800">{spec.value}</span>
                        </div>
                    </label>
                </div>
            );
        });
    }, [formData.specialization, handleSpecializationChange]);

    return (
        <Main>
            <Breadcrumb items={breadcrumbItems} />
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Guide Registration" size="text-[48px]" font="font-[600]" />
                
                {/* Admin Review Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Admin Approval Required</h3>
                            <p className="text-sm text-blue-700">Your application will be reviewed by our admin team before activation. Please ensure all information is accurate.</p>
                        </div>
                    </div>
                </div>

                {/* Personal Info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title title="Personal Information:" size="text-[24px]" />
                    <div className="w-full">
                        <InputArea
                            label='Bio / Introduction'
                            value={formData.bio}
                            onChange={e => handleSelect(setFormData, 'bio', e.target.value)}
                            placeholder='Write a compelling introduction about yourself as a tour guide...'
                            error={error?.errors?.bio}
                            warningHeading={'Tip: Highlight your passion for tourism, local knowledge, and what makes you unique!'}
                        />
                    </div>
                </div>

                {/* Languages & Specializations */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Languages & Specializations:" size="text-[24px]" />
                    
                    <div className="mt-4">
                        <Title title="Languages Spoken:" size="text-[16px]" />
                        <div className="w-full flex flex-wrap bg-gray-50 rounded-lg p-4 mt-2">
                            {languageList}
                        </div>
                        {error?.errors?.languagesSpoken && (
                            <p className="text-danger text-[16px] font-medium mt-1">{error?.errors?.languagesSpoken}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <Title title="Specializations:" size="text-[16px]" />
                        <div className="w-full flex flex-wrap bg-gray-50 rounded-lg p-4 mt-2">
                            {specializationList}
                        </div>
                        {error?.errors?.specialization && (
                            <p className="text-danger text-[16px] font-medium mt-1">{error?.errors?.specialization}</p>
                        )}
                    </div>
                </div>

                {/* Experience & Rates */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Experience & Rates:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <CustomSelector
                                label="Years of Experience"
                                options={experienceYears}
                                placeholder="Select Experience"
                                onChange={value => handleSelect(setFormData, 'experienceYears', value)}
                                error={error?.errors?.experienceYears}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Hourly Rate (USD)'
                                type='number'
                                name='hoursRate'
                                value={formData.hoursRate}
                                onChange={e => handleSelect(setFormData, 'hoursRate', e.target.value)}
                                placeholder='25.00'
                                error={error?.errors?.hoursRate}
                            />
                        </div>
                    </div>
                </div>

                {/* SLTA License Info */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="SLTA License Information:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='SLTA License ID'
                                type='text'
                                name='sltaLicenseId'
                                value={formData.sltaLicenseId}
                                onChange={e => handleSelect(setFormData, 'sltaLicenseId', e.target.value)}
                                placeholder='SL-XXXX-XXXX'
                                error={error?.errors?.sltaLicenseId}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='License Expiry Date'
                                type='date'
                                name='sltaLicenseExpiry'
                                value={formData.sltaLicenseExpiry}
                                onChange={e => handleSelect(setFormData, 'sltaLicenseExpiry', e.target.value)}
                                placeholder=''
                                error={error?.errors?.sltaLicenseExpiry}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'SLTA License Photo'}
                            images={sltaLicenseImages}
                            setImages={setSltaLicenseImages}
                            error={error?.errors?.sltaLicensePhoto || sltaError}
                            setError={setSltaError}
                        />
                    </div>
                </div>

                {/* NIC Information */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="National Identity Card:" size="text-[24px]" />
                    <div className="w-1/2">
                        <InputField
                            label='NIC Number'
                            type='text'
                            name='nicNumber'
                            value={formData.nicNumber}
                            onChange={e => handleSelect(setFormData, 'nicNumber', e.target.value)}
                            placeholder='123456789V or 199912345678'
                            error={error?.errors?.nicNumber}
                        />
                    </div>
                    
                    <div className="flex w-full gap-4 mt-4">
                        <div className="w-1/2">
                            <ImageUploader
                                label={'NIC Front Photo'}
                                images={nicFrontImages}
                                setImages={setNicFrontImages}
                                error={error?.errors?.nicPhotoFront || nicFrontError}
                                setError={setNicFrontError}
                            />
                        </div>
                        <div className="w-1/2">
                            <ImageUploader
                                label={'NIC Back Photo'}
                                images={nicBackImages}
                                setImages={setNicBackImages}
                                error={error?.errors?.nicPhotoBack || nicBackError}
                                setError={setNicBackError}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton text="Submit for Review" type={'submit'} />
                    </div>
                </div>
            </form>
            {loading && <Spinner />}
        </Main>
    );
}
