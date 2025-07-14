import { Camera, Check, Plus, X, Star, MapPin, Info } from 'lucide-react'
import { useState } from 'react'
import Main from '../../components/Main'
import User from '../../assets/users/user4.jpg'
import Card from './guideComponents/Card'
import PrimaryButton from '../../components/PrimaryButton'
import InputField from '../../components/InputField'
import InputArea from '../../components/InputArea'
import ImageUploader from '../../components/ImageUploader'

const GuideProfile = () => {
    const [languages, setLanguages] = useState(['Sinhala', 'English', 'Tamil']);
    const [specializations, setSpecializations] = useState(['Cultural Heritage', 'Wildlife Tours', 'Adventure Travel', 'Photography Tours']);
    const [isEditing, setIsEditing] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        firstName: 'Mohamed Zakey',
        lastName: 'Abdulla',
        nicNumber: '200214402020',
        phoneNumber: '0762555148',
        email: 'mzabdulla25@gmail.com',
        licenseNumber: 'LIC-2025-TG-001234',
        businessEmail: 'tours@abdullazakey.lk',
        bio: 'Experienced tour guide with 8+ years in Sri Lankan tourism. Specialized in cultural heritage sites, wildlife tours, and adventure travel. Passionate about sharing Sri Lanka\'s rich history and natural beauty with visitors from around the world. Fluent in multiple languages and certified in first aid.'
    });

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    };

    const guideStats = {
        rating: 4.8,
        totalTours: 247,
        yearsExperience: 8,
        reviewsCount: 156
    };

    const serviceAreas = ['Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Ella', 'Yala National Park'];

    return (
        <Main>
            <div className="">
                {/* Header Profile Card */}
                {/* Header */}
                <h1 className="text-2xl font-bold mb-1">Profile</h1>
                <p className="text-gray-600 mb-6">Update your unavailability and handle unavailability</p>

                <Card>
                    <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                        <div className="flex gap-5 items-center">
                            <div className="relative">
                                <img
                                    src={User}
                                    alt="Profile Photo"
                                    className="w-32 h-32 rounded-xl object-cover shadow-lg"
                                />
                                <button className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="items-center">
                                <h1 className="text-2xl font-bold text-gray-900">Abdulla Zakey</h1>
                                <p className="text-lg text-orange-600 font-medium">Tour Guide</p>
                                <p className="text-gray-500 text-sm mb-4">Member Since Jan 2025</p>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <PrimaryButton
                                text={<span>{isEditing ? 'Save' : 'Edit'}</span>}
                                onClick={() => setIsEditing(!isEditing)}
                                type={'button'}
                                className={'text-base'}
                            />
                        </div>
                    </div>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Column - Personal & Business Info */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Personal Information */}
                        <Card className={'flex flex-col items-start'}>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                <InputField
                                    label="First Name"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleInputChange('firstName')}
                                    placeholder="Enter first name"
                                    disabled={!isEditing}
                                />

                                <InputField
                                    label="Last Name"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleInputChange('lastName')}
                                    placeholder="Enter last name"
                                    disabled={!isEditing}
                                />

                                <InputField
                                    label="NIC Number"
                                    type="text"
                                    value={formData.nicNumber}
                                    onChange={handleInputChange('nicNumber')}
                                    placeholder="Enter NIC number"
                                    disabled={!isEditing}
                                />

                                <InputField
                                    label="Phone Number"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange('phoneNumber')}
                                    placeholder="Enter phone number"
                                    disabled={!isEditing}
                                />

                                <div className="md:col-span-2">
                                    <InputField
                                        label="Email Address"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange('email')}
                                        placeholder="Enter email address"
                                        disabled={!isEditing}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Business Information */}
                        <Card className={'flex flex-col'}>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <InputField
                                        label="SLTDA License Number"
                                        type="text"
                                        value={formData.licenseNumber}
                                        onChange={handleInputChange('licenseNumber')}
                                        placeholder="Enter license number"
                                        disabled={!isEditing}
                                    />

                                    <InputField
                                        label="Business Email"
                                        type="email"
                                        value={formData.businessEmail}
                                        onChange={handleInputChange('businessEmail')}
                                        placeholder="Enter business email"
                                        disabled={!isEditing}
                                    />
                                </div>

                                {/* Languages Spoken */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                                    <div className="flex flex-wrap gap-2">
                                        {languages.map((language, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 border border-blue-200"
                                            >
                                                {language}
                                                {isEditing && (
                                                    <X className="w-3 h-3 ml-1 cursor-pointer hover:text-blue-600" />
                                                )}
                                            </span>
                                        ))}
                                        {isEditing && (
                                            <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-dashed border-blue-300 text-blue-600 hover:border-blue-400">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add Language
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Specializations */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tour Specializations</label>
                                    <div className="flex flex-wrap gap-2">
                                        {specializations.map((spec, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 border border-green-200"
                                            >
                                                {spec}
                                                {isEditing && (
                                                    <X className="w-3 h-3 ml-1 cursor-pointer hover:text-green-600" />
                                                )}
                                            </span>
                                        ))}
                                        {isEditing && (
                                            <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-dashed border-green-300 text-green-600 hover:border-green-400">
                                                <Plus className="w-3 h-3 mr-1" />
                                                Add Specialization
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Service Areas */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Areas</label>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceAreas.map((area, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 border border-purple-200"
                                            >
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {area}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Bio */}
                                <InputArea
                                    label="Professional Bio"
                                    value={formData.bio}
                                    onChange={handleInputChange('bio')}
                                    placeholder="Enter your professional bio..."
                                    disabled={!isEditing}
                                />
                            </div>
                        </Card>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">
                        {/* Performance Stats */}
                        <Card className={'flex flex-col'}>
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Stats</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Average Rating</span>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="font-semibold">{guideStats.rating}/5.0</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Tours Completed</span>
                                    <span className="font-semibold">{guideStats.totalTours}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Years Experience</span>
                                    <span className="font-semibold">{guideStats.yearsExperience} years</span>
                                </div>
                            </div>
                        </Card>

                        {/* Certifications */}
                        <Card className={'flex flex-col'}>
                            <h3 className="text-lg font-bold text-gray-900">Certifications</h3>

                            <div className="space-y-3 w-full">
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 text-sm">SLTDA License</h4>
                                        <Check className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">Expires: Dec 31, 2026</p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full">Verified</span>
                                </div>

                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 text-sm">First Aid Certificate</h4>
                                        <Check className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">Expires: Aug 15, 2025</p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full">Verified</span>
                                </div>

                                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 text-sm">Wildlife Guide</h4>
                                        <Info className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">Valid until: Dec 2025</p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">Pending</span>
                                </div>
                            </div>
                            <ImageUploader />
                        </Card>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default GuideProfile