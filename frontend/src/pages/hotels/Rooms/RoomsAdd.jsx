import { useMemo, useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { bedTypes, roomTypes } from "../../../core/Lists/rooms";
import { handleSelect } from "../../../core/service";
import InputField from "../../../components/InputField";
import { amenities } from "../../../core/constant";
import Checkbox from "../../../components/CheckBox";
import ImageUploader from "../../../components/ImageUploader";
import PrimaryButton from "../../../components/PrimaryButton";
import InputArea from "../../../components/InputArea";

export default function RoomsAdd() {
    const [roomImages,setRoomImages] = useState([]);
    const [formData,setFormData] = useState({
        roomType: "",       
        description: "",
        maxGuests: 0,       
        bedType: "",            
        pricePerNight: 0,    
        amenities: [],       
        images: []     
    });

    const handleAmenityChange = (amenityValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.amenities.includes(amenityValue);
            const updatedAmenities = alreadySelected
                ? prev.amenities.filter((item) => item !== amenityValue)
                : [...prev.amenities, amenityValue];

            return { ...prev, amenities: updatedAmenities };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionData = {
            ...formData,
            images: roomImages
        };
        console.log(submissionData);
    };

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
    },[amenities]);

    return (
        <Main>
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title 
                    title="Add Rooms" 
                    size="text-[48px]" 
                    font="font-[600]" 
                />
                <div className="w-full flex flex-col gap-2 mt-5">
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                            <CustomSelector
                                label="Room Types"
                                placeholder="Room Types"
                                options={roomTypes}
                                onChange={value => handleSelect(setFormData, 'roomType', value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Max Guests'
                                type='text'
                                name='maxGuests'
                                value={formData.maxGuests}
                                onChange={e => handleSelect(setFormData, 'maxGuests', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                            <CustomSelector
                                label="Bed Types"
                                placeholder="Bed Types"
                                options={bedTypes}
                                onChange={value => handleSelect(setFormData, 'bedType', value)}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Price per Night'
                                type='text'
                                name='pricePerNight'
                                value={formData.pricePerNight}
                                onChange={e => handleSelect(setFormData, 'pricePerNight', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect(setFormData, 'description', e.target.value)}
                            placeholder=''
                            error=''
                            warningHeading={'Important Note: Customize the **Heading** Text Here'}
                        />
                    </div>
                    <div className="mt-4">
                        <Title title="Add Facilities" size="text-[24px]" />
                        <div className="flex flex-wrap mt-3">
                            { amenityList }
                        </div>
                    </div>
                    <div className="w-1/2 mt-2">
                        <ImageUploader
                            label={'Room Images'}
                            images={roomImages}
                            setImages={setRoomImages}
                            multiple={true}
                        />
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton text="Add Room" type={'submit'} />
                    </div>
                </div>
            </form>
        </Main>
    )
}
