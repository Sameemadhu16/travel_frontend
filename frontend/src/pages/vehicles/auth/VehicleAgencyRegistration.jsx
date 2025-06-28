import { useCallback, useState } from "react";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import InputField from "../../../components/InputField";
import InputArea from "../../../components/InputArea";
import ImageUploader from "../../../components/ImageUploader";
import PrimaryButton from "../../../components/PrimaryButton";
import Breadcrumb from "../../../components/Breadcrumb";
import { handleSelect, postRequest } from "../../../core/service";
import { formValidator } from "../../../core/validation";
import { showToastMessage } from "../../../utils/toastHelper";
import { navigateTo } from "../../../core/navigateHelper";
import Spinner from '../../../components/Spinner';

const breadcrumbItems = [
    { label: "Vehicle Agency Choose", path: "/choose-vehicle-agency" },
    { label: "Vehicle Agency Register", path: "/vehicle-agency-registration" },
];

export default function VehicleAgencyRegistration() {
    const [agencyImages, setAgencyImages] = useState([]);
    const [licenseImage, setLicenseImage] = useState([]);
    const [agencyImagesError, setAgencyImagesError] = useState('');
    const [licenseError, setLicenseError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        district: '',
        province: '',
        registrationNo: '',
        licensePhoto: [],
        images: [],
        description: '',
        createdAt: '',
    });
    const [error, setError] = useState({});

    const handleSubmit = useCallback(async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const submissionData = {
                ...formData,
                licensePhoto: licenseImage,
                images: agencyImages
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
            // Call your API
            await postRequest("/api/vehicle-agency/register", submissionData);
            showToastMessage('success', 'Vehicle agency registered successfully!');
            navigateTo('/partner-details');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [formData, licenseImage, agencyImages, agencyImagesError.length, licenseError.length]);

    return (
        <Main>
            <Breadcrumb items={breadcrumbItems} />
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Vehicle Agency Registration" size="text-[48px]" font="font-[600]" />

                {/* Agency Info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title title="Agency Info:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Agency Name'
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={e => handleSelect(setFormData, 'name', e.target.value)}
                                placeholder=''
                                error={error?.errors?.name}
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
                    </div>

                    {/* Description */}
                    <div className="w-1/2 mt-4">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect(setFormData, 'description', e.target.value)}
                            placeholder=''
                            error={error?.errors?.description}
                            warningHeading={'Important Note: Customize the **Heading** Text Here'}
                        />
                    </div>

                </div>
                

                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton text="Register" type={'submit'} />
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
