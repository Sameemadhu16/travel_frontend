import { useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import ImageUploader from "../../../components/ImageUploader";
import InputField from "../../../components/InputField";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { provinces, districts, cities } from "../../../core/location";
import { propertyTypes } from "../../../core/constant";
import InputArea from "../../../components/InputArea";
import PrimaryButton from "../../../components/PrimaryButton";

export default function HotelRegistration() {
    const [licenseImage, setLicenseImage] = useState([]);
    const [hotelImages, setHotelImages] = useState([]);

    const [formData, setFormData] = useState({
        hotelName: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '',
        city: '',
        district: '',
        province: '',
        registrationNo: '',
        licensePhoto: [],
        images: [],
        type: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelect = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            licensePhoto: licenseImage,
            images: hotelImages
        };
        console.log(submissionData);
    };

    return (
        <Main>
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title title="Hotel Registration" size="text-[48px]" font="font-[600]" />

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
                                onChange={e => handleSelect('hotelName', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Email'
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={e => handleSelect('email', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Password'
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={e => handleSelect('password', e.target.value)}
                                placeholder=''
                                error=''
                                icon={true}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Confirm Password'
                                type='password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={e => handleSelect('confirmPassword', e.target.value)}
                                placeholder=''
                                error=''
                                icon={true}
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
                                onChange={e => handleSelect('street', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomSelector
                                label="City"
                                options={cities}
                                placeholder="Colombo 01"
                                onChange={value => handleSelect('city', value)}
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <CustomSelector
                                label="District"
                                options={districts}
                                placeholder="Colombo"
                                onChange={value => handleSelect('district', value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomSelector
                                label="Province"
                                options={provinces}
                                placeholder="Western Province"
                                onChange={value => handleSelect('province', value)}
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
                            onChange={e => handleSelect('registrationNo', e.target.value)}
                            placeholder=''
                            error=''
                        />
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Business Registration License Photo'}
                            images={licenseImage}
                            setImages={setLicenseImage}
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
                            placeholder="Hotel"
                            onChange={value => handleSelect('type', value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect('description', e.target.value)}
                            placeholder=''
                            error=''
                            warningHeading={'Important Note: Customize the **Heading** Text Here'}
                        />
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Hotel Images'}
                            images={hotelImages}
                            setImages={setHotelImages}
                            multiple={true}
                        />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton text="Register" type={'submit'} />
                    </div>
                </div>
            </form>
        </Main>
    );
}
