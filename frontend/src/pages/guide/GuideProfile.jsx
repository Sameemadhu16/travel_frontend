import { Camera, Check, X, Star, Info, AlertCircle, Loader } from 'lucide-react'
import { useState, useEffect } from 'react'
import Main from '../../components/Main'
import User from '../../assets/users/user4.jpg'
import Card from './guideComponents/Card'
import PrimaryButton from '../../components/PrimaryButton'
import InputField from '../../components/InputField'
import InputArea from '../../components/InputArea'
import ImageUploader from '../../components/ImageUploader'
import NavBar from './guideComponents/NavBar'
import useGuideProfile from './hooks/useGuideProfile' // Adjust path

const GuideProfile = () => {
    // Extract userId from Redux persist auth state
    const getUserIdFromStorage = () => {
        try {
            const authState = localStorage.getItem('persist:auth')
            if (!authState) return null
            
            const parsed = JSON.parse(authState)
            const user = JSON.parse(parsed.user)
            return user?.data?.id || user?.id
        } catch (error) {
            console.error('Error parsing user from storage:', error)
            return null
        }
    }
    
    const userId = getUserIdFromStorage()
    
    const { guideData, loading, error, updateGuideProfile } = useGuideProfile(userId)
    const [isEditing, setIsEditing] = useState(false)
    const [localFormData, setLocalFormData] = useState(null)
    const [saveError, setSaveError] = useState(null)
    const [saveLoading, setSaveLoading] = useState(false)

    // Initialize local form data when guide data loads
    useEffect(() => {
        if (guideData) {
            setLocalFormData({
                firstName: guideData.firstName,
                lastName: guideData.lastName,
                nicNumber: guideData.nicNumber,
                phoneNumber: guideData.phoneNumber,
                email: guideData.email,
                licenseNumber: guideData.licenseNumber,
                businessEmail: guideData.businessEmail,
                bio: guideData.bio,
                languages: [...(guideData.languages || [])],
                specializations: [...(guideData.specializations || [])],
            })
        }
    }, [guideData])

    const handleInputChange = (field) => (e) => {
        setLocalFormData(prev => ({ ...prev, [field]: e.target.value }))
    }

    const handleRemoveTag = (field, index) => {
        setLocalFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const handleAddTag = (field, newValue) => {
        if (newValue.trim()) {
            setLocalFormData(prev => ({
                ...prev,
                [field]: [...prev[field], newValue.trim()]
            }))
        }
    }

    const handleSave = async () => {
        try {
            setSaveError(null)
            setSaveLoading(true)
            
            await updateGuideProfile(localFormData)
            setIsEditing(false)
        } catch (err) {
            setSaveError(err.message || 'Failed to save changes')
        } finally {
            setSaveLoading(false)
        }
    }

    const handleCancel = () => {
        // Reset to original data
        setLocalFormData({
            firstName: guideData.firstName,
            lastName: guideData.lastName,
            nicNumber: guideData.nicNumber,
            phoneNumber: guideData.phoneNumber,
            email: guideData.email,
            licenseNumber: guideData.licenseNumber,
            businessEmail: guideData.businessEmail,
            bio: guideData.bio,
            languages: [...guideData.languages],
            specializations: [...guideData.specializations],
        })
        setIsEditing(false)
        setSaveError(null)
    }

    // Loading state
    if (loading) {
        return (
            <Main hasNavbar={true}>
                <div className="flex items-center justify-center h-screen">
                    <Loader className="w-8 h-8 animate-spin text-orange-600" />
                </div>
            </Main>
        )
    }

    // Error state
    if (error) {
        return (
            <Main hasNavbar={true}>
                <div className="flex items-center justify-center h-screen">
                    <Card className="bg-red-50 border border-red-200">
                        <div className="flex gap-3">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-semibold text-red-900">Error Loading Profile</h3>
                                <p className="text-red-700 text-sm mt-1">{error}</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Main>
        )
    }

    // No data state
    if (!guideData || !localFormData) {
        return (
            <Main hasNavbar={true}>
                <Card className="bg-yellow-50 border border-yellow-200">
                    <p className="text-yellow-900">No guide profile found. Please contact support.</p>
                </Card>
            </Main>
        )
    }

    // Calculate stats from guide data
    const guideStats = {
        rating: 4.8, // You may fetch this from a ratings/reviews endpoint
        totalTours: 247,
        yearsExperience: guideData.experienceYears || 0,
        reviewsCount: 156,
    }

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
        { name: 'SLTDA License', expiry: guideData.sltaLicenseExpiry ? new Date(guideData.sltaLicenseExpiry).toLocaleDateString() : 'Not set', status: guideData.isVerified ? 'Verified' : 'Pending', color: guideData.isVerified ? 'orange' : 'yellow' },
    ]

    const TagList = ({ items, color, onRemove, onAdd, addText }) => (
        <div className="flex flex-wrap gap-2">
            {items?.map((item, index) => (
                <span key={index} className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-${color}-100 text-${color}-800 border border-${color}-200`}>
                    {item}
                    {isEditing && onRemove && (
                        <X className={`w-3 h-3 ml-1 cursor-pointer hover:text-${color}-600`} onClick={() => onRemove(index)} />
                    )}
                </span>
            ))}
            {isEditing && onAdd && (
                <AddTagButton color={color} addText={addText} onAdd={onAdd} />
            )}
        </div>
    )

    const AddTagButton = ({ color, addText, onAdd }) => {
        const [input, setInput] = useState('')

        const handleClick = () => {
            onAdd(input)
            setInput('')
        }

        return (
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleClick()}
                placeholder={`Add ${addText.toLowerCase()}`}
                className={`px-3 py-1 rounded-full text-sm border-2 border-dashed border-${color}-300 text-${color}-600 placeholder-${color}-400 focus:outline-none focus:border-${color}-400`}
            />
        )
    }

    return (
        <div className='flex'>
            <div className='sticky top-0 h-fit'>
                <NavBar />
            </div>
            <div className='flex-1'>
                <Main hasNavbar={true}>
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Profile</h1>
                        <p className="text-gray-600 mb-6">Update your profile information and preferences</p>

                        {saveError && (
                            <Card className="mb-6 bg-red-50 border border-red-200">
                                <div className="flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{saveError}</p>
                                </div>
                            </Card>
                        )}

                        <Card>
                            <div className="flex flex-col md:flex-row gap-5 w-full justify-between">
                                <div className="flex gap-5 items-center">
                                    <div className="relative">
                                        <img src={guideData.profilePicture || User} alt="Profile Photo" className="w-32 h-32 rounded-xl object-cover shadow-lg" />
                                        {isEditing && (
                                            <button className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors">
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{guideData.firstName} {guideData.lastName}</h1>
                                        <p className="text-lg text-orange-600 font-medium">Tour Guide</p>
                                        <p className="text-gray-500 text-sm mb-4">Member Since {new Date(guideData.createdAt).toLocaleDateString()}</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${guideData.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {guideData.isAvailable ? 'Available' : 'Unavailable'}
                                        </span>
                                    </div>
                                </div>
                                <div className="min-w-0 flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <PrimaryButton
                                                text={saveLoading ? 'Saving...' : 'Save'}
                                                onClick={handleSave}
                                                disabled={saveLoading}
                                                type="button"
                                                className="text-base"
                                            />
                                            <button
                                                onClick={handleCancel}
                                                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <PrimaryButton
                                            text="Edit"
                                            onClick={() => setIsEditing(true)}
                                            type="button"
                                            className="text-base"
                                        />
                                    )}
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
                                                value={localFormData[field.key]}
                                                onChange={handleInputChange(field.key)}
                                                placeholder={field.placeholder}
                                                disabled={!isEditing}
                                            />
                                        ))}
                                        <div className="md:col-span-2">
                                            <InputField
                                                label="Email Address"
                                                type="email"
                                                value={localFormData.email}
                                                onChange={handleInputChange('email')}
                                                placeholder="Enter email address"
                                                disabled={true}
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
                                                    value={localFormData[field.key]}
                                                    onChange={handleInputChange(field.key)}
                                                    placeholder={field.placeholder}
                                                    disabled={!isEditing}
                                                />
                                            ))}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
                                            <TagList 
                                                items={localFormData.languages} 
                                                color="blue" 
                                                onRemove={(index) => handleRemoveTag('languages', index)}
                                                onAdd={(val) => handleAddTag('languages', val)}
                                                addText="Add Language" 
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Tour Specializations</label>
                                            <TagList 
                                                items={localFormData.specializations} 
                                                color="green" 
                                                onRemove={(index) => handleRemoveTag('specializations', index)}
                                                onAdd={(val) => handleAddTag('specializations', val)}
                                                addText="Add Specialization" 
                                            />
                                        </div>

                                        <InputArea
                                            label="Professional Bio"
                                            value={localFormData.bio}
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
                                                    Expires: {cert.expiry}
                                                </p>
                                                <span className={`inline-block mt-1 px-2 py-1 bg-${cert.color}-200 text-${cert.color}-800 text-xs rounded-full`}>
                                                    {cert.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    {isEditing && <ImageUploader />}
                                </Card>
                            </div>
                        </div>
                    </div>
                </Main>
            </div>
        </div>
    )
}

export default GuideProfile