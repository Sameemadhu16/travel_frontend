import { useCallback, useMemo, useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import ImageUploader from "../../../components/ImageUploader";
import InputField from "../../../components/InputField";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { vehicleAmenities, vehiclePropertyTypes } from "../../../core/constant";
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
    { label: "Vehicle Choose", path: "/choose-vehicle" },
    { label: "Vehicle Register", path: "/vehicle-registration" },
];

export default function VehicleRegistration() {
    const [vehicleImages, setVehicleImages] = useState([]);
    const [vehicleImagesError, setVehicleImagesError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: '',
        vehicleNo: '',
        registrationNo: '',
        pricePerKilometer: '',
        images: [],
        amenities: [],
        capacity: '',
        availability: true,
        createdAt: '',
        vehicle_model: '',
        insurance_expiry: '',
        vehicle_insurance_number: '',
        basePrice: '',
        description: '',
    });
    const [error, setError] = useState({});
    const [insuranceImages, setInsuranceImages] = useState([]);
    const [insuranceImagesError, setInsuranceImagesError] = useState('');

    const handleAmenityChange = useCallback((amenityValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.amenities.includes(amenityValue);
            const updatedAmenities = alreadySelected
                ? prev.amenities.filter((item) => item !== amenityValue)
                : [...prev.amenities, amenityValue];

            return { ...prev, amenities: updatedAmenities };
        });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const submissionData = {
                ...formData,
                images: vehicleImages,
                insurancePhotos: insuranceImages
            };

            const customValidations = {
                images: {
                    exactLength: 5,
                    message: '*Exactly 5 images required'
                },
                insurancePhotos: {
                    exactLength: 2,
                    message: '*Exactly 2 insurance photos required'
                }
            };

            const validator = formValidator(submissionData, [], customValidations);
            setError(validator);

            const hasValidationErrors = validator !== null || vehicleImagesError.length > 0 || insuranceImagesError.length > 0;

            if (hasValidationErrors) {
                showToastMessage('error', 'Please correct the highlighted errors before submitting.');
                setLoading(false);
                return;
            }
            // Call your API
            await postRequest("/api/vehicles/register", submissionData);
            showToastMessage('success', 'Vehicle registered successfully!');
            navigateTo('/partner-details');

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [formData, vehicleImages, vehicleImagesError.length, insuranceImages, insuranceImagesError.length]);

    const amenityList = useMemo(() => {
        return vehicleAmenities.map((amenity) => {
            const isChecked = formData.amenities.includes(amenity.value);
            const Icon = amenity.icon;
            return (
                <div key={amenity.id} className="py-2">
                    <label className="flex items-center gap-3 px-3">
                        <Checkbox
                            value={amenity.value}
                            checked={isChecked}
                            onChange={() => handleAmenityChange(amenity.value)}
                        />
                        <div className="flex items-center gap-2 flex-1">
                            {Icon && <Icon className="h-5 w-5 text-gray-600 flex-shrink-0" />}
                            <span className="text-gray-800">{amenity.value}</span>
                        </div>
                    </label>
                </div>
            );
        })
    }, [formData.amenities, handleAmenityChange]);

    return (
        <Main>
            <Breadcrumb items={breadcrumbItems} />
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Vehicle Registration" size="text-[48px]" font="font-[600]" />

                {/* Vehicle Info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title title="Vehicle Info:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <CustomSelector
                                label="Vehicle Type"
                                options={vehiclePropertyTypes}
                                placeholder="Select Vehicle Type"
                                onChange={value => handleSelect(setFormData, 'type', value)}
                                error={error?.errors?.type}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Vehicle Number'
                                type='text'
                                name='vehicleNo'
                                value={formData.vehicleNo}
                                onChange={e => handleSelect(setFormData, 'vehicleNo', e.target.value)}
                                placeholder=''
                                error={error?.errors?.vehicleNo}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Registration Number'
                                type='text'
                                name='registrationNo'
                                value={formData.registrationNo}
                                onChange={e => handleSelect(setFormData, 'registrationNo', e.target.value)}
                                placeholder=''
                                error={error?.errors?.registrationNo}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Vehicle Model'
                                type='text'
                                name='vehicle_model'
                                value={formData.vehicle_model}
                                onChange={e => handleSelect(setFormData, 'vehicle_model', e.target.value)}
                                placeholder=''
                                error={error?.errors?.vehicle_model}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Capacity'
                                type='number'
                                name='capacity'
                                value={formData.capacity}
                                onChange={e => handleSelect(setFormData, 'capacity', e.target.value)}
                                placeholder=''
                                error={error?.errors?.capacity}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Base Price (LKR)'
                                type='number'
                                name='basePrice'
                                value={formData.basePrice}
                                onChange={e => handleSelect(setFormData, 'basePrice', e.target.value)}
                                placeholder=''
                                error={error?.errors?.basePrice}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Price Per Kilometer (LKR)'
                                type='number'
                                name='pricePerKilometer'
                                value={formData.pricePerKilometer}
                                onChange={e => handleSelect(setFormData, 'pricePerKilometer', e.target.value)}
                                placeholder=''
                                error={error?.errors?.pricePerKilometer}
                            />
                        </div>

                        
                        
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Amenities:" size="text-[16px]" />
                    <div className="w-full flex flex-wrap">
                        {amenityList}
                    </div>
                    {
                        error?.errors?.amenities && (
                            <p className="text-danger text-[16px] font-medium">{error?.errors?.amenities}</p>
                        )
                    }
                </div>

                <div className="flex flex-col gap-2 w-full mt-10">
                    {/* Images */}
                    <div className="flex w-full mt-2">
                        <div className="w-1/2">
                            <ImageUploader
                                label={'Vehicle Images (*need to add 5 images)'}
                                images={vehicleImages}
                                setImages={setVehicleImages}
                                multiple={true}
                                error={error?.errors?.images || vehicleImagesError}
                                setError={setVehicleImagesError}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex w-full mt-4">
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
                    </div>

                </div>


                {/* Insurance Info */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title title="Insurance Info:" size="text-[24px]" />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Insurance Number'
                                type='text'
                                name='vehicle_insurance_number'
                                value={formData.vehicle_insurance_number}
                                onChange={e => handleSelect(setFormData, 'vehicle_insurance_number', e.target.value)}
                                placeholder=''
                                error={error?.errors?.vehicle_insurance_number}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Insurance Expiry Date'
                                type='date'
                                name='insurance_expiry'
                                value={formData.insurance_expiry}
                                onChange={e => handleSelect(setFormData, 'insurance_expiry', e.target.value)}
                                placeholder=''
                                error={error?.errors?.insurance_expiry}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Insurance Photos (*need to add 2 images)'
                            }
                            images={insuranceImages}
                            setImages={setInsuranceImages}
                            multiple={true}
                            error={error?.errors?.insurancePhotos || insuranceImagesError}
                            setError={setInsuranceImagesError}
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
