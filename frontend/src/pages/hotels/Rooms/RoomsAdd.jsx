import { useMemo, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
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
import { createRoom } from "../../../api/roomService";
import { showToastMessage } from "../../../utils/toastHelper";
import { app } from "../../../config/firebase";

export default function RoomsAdd() {
    const [roomImages, setRoomImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        roomType: "",       
        description: "",
        maxGuests: "",       
        bedTypes: "",  // Changed from bedType to match backend field name            
        pricePerNight: "",    
        amenities: [],       
        images: [],
        availability: true  // Default availability
    });
    
    const navigate = useNavigate();
    const auth = getAuth(app);

    const handleRoomTypeChange = (selectedId) => {
        const selectedRoom = roomTypes.find(room => room.id === Number(selectedId));
        if (selectedRoom) {
            setFormData(prev => ({ ...prev, roomType: selectedRoom.value }));
        }
    };

    const handleBedTypeChange = (selectedId) => {
        const selectedBed = bedTypes.find(bed => bed.id === Number(selectedId));
        if (selectedBed) {
            setFormData(prev => ({ ...prev, bedTypes: selectedBed.value }));
        }
    };

    const handleAmenityChange = (amenityValue) => {
        setFormData((prev) => {
            const alreadySelected = prev.amenities.includes(amenityValue);
            const updatedAmenities = alreadySelected
                ? prev.amenities.filter((item) => item !== amenityValue)
                : [...prev.amenities, amenityValue];

            return { ...prev, amenities: updatedAmenities };
        });
    };

    const validateForm = () => {
        if (!formData.roomType || formData.roomType === "") {
            showToastMessage("error", "Please select a room type");
            return false;
        }
        if (!formData.bedTypes || formData.bedTypes === "") {
            showToastMessage("error", "Please select a bed type");
            return false;
        }
        if (!formData.maxGuests || formData.maxGuests === "" || Number(formData.maxGuests) <= 0) {
            showToastMessage("error", "Please enter valid number of max guests");
            return false;
        }
        if (!formData.pricePerNight || formData.pricePerNight === "" || Number(formData.pricePerNight) <= 0) {
            showToastMessage("error", "Please enter valid price per night");
            return false;
        }
        if (!formData.description || formData.description.trim() === "") {
            showToastMessage("error", "Please enter a description");
            return false;
        }
        if (roomImages.length === 0) {
            showToastMessage("error", "Please upload at least one room image");
            return false;
        }
        if (roomImages.length > 5) {
            showToastMessage("error", "Maximum 5 images allowed");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            return;
        }

        // Check if user is authenticated
        const currentUser = auth.currentUser;
        if (!currentUser) {
            showToastMessage("error", "Please login to add rooms");
            navigate("/partner/login");
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                ...formData,
                images: roomImages,
                maxGuests: String(formData.maxGuests), // Convert to string to match backend
                pricePerNight: Number(formData.pricePerNight) // Ensure it's a number
            };

            // Call API with user's Firebase UID
            const createdRoom = await createRoom(submissionData, currentUser.uid);
            
            showToastMessage("success", "Room added successfully!");
            
            // Reset form after successful submission
            setFormData({
                roomType: "",       
                description: "",
                maxGuests: "",       
                bedTypes: "",            
                pricePerNight: "",    
                amenities: [],       
                images: [],
                availability: true
            });
            setRoomImages([]);
            
            // Optionally navigate to rooms list or dashboard
            // navigate("/partner/rooms");
            
        } catch (error) {
            console.error("Error creating room:", error);
            
            // Handle specific error cases
            if (error.status === 401) {
                showToastMessage("error", "Authentication failed. Please login again.");
                navigate("/partner/login");
            } else if (error.status === 403) {
                showToastMessage("error", "Your hotel must be verified by admin before adding rooms");
            } else if (error.status === 404) {
                showToastMessage("error", "No hotel found for your account. Please register your hotel first.");
            } else {
                showToastMessage("error", typeof error.message === 'string' ? error.message : "Failed to add room. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const amenityList = useMemo(() => {
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
        });
    }, [formData.amenities]);

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
                                placeholder="Select Room Type"
                                options={roomTypes}
                                value={roomTypes.find(r => r.value === formData.roomType)?.id || ""}
                                onChange={handleRoomTypeChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Max Guests'
                                type='number'
                                name='maxGuests'
                                value={formData.maxGuests}
                                onChange={e => handleSelect(setFormData, 'maxGuests', e.target.value)}
                                placeholder='Enter maximum guests'
                                error=''
                            />
                        </div>
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="w-1/2">
                            <CustomSelector
                                label="Bed Types"
                                placeholder="Select Bed Type"
                                options={bedTypes}
                                value={bedTypes.find(b => b.value === formData.bedTypes)?.id || ""}
                                onChange={handleBedTypeChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputField
                                label='Price per Night'
                                type='number'
                                name='pricePerNight'
                                value={formData.pricePerNight}
                                onChange={e => handleSelect(setFormData, 'pricePerNight', e.target.value)}
                                placeholder='Enter price per night'
                                error=''
                            />
                        </div>
                    </div>
                    <div className="w-1/2">
                        <InputArea
                            label='Description'
                            value={formData.description}
                            onChange={e => handleSelect(setFormData, 'description', e.target.value)}
                            placeholder='Enter room description'
                            error=''
                            warningHeading={'Important Note: Customize the **Heading** Text Here'}
                        />
                    </div>
                    <div className="mt-4">
                        <Title title="Add Facilities" size="text-[24px]" />
                        <div className="flex flex-wrap mt-3">
                            {amenityList}
                        </div>
                    </div>
                    <div className="w-full mt-2">
                        <ImageUploader
                            label={'Room Images (Upload 1-5 images)'}
                            images={roomImages}
                            setImages={setRoomImages}
                            error={imageError}
                            setError={setImageError}
                            multiple={false}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            You can upload up to 5 images. Click or drag images one by one.
                        </p>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-1/4 mt-5">
                        <PrimaryButton 
                            text={isSubmitting ? "Adding Room..." : "Add Room"} 
                            type={'submit'}
                            isDisabled={isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </Main>
    );
}
