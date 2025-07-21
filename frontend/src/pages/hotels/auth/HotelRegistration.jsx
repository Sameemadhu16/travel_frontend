import { useCallback, useMemo, useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import ImageUploader from "../../../components/ImageUploader";
import InputField from "../../../components/InputField";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { provinces, districts, cities } from "../../../core/Lists/location";
import { amenities, propertyTypes } from "../../../core/constant";
import InputArea from "../../../components/InputArea";
import PrimaryButton from "../../../components/PrimaryButton";
import { handleSelect, postRequest } from "../../../core/service";
import Checkbox from "../../../components/CheckBox";
import { formValidator } from "../../../core/validation";
import { showToastMessage } from "../../../utils/toastHelper";
import { navigateTo } from "../../../core/navigateHelper";
import Spinner from '../../../components/Spinner'
import Breadcrumb from "../../../components/Breadcrumb";

const breadcrumbItems = [
    { label: "Property Choose", path: "/choose-property" },
    { label: "Hotel Register", path: "/hotel-registration" },
];

export default function HotelRegistration() {
    const [licenseImage, setLicenseImage] = useState([]);
    const [hotelImages, setHotelImages] = useState([]);
    const [licenseError,setLicenseError] = useState('');
    const [hotelImagesError,setHotelImagesError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        hotelName: '',
        street: '',
        city: '',
        district: '',
        province: '',
        registrationNo: '',
        licensePhoto: [],
        images: [],
        type: '',
        description: '',
        amenities: [],
    });
    const [error,setError] = useState({});

    const filterDistricts = districts.filter(district => {
        const selectedCity = cities.find(city => city.value === formData.city);

        return selectedCity ? district.id === selectedCity.districtId : districts;
    });

    const filterProvince = provinces.filter(province => {
        const selectedDistrict = districts.find(district => district.value === formData.district);

        return selectedDistrict ? province.id === selectedDistrict.provinceId : provinces;
    });

    const handleAmenityChange = useCallback((amenityValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.amenities.includes(amenityValue);
            const updatedAmenities = alreadySelected
                ? prev.amenities.filter((item) => item !== amenityValue)
                : [...prev.amenities, amenityValue];

            return { ...prev, amenities: updatedAmenities };
        });
    }, []);


    const handleSubmit = useCallback( async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const submissionData = {
                ...formData,
                licensePhoto: licenseImage,
                images: hotelImages
            };

            const customValidations = {
                licensePhoto: {
                    exactLength: 1,
                    message: '*Please add one Business license photo'
                },
                images: {
                    exactLength: 5,
                    message: '*Exactly 5 images required'
                }
            };

            const validator = formValidator(submissionData,[],customValidations);
            setError(validator);
            
            const hasValidationErrors = validator !== null || hotelImagesError.length > 0 || licenseError.length > 0;

            if (hasValidationErrors) {
                showToastMessage('error', 'Please correct the highlighted errors before submitting.');
                setLoading(false);
                return;
            }
            // Call your API
            await postRequest("/api/hotels/register", submissionData);
            showToastMessage('success', 'Hotel registration submitted successfully!');
            navigateTo('/hotel-pending');

        } catch (error) {
                console.error( error);
            }finally {
                setLoading(false);
            }
        }, [formData, licenseImage, hotelImages, hotelImagesError.length, licenseError.length]);

    const amenityList = useMemo(()=>{
        return amenities.map((amenity) => {
            const Icon = amenity.icon;
            const isChecked = formData.amenities.includes(amenity.value);
            return (
            <div key={amenity.id} className="py-2">
                <label className="flex items-center gap-3 px-3">
                    <Checkbox
                        value={amenity.value}
                        checked={isChecked}
                        onChange={() => handleAmenityChange(amenity.value)}
                    />
                    <div className="flex items-center gap-2 flex-1">
                        <Icon className="h-5 w-5 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800">{amenity.value}</span>
                    </div>
                </label>
            </div>
            );
        })
    },[formData.amenities, handleAmenityChange]);

    return (
        <Main>
            <Breadcrumb
                items={breadcrumbItems} 
            />
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Hotel Registration" size="text-[48px]" font="font-[600]" />

                {/* Admin Approval Notice */}
                <div className="bg-brand-light border border-brand-secondary rounded-lg p-4 w-full max-w-4xl mb-6">
                    <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                        </svg>
                        <div>
                            <h4 className="font-semibold text-content-primary mb-1">Admin Approval Required</h4>
                            <p className="text-sm text-content-secondary">
                                Your hotel registration will be reviewed by our admin team before approval. 
                                Please ensure all information is accurate and all required documents are uploaded.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Account Info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title title="Account Info:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Hotel Name'
                                type='text'
                                name='hotelName'
                                value={formData.hotelName}
                                onChange={e => handleSelect(setFormData, 'hotelName', e.target.value)}
                                placeholder=''
                                error={error?.errors?.hotelName}
                            />
                        </div>
                    </div>
                </div>

                {/* Set Address */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Set Address:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='House No. & Street'
                                type='text'
                                name='street'
                                value={formData.street}
                                onChange={e => handleSelect(setFormData, 'street', e.target.value)}
                                placeholder=''
                                error={error?.errors?.street}
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomSelector
                                label="City"
                                options={cities}
                                placeholder="Select City"
                                onChange={value => handleSelect(setFormData, 'city', value)}
                                error={error?.errors?.city}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <CustomSelector
                                label="District"
                                options={filterDistricts}
                                placeholder="Select District"
                                onChange={value => handleSelect(setFormData, 'district', value)}
                                error={error?.errors?.district}
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomSelector
                                label="Province"
                                options={filterProvince}
                                placeholder="Select Province"
                                onChange={value => handleSelect(setFormData, 'province', value)}
                                error={error?.errors?.province}
                            />
                        </div>
                    </div>
                </div>

                {/* Business Info */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Business Info:" size="text-[24px]" />
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
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Business Registration License Photo'}
                            images={licenseImage}
                            setImages={setLicenseImage}
                            error={error?.errors?.licensePhoto || licenseError}
                            setError={setLicenseError}
                        />
                    </div>
                </div>

                {/* Hotel Info */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Hotel Info:" size="text-[24px]" />
                    <div className="w-1/2">
                        <CustomSelector
                            label="Hotel Type"
                            options={propertyTypes}
                            placeholder="Hotel Type"
                            onChange={value => handleSelect(setFormData, 'type', value)}
                            error={error?.errors?.type}
                        />
                    </div>
                    <div className="w-1/2">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect(setFormData, 'description', e.target.value)}
                            placeholder=''
                            error={error?.errors?.description}
                            warningHeading={'Important Note: Customize the **Heading** Text Here'}
                        />
                    </div>
                    <div className="mt-4">
                        <Title title="Amenities:" size="text-[16px]" />
                    </div>
                    <div className="w-full flex flex-wrap">
                        {amenityList}
                    </div>
                    {
                        error?.errors?.amenities && (
                            <p className="text-danger text-[16px] font-medium">{error?.errors?.description}</p>
                        )
                    }
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Hotel Images (*need to add 5 images)'}
                            images={hotelImages}
                            setImages={setHotelImages}
                            multiple={true}
                            error={error?.errors?.images || hotelImagesError}
                            setError={setHotelImagesError}
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
                    <Spinner/>
                )
            }
        </Main>
    );
}
