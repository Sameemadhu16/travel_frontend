import { useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import ImageUploader from "../../../components/ImageUploader";
import InputField from "../../../components/InputField";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { provinces , districts, cities } from "../../../core/location";

export default function HotelRegistration() {

    const [images,setImages] = useState([]);

    const  handleChange = () => {

    }

    const handleSelect = (value) => {
        console.log('Selected:', value);
    };

    return (
        <Main>
            <div className="flex w-full flex-col items-center">
                <Title
                    title="Hotel Registration"
                    size="text-[48px]"
                    font="font-[600]"
                />

                {/* Account info */}
                <div className="flex flex-col gap-2 w-full">
                    <Title
                        title="Account Info:"
                        size="text-[24px]"
                    />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Name'
                                type = 'text'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Email'
                                type = 'text'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Password'
                                type = 'password'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                                icon = {true}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Confirm Password'
                                type = 'password'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                                icon = {true}
                            />
                        </div>
                    </div>
                </div>

                {/* Set Address */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title
                        title="Set Address:"
                        size="text-[24px]"
                    />
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <InputField
                                label='Address 1st line'
                                type = 'text'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Address 2nd line'
                                type = 'text'
                                value = ''
                                onChange={handleChange}
                                placeholder = ''
                                error = ''
                            />
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <div className="w-1/2">
                            <CustomSelector
                                label="City"
                                options={cities}
                                placeholder="Colombo 01"
                                onChange={handleSelect}
                            />
                        </div>
                        <div className="w-1/2">
                            <CustomSelector
                                label="Province"
                                options={provinces}
                                placeholder="Western Province"
                                onChange={handleSelect}
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <CustomSelector
                            label="District"
                            options={districts}
                            placeholder="Colombo"
                            onChange={handleSelect}
                        />
                    </div>
                </div>

                {/* Business Info */}
                <div className="flex flex-col gap-2 w-full mt-10">
                    <Title
                        title="Business Info:"
                        size="text-[24px]"
                    />
                    <div className="w-1/2">
                        <InputField
                            label='Business Registration No'
                            type = 'text'
                            value = ''
                            onChange={handleChange}
                            placeholder = ''
                            error = ''
                        />
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Business Registration License Photo'}
                            images={images}
                            setImages={setImages}
                        />
                    </div>
                </div>
            </div>
        </Main>
    )
}
