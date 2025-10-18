import { useMemo, useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
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
import { getRoomById, updateRoom } from "../../../api/roomService";
import { getHotelByUserDocId } from "../../../api/hotelService";
import { showToastMessage } from "../../../utils/toastHelper";
import { app } from "../../../config/firebase";

export default function RoomEdit() {
    const { roomId } = useParams();
    const [roomImages, setRoomImages] = useState([]);
    const [imageError, setImageError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        roomType: "",       
        description: "",
        maxGuests: "",       
        bedTypes: "",            
        pricePerNight: "",    
        amenities: [],       
        images: [],
        availability: true
    });
    
    const navigate = useNavigate();
    const auth = getAuth(app);

    // Fetch existing room data
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                setLoading(true);
                const currentUser = auth.currentUser;

                if (!currentUser) {
                    showToastMessage("error", "Please login to edit rooms");
                    navigate("/partner-login/step-1");
                    return;
                }

                // Fetch the room data
                const roomData = await getRoomById(roomId);
                
                // Set form data with existing room data
                setFormData({
                    roomType: roomData.roomType || "",
                    description: roomData.description || "",
                    maxGuests: roomData.maxGuests || "",
                    bedTypes: roomData.bedTypes || "",
                    pricePerNight: roomData.pricePerNight || "",
                    amenities: roomData.amenities || [],
                    images: roomData.images || [],
                    availability: roomData.availability !== undefined ? roomData.availability : true
                });

                // Set existing images
                setRoomImages(roomData.images || []);

            } catch (error) {
                console.error("Error fetching room data:", error);
                showToastMessage("error", "Failed to load room data");
                navigate("/hotel/rooms");
            } finally {
                setLoading(false);
            }
        };

        fetchRoomData();
    }, [roomId, auth, navigate]);

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

    const handleAvailabilityChange = (e) => {
        setFormData(prev => ({ ...prev, availability: e.target.checked }));
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
        
        if (!validateForm()) {
            return;
        }

        const currentUser = auth.currentUser;
        if (!currentUser) {
            showToastMessage("error", "Please login to update rooms");
            navigate("/partner-login/step-1");
            return;
        }

        setIsSubmitting(true);

        try {
            const submissionData = {
                ...formData,
                images: roomImages,
                maxGuests: String(formData.maxGuests),
                pricePerNight: Number(formData.pricePerNight)
            };

            // Call API to update room
            await updateRoom(roomId, submissionData);
            
            showToastMessage("success", "Room updated successfully!");
            
            // Get hotel data to navigate back to rooms page
            const hotelData = await getHotelByUserDocId(currentUser.uid);
            
            if (hotelData && hotelData.id) {
                navigate(`/hotel/rooms/${hotelData.id}`);
            } else {
                navigate('/hotel/rooms');
            }
            
        } catch (error) {
            console.error("Error updating room:", error);
            
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    showToastMessage("error", "Authentication failed. Please login again.");
                    navigate("/partner-login/step-1");
                } else if (status === 403) {
                    showToastMessage("error", "You don't have permission to update this room");
                } else if (status === 404) {
                    showToastMessage("error", "Room not found");
                } else {
                    showToastMessage("error", error.response.data || "Failed to update room. Please try again.");
                }
            } else {
                showToastMessage("error", "Failed to update room. Please try again.");
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

    if (loading) {
        return (
            <Main>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto"></div>
                        <p className="mt-4 text-content-secondary">Loading room data...</p>
                    </div>
                </div>
            </Main>
        );
    }

    return (
        <Main>
            <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
                <Title 
                    title="Edit Room" 
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
                    <div className="mt-2">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={formData.availability}
                                onChange={handleAvailabilityChange}
                                className="w-5 h-5 text-brand-primary"
                            />
                            <span className="text-gray-700 font-medium">Room Available for Booking</span>
                        </label>
                    </div>
                    <div className="mt-4">
                        <Title title="Edit Facilities" size="text-[24px]" />
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
                <div className="w-full flex gap-4">
                    <div className="w-1/4 mt-5">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-1/4 mt-5">
                        <PrimaryButton 
                            text={isSubmitting ? "Updating Room..." : "Update Room"} 
                            type={'submit'}
                            isDisabled={isSubmitting}
                        />
                    </div>
                </div>
            </form>
        </Main>
    );
}
