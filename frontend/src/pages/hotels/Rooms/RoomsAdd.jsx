import { useState } from "react";
import CustomSelector from "../../../components/CustomSelector";
import Main from "../../../components/Main";
import Title from "../../../components/Title";
import { bedTypes, roomTypes } from "../../../core/rooms";
import { handleSelect } from "../../../core/service";
import InputField from "../../../components/InputField";
import { amenities } from "../../../core/constant";


export default function RoomsAdd() {
    const [formData,setFormData] = useState({});
    return (
        <Main>
            <form className="flex w-full flex-col items-center">
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
                                type='number'
                                name='roomType'
                                value={formData.street}
                                onChange={e => handleSelect(setFormData, 'roomType', e.target.value)}
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
                                value={formData.street}
                                onChange={e => handleSelect(setFormData, 'pricePerNight', e.target.value)}
                                placeholder=''
                                error=''
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <Title title="Add Facilities" size="text-[24px]" />
                        <div className="flex flex-wrap">
                            {
                                amenities.map((amenity)=>(
                                    <div>
                                        {amenity.value}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </form>
        </Main>
    )
}
