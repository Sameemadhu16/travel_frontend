import { Camera, Check, Plus, X, Star, MapPin, Info } from 'lucide-react'
import { useState } from 'react'
import Main from '../../components/Main'
import User from '../../assets/users/user4.jpg'
import Card from './guideComponents/Card'
import PrimaryButton from '../../components/PrimaryButton'
import InputField from '../../components/InputField'
import InputArea from '../../components/InputArea'
import ImageUploader from '../../components/ImageUploader'
import NavBar from './guideComponents/NavBar'

const GuideProfile = () => {
    const [languages, setLanguages] = useState(['Sinhala', 'English', 'Tamil'])
    const [specializations, setSpecializations] = useState(['Cultural Heritage', 'Wildlife Tours', 'Adventure Travel', 'Photography Tours'])
    const [isEditing, setIsEditing] = useState(false)

    const [formData, setFormData] = useState({
        firstName: 'Mohamed Zakey',
        lastName: 'Abdulla',
        nicNumber: '200214402020',
        phoneNumber: '0762555148',
        email: 'mzabdulla25@gmail.com',
        licenseNumber: 'LIC-2025-TG-001234',
        businessEmail: 'tours@abdullazakey.lk',
        bio: 'Experienced tour guide with 8+ years in Sri Lankan tourism. Specialized in cultural heritage sites, wildlife tours, and adventure travel. Passionate about sharing Sri Lanka\'s rich history and natural beauty with visitors from around the world. Fluent in multiple languages and certified in first aid.'
    })

    const handleInputChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const guideStats = {
        rating: 4.8,
        totalTours: 247,
        yearsExperience: 8,
        reviewsCount: 156
    }

    const serviceAreas = ['Colombo', 'Kandy', 'Galle', 'Sigiriya', 'Ella', 'Yala National Park']

    const personalFields = [
        { key: 'firstName', label: 'First Name', placeholder: 'Enter first name' },
        { key: 'lastName', label: 'Last Name', placeholder: 'Enter last name' },
        { key: 'nicNumber', label: 'NIC Number', placeholder: 'Enter NIC number' },
        { key: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: 'Enter phone number' }
    ]

    const businessFields = [
        { key: 'licenseNumber', label: 'SLTDA License Number', placeholder: 'Enter license number' },
        { key: 'businessEmail', label: 'Business Email', type: 'email', placeholder: 'Enter business email' }
    ]

    const statsConfig = [
        { label: 'Average Rating', value: `${guideStats.rating}/5.0`, icon: Star },
        { label: 'Tours Completed', value: guideStats.totalTours },
        { label: 'Years Experience', value: `${guideStats.yearsExperience} years` }
    ]

    const certifications = [
        { name: 'SLTDA License', expiry: 'Dec 31, 2026', status: 'Verified', color: 'orange' },
        { name: 'First Aid Certificate', expiry: 'Aug 15, 2025', status: 'Verified', color: 'orange' },
        { name: 'Wildlife Guide', expiry: 'Dec 2025', status: 'Pending', color: 'yellow' }
    ]

    const TagList = ({ items, color, onRemove, onAdd, addText, icon: Icon }) => (
        <div className="flex flex-wrap gap-2">
            {items.map((item, index) => (
                <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-${color}-100 text-${color}-800 border border-${color}-200`}>
                    {Icon && <Icon className="w-3 h-3 mr-1" />}
                    {item}
                    {isEditing && onRemove && (
                        <X className={`w-3 h-3 ml-1 cursor-pointer hover:text-${color}-600`} onClick={() => onRemove(index)} />
                    )}
                </span>
            ))}
            {isEditing && onAdd && (
                <button className={`inline-flex items-center px-3 py-1 rounded-full text-sm border-2 border-dashed border-${color}-300 text-${color}-600 hover:border-${color}-400`} onClick={onAdd}>
                    <Plus className="w-3 h-3 mr-1" />
                    {addText}
                </button>
            )}
        </div>
    )

    return (
        <>
            {/* <div className='mt-24'> */}
            <div className='flex'>
                <div className='sticky top-0 h-screen'>
                    <NavBar />
                </div>
                <div className='flex-1'>
                    <Main hasNavbar={true}>
                        <div>
                            <h1 className="text-2xl font-bold mb-1">Profile</h1>
                            <p className="text-gray-600 mb-6">Update your unavailability and handle unavailability</p>

                            <Card>
                                <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                                    <div className="flex gap-5 items-center">
                                        <div className="relative">
                                            <img src={User} alt="Profile Photo" className="w-32 h-32 rounded-xl object-cover shadow-lg" />
                                            <button className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors">
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <h1 className="text-2xl font-bold text-gray-900">Abdulla Zakey</h1>
                                            <p className="text-lg text-orange-600 font-medium">Tour Guide</p>
                                            <p className="text-gray-500 text-sm mb-4">Member Since Jan 2025</p>
                                        </div>
                                    </div>
                                    <div className="min-w-0">
                                        <PrimaryButton
                                            text={isEditing ? 'Save' : 'Edit'}
                                            onClick={() => setIsEditing(!isEditing)}
                                            type="button"
                                            className="text-base"
                                        />
                                    </div>
                                </div>
                            </Card>

                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                                <div className="lg:col-span-3 space-y-6">
                                    {/* Personal Information */}
                                    <Card className="flex flex-col items-start">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                                            {personalFields.map(field => (
                                                <InputField
                                                    key={field.key}
                                                    label={field.label}
                                                    type={field.type || 'text'}
                                                    value={formData[field.key]}
                                                    onChange={handleInputChange(field.key)}
                                                    placeholder={field.placeholder}
                                                    disabled={!isEditing}
                                                />
                                            ))}
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
                                    <Card className="flex flex-col">
                                        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Information</h2>
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {businessFields.map(field => (
                                                    <InputField
                                                        key={field.key}
                                                        label={field.label}
                                                        type={field.type || 'text'}
                                                        value={formData[field.key]}
                                                        onChange={handleInputChange(field.key)}
                                                        placeholder={field.placeholder}
                                                        disabled={!isEditing}
                                                    />
                                                ))}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                                                <TagList items={languages} color="blue" addText="Add Language" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Tour Specializations</label>
                                                <TagList items={specializations} color="green" addText="Add Specialization" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Service Areas</label>
                                                <TagList items={serviceAreas} color="purple" icon={MapPin} />
                                            </div>

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
                                    <Card className="flex flex-col">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Stats</h3>
                                        <div className="space-y-3">
                                            {statsConfig.map((stat, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <span className="text-gray-600 text-sm">{stat.label}</span>
                                                    <div className="flex items-center gap-1">
                                                        {stat.icon && <stat.icon className="w-4 h-4 text-yellow-400 fill-current" />}
                                                        <span className="font-semibold">{stat.value}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    {/* Certifications */}
                                    <Card className="flex flex-col">
                                        <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
                                        <div className="space-y-3 w-full">
                                            {certifications.map((cert, index) => (
                                                <div key={index} className={`p-3 bg-${cert.color}-50 rounded-lg border border-${cert.color}-200`}>
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium text-gray-900 text-sm">{cert.name}</h4>
                                                        {cert.status === 'Verified' ?
                                                            <Check className={`w-4 h-4 text-${cert.color}-600`} /> :
                                                            <Info className={`w-4 h-4 text-${cert.color}-600`} />
                                                        }
                                                    </div>
                                                    <p className="text-xs text-gray-600">
                                                        {cert.status === 'Verified' ? 'Expires: ' : 'Valid until: '}{cert.expiry}
                                                    </p>
                                                    <span className={`inline-block mt-1 px-2 py-1 bg-${cert.color}-200 text-${cert.color}-800 text-xs rounded-full`}>
                                                        {cert.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <ImageUploader />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Main>
                </div>
            </div>
        </>
    )
}

export default GuideProfile