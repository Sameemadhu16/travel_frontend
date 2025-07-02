import { Camera, Check, Edit, Plus, X, Star, MapPin, Info } from 'lucide-react'
import { useState } from 'react'
import Main from '../../components/Main'
import User from '../../assets/users/user4.jpg'
import Card from '../../components/Card'

const GuideProfile = () => {
    const [languages, setLanguages] = useState(['Sinhala', 'English', 'Tamil']);
    const [specializations, setSpecializations] = useState(['Cultural Heritage', 'Wildlife Tours', 'Adventure Travel', 'Photography Tours']);
    const [isEditing, setIsEditing] = useState(false);

    const guideStats = {
        rating: 4.8,
        totalTours: 247,
        yearsExperience: 8,
        reviewsCount: 156
    };

    const serviceAreas = ['Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Ella', 'Yala National Park'];

    return (
        <Main>
            <div className="space-y-6">
                {/* Header Profile Card */}
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                    <p className="text-gray-600">Update your unavailability and handle unavailability</p>
                </div>

                <Card>
                    <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                        <div className="flex gap-5 items-center">
                            <div className="relative">
                                <img
                                    src={User}
                                    alt="Profile Photo"
                                    className="w-32 h-32 rounded-xl object-cover shadow-lg"
                                />
                                <button className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="items-center">
                                <h1 className="text-2xl font-bold text-gray-900">Abdulla Zakey</h1>
                                <p className="text-lg text-blue-600 font-medium">Tour Guide</p>
                                <p className="text-gray-500 text-sm mb-4">Member Since Jan 2025</p>
                            </div>
                        </div>

                        <div className="min-w-0">
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
                            >
                                <Edit className="w-4 h-4" />
                                <span>{isEditing ? 'Save' : 'Edit'}</span>
                            </button>
                        </div>
                    </div>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Column - Personal & Business Info */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Personal Information */}
                        <Card className={'flex flex-col items-start'}>
                            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="Mohamed Zakey"
                                        readOnly={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="Abdulla"
                                        readOnly={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">NIC Number</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="200214402020"
                                        readOnly={!isEditing}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="0762555148"
                                        readOnly={!isEditing}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value="mzabdulla25@gmail.com"
                                        readOnly={!isEditing}
                                    />
                                </div>
                            </div>
                        </Card>

                        {/* Business Information */}
                        <Card className={'flex flex-col'}>
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">SLTDA License Number</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value="LIC-2025-TG-001234"
                                            readOnly={!isEditing}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Email</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            value="tours@abdullazakey.lk"
                                            readOnly={!isEditing}
                                        />
                                    </div>
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Bio</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        value="Experienced tour guide with 8+ years in Sri Lankan tourism. Specialized in cultural heritage sites, wildlife tours, and adventure travel. Passionate about sharing Sri Lanka's rich history and natural beauty with visitors from around the world. Fluent in multiple languages and certified in first aid."
                                        readOnly={!isEditing}
                                    />
                                </div>
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

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Response Rate</span>
                                    <span className="font-semibold text-green-600">98%</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm">Response Time</span>
                                    <span className="font-semibold"> 2 hours</span>
                                </div>
                            </div>
                        </Card>

                        {/* Certifications */}
                        <Card className={'flex flex-col'}>
                            <div className="flex items-center justify-between mb-4 w-full">
                                <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
                                <button className="text-blue-600 hover:text-blue-800">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-3 w-full">
                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 text-sm">SLTDA License</h4>
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">Expires: Dec 31, 2026</p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">Verified</span>
                                </div>

                                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 text-sm">First Aid Certificate</h4>
                                        <Check className="w-4 h-4 text-green-600" />
                                    </div>
                                    <p className="text-xs text-gray-600">Expires: Aug 15, 2025</p>
                                    <span className="inline-block mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full">Verified</span>
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

                            <button className="w-full mt-4 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                                <Plus className="w-4 h-4 mx-auto mb-1" />
                                <span className="text-sm block">Add Certificate</span>
                            </button>
                        </Card>
                    </div>
                </div>

                {/* Photo Gallery - Full Width */}
                <Card>
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Photo Gallery</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                <Plus className="w-4 h-4" />
                                <span>Add Photos</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop"
                                    alt="Cultural heritage tour"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>

                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&h=200&fit=crop"
                                    alt="Wildlife safari"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>

                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop"
                                    alt="Beach tour"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>

                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=200&h=200&fit=crop"
                                    alt="Mountain hiking"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>

                            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                                <img
                                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=200&h=200&fit=crop"
                                    alt="Tea plantation tour"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>

                            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                                <Plus className="w-6 h-6 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500">Add Photo</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Main>
    )
}

export default GuideProfile