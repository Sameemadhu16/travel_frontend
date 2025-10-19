import { useCallback, useState, useEffect } from "react";
import { getAuth } from 'firebase/auth';
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import InputField from "../../../components/InputField";
import InputArea from "../../../components/InputArea";
import ImageUploader from "../../../components/ImageUploader";
import PrimaryButton from "../../../components/PrimaryButton";
import Breadcrumb from "../../../components/Breadcrumb";
import { handleSelect } from "../../../core/service";
import { formValidator } from "../../../core/validation";
import { showToastMessage } from "../../../utils/toastHelper";
import { navigateTo } from "../../../core/navigateHelper";
import Spinner from '../../../components/Spinner';
import { registerVehicleAgency } from '../../../api/vehicleAgencyService';
import { getUserByDocId } from '../../../api/userService';
import { app } from '../../../config/firebase';

const breadcrumbItems = [
    { label: "Vehicle Agency Choose", path: "/choose-vehicle-agency" },
    { label: "Vehicle Agency Register", path: "/vehicle-agency-registration" },
];

export default function VehicleAgencyRegistration() {
    const auth = getAuth(app);
    const [agencyImages, setAgencyImages] = useState([]);
    const [licenseImage, setLicenseImage] = useState([]);
    const [agencyImagesError, setAgencyImagesError] = useState('');
    const [licenseError, setLicenseError] = useState('');
    const [loading, setLoading] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [formData, setFormData] = useState({
        agencyName: '',
        street: '',
        city: '',
        district: '',
        province: '',
        registrationNo: '',
        licensePhoto: [],
        description: '',
        userDocId: '', // Firebase UID
    });
    const [error, setError] = useState({});

    // Fetch user email on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    showToastMessage('error', 'Please login to register a vehicle agency');
                    navigateTo('/login');
                    return;
                }

                // Get user data to display email
                const userData = await getUserByDocId(currentUser.uid);
                if (userData && userData.email) {
                    setUserEmail(userData.email);
                }

                // Set user doc ID in form data
                setFormData(prev => ({
                    ...prev,
                    userDocId: currentUser.uid
                }));
            } catch (error) {
                console.error('Error fetching user data:', error);
                showToastMessage('error', 'Failed to load user information');
            }
        };

        fetchUserData();
    }, [auth]);

    const handleSubmit = useCallback(async (e) => {
        try {
            e.preventDefault();
            setLoading(true);

            // Check authentication
            const currentUser = auth.currentUser;
            if (!currentUser) {
                showToastMessage('error', 'Please login to register a vehicle agency');
                navigateTo('/login');
                setLoading(false);
                return;
            }

            const submissionData = {
                ...formData,
                licensePhoto: licenseImage,
                images: agencyImages,
                userDocId: currentUser.uid
            };

            const customValidations = {
                licensePhoto: {
                    exactLength: 1,
                    message: '*Please add one business license photo'
                },
                images: {
                    minLength: 1,
                    message: '*Please add at least one agency image'
                }
            };

            const validator = formValidator(submissionData, [], customValidations);
            setError(validator);

            const hasValidationErrors = validator !== null || agencyImagesError.length > 0 || licenseError.length > 0;

            if (hasValidationErrors) {
                showToastMessage('error', 'Please correct the highlighted errors before submitting.');
                setLoading(false);
                return;
            }

            // Call backend API
            await registerVehicleAgency(submissionData);
            showToastMessage('success', 'Vehicle agency registration submitted successfully! Awaiting admin approval.');
            navigateTo('/vehicle-agency-pending');
        } catch (error) {
            console.error('Registration error:', error);
            if (error.status === 400) {
                showToastMessage('error', 'Invalid registration data. Please check all fields.');
            } else if (error.status === 409) {
                showToastMessage('error', 'A vehicle agency is already registered with this account.');
            } else {
                showToastMessage('error', 'Failed to register vehicle agency. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [formData, licenseImage, agencyImages, agencyImagesError.length, licenseError.length, auth]);

    return (
        <Main>
            <Breadcrumb items={breadcrumbItems} />
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Vehicle Agency Registration" size="text-[48px]" font="font-[600]" />

                {/* Admin Approval Notice */}
                <div className="bg-brand-light border border-brand-secondary rounded-lg p-4 w-full max-w-4xl mb-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                        <div>
                            <h4 className="font-semibold text-content-primary mb-1">Admin Approval Required</h4>
                            <p className="text-sm text-content-secondary">
                                Your vehicle agency registration will be reviewed by our admin team before approval. 
                                Please ensure all information is accurate and all required documents are uploaded.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Agency Info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title title="Agency Info:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Agency Name'
                                type='text'
                                name='agencyName'
                                value={formData.agencyName}
                                onChange={e => handleSelect(setFormData, 'agencyName', e.target.value)}
                                placeholder='Enter your agency name'
                                error={error?.errors?.agencyName}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Business Registration No'
                                type='text'
                                name='registrationNo'
                                value={formData.registrationNo}
                                onChange={e => handleSelect(setFormData, 'registrationNo', e.target.value)}
                                placeholder=''
                                error={error?.errors?.registrationNo}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Street'
                                type='text'
                                name='street'
                                value={formData.street}
                                onChange={e => handleSelect(setFormData, 'street', e.target.value)}
                                placeholder=''
                                error={error?.errors?.street}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='City'
                                type='text'
                                name='city'
                                value={formData.city}
                                onChange={e => handleSelect(setFormData, 'city', e.target.value)}
                                placeholder=''
                                error={error?.errors?.city}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='District'
                                type='text'
                                name='district'
                                value={formData.district}
                                onChange={e => handleSelect(setFormData, 'district', e.target.value)}
                                placeholder=''
                                error={error?.errors?.district}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Province'
                                type='text'
                                name='province'
                                value={formData.province}
                                onChange={e => handleSelect(setFormData, 'province', e.target.value)}
                                placeholder=''
                                error={error?.errors?.province}
                            />
                        </div>
                    </div>

                    {/* Email Display (Read-only from User Table) */}
                    <div className="w-1/2 mt-4">
                        <InputField
                            label='Contact Email'
                            type='email'
                            name='email'
                            value={userEmail}
                            disabled={true}
                            placeholder='Loading...'
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This email is from your account. To change it, please update your account settings.
                        </p>
                    </div>
                    
                </div>

                


                <div className="flex flex-col gap-2 w-full mt-10">

                    {/* License Photo */}
                    <div className="w-1/2 mt-4">
                        <ImageUploader
                            label={'Business Registration License Photo'}
                            images={licenseImage}
                            setImages={setLicenseImage}
                            error={error?.errors?.licensePhoto || licenseError}
                            setError={setLicenseError}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload a clear photo of your business registration license (Required: 1 image)
                        </p>
                    </div>
                    
                    {/* Agency Images */}
                    <div className="w-1/2 mt-4">
                        <ImageUploader
                            label={'Agency Images'}
                            images={agencyImages}
                            setImages={setAgencyImages}
                            multiple={true}
                            error={error?.errors?.images || agencyImagesError}
                            setError={setAgencyImagesError}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Upload photos of your agency office, facilities, and vehicles (Minimum: 1 image)
                        </p>
                    </div>

                    {/* Description */}
                    <div className="w-1/2 mt-4">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect(setFormData, 'description', e.target.value)}
                            placeholder='Provide details about your vehicle agency, services offered, fleet size, etc.'
                            error={error?.errors?.description}
                        />
                    </div>

                </div>
                

                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton text="Submit for Review" type={'submit'} />
                    </div>
                </div>
            </form>
            {
                loading && (
                    <Spinner />
                )
            }
        </Main>
    );
}
