import Main from '../../components/Main'
import Card from '../../components/Card'
import { FaUser, FaStar, FaUpload, FaCamera, FaMap, FaLanguage, FaPenToSquare } from 'react-icons/fa6'

const GuideRegister = () => {
    return (
        <div>
            <Main>
                <div className='text-center w-full px-4 py-6'>
                    <h1 className='text-2xl md:text-3xl font-bold'>Join Our Expert Tour Guide Network</h1>
                    <p className='max-w-xl mx-auto text-gray-600 mt-2'>Register as a certified tour guide and connect with travelers exploring the beauty of Sri Lanka</p>
                </div>

                <div>
                    <Card>
                        <div className='w-full space-y-12'>
                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaUser />
                                    <p className='text-md font-semibold'>Personal Information</p>
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Business Name *</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Business Email *</label>
                                        <input
                                            type="email"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Phone Number *</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Years of Experience *</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaStar />
                                    <p className='text-md font-semibold'>SLTDA License and NIC Informations</p>
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">SLTDA License Number *</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Upload SLTDA License Document *</label>
                                        <div className='flex items-center w-full'>
                                            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50'>
                                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                    <FaUpload className='w-8 h-8 mb-3 text-gray-500' />
                                                    <p className='mb-2 text-sm text-gray-500'>Click to upload or drag and drop</p>
                                                    <p className='text-xs text-gray-500'>PDF, JPG, PNG (Max 5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept='.pdf, .jpg, .png'
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">NIC Number *</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div className=''>
                                        <label className="block text-md font-medium text-gray-700">Upload NIC Document *</label>
                                        <div className='flex items-center w-full'>
                                            <label className='flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white hover:bg-gray-50'>
                                                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                                    <FaUpload className='w-8 h-8 mb-3 text-gray-500' />
                                                    <p className='mb-2 text-sm text-gray-500'>Click to upload or drag and drop</p>
                                                    <p className='text-xs text-gray-500'>PDF, JPG, PNG (Max 5MB)</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept='.pdf, .jpg, .png'
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaCamera />
                                    <p className='text-md font-semibold'>Profile Photo</p>
                                </div>
                                <div className='flex items-start gap-6'>
                                    <div className='flex-shrink-0'>
                                        <div className='w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center'>
                                            <FaUser className='w-8 h-8 text-gray-400' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <label className='w-fit inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors'>
                                            <span>Upload Photo</span>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept='.jpg, .jpeg, .png'
                                            />
                                        </label>
                                        <p className='text-sm text-gray-500'>Recommended: 400x400px, JPG or PNG</p>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaMap />
                                    <p className='text-md font-semibold'>Tour Specializations</p>
                                </div>
                                <div className='grid grid-cols-2 gap-6'>
                                    <label className='flex border-2 border-gray-300 bg-white py-2 px-2 items-center gap-5 rounded-lg cursor-pointer'>
                                        <div>
                                            <input type="checkbox" name="" id="" />
                                        </div>
                                        <div>
                                            <p className=''>Cultural Tours</p>
                                            <p className='text-sm'>Temples, heritage sites, traditions</p>
                                        </div>
                                    </label>
                                    <label className='flex border-2 border-gray-300 bg-white py-2 px-2 items-center gap-5 rounded-lg cursor-pointer'>
                                        <div>
                                            <input type="checkbox" name="" id="" />
                                        </div>
                                        <div>
                                            <p className=''>Adventure Tours</p>
                                            <p className='text-sm'>Hiking, climbing, water sports</p>
                                        </div>
                                    </label>
                                    <label className='flex border-2 border-gray-300 bg-white py-2 px-2 items-center gap-5 rounded-lg cursor-pointer'>
                                        <div>
                                            <input type="checkbox" name="" id="" />
                                        </div>
                                        <div>
                                            <p className=''>Nature Tours</p>
                                            <p className='text-sm'>Wildlife, national parks, eco-tours</p>
                                        </div>
                                    </label>
                                    <label className='flex border-2 border-gray-300 bg-white py-2 px-2 items-center gap-5 rounded-lg cursor-pointer'>
                                        <div>
                                            <input type="checkbox" name="" id="" />
                                        </div>
                                        <div>
                                            <p className=''>Historical Tours</p>
                                            <p className='text-sm'>Ancient cities, archaeological sites</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaLanguage />
                                    <p className='text-md font-semibold'>Languages Spoken *</p>
                                </div>
                                <div className='grid grid-cols-3 space-y-2'>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>English</p>
                                    </label>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>Sinhala</p>
                                    </label>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>Tamil</p>
                                    </label>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>Arabic</p>
                                    </label>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>Hindi</p>
                                    </label>
                                    <label className='flex gap-3 items-center cursor-pointer'>
                                        <input type="checkbox" name="" id="" />
                                        <p>Other</p>
                                    </label>
                                </div>
                            </div>

                            <div className='w-full space-y-6'>
                                <div className='flex gap-2 items-center'>
                                    <FaPenToSquare />
                                    <p className='text-md font-semibold'>Proffessional Bio *</p>
                                </div>
                                <div className='w-full'>
                                    <textarea name="" id="" placeholder='Tell us about your experience, expertise, and what makes you a great tour guide...' className='w-full p-3 h-32 border border-gray-300 rounded-lg'></textarea>
                                    <p className='text-sm text-gray-600'>This will be displayed on your public profile</p>
                                </div>
                            </div>

                            <label className='flex gap-3 bg-white p-3 rounded-lg cursor-pointer'>
                                <div>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className='flex flex-col'>
                                    <p>Terms and Conditions Agreement *</p>
                                    <p className='text-sm'>I agree to the Terms of Service and Privacy Policy . I confirm that all information provided is accurate and I am authorized to work as a tour guide in Sri Lanka.</p>
                                </div>
                            </label>

                            <div className='flex justify-center'>
                                <div className='flex flex-col items-center gap-3'>
                                    <div>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            <span>Submit Registration</span>
                                        </button>
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-600'>Your application will be reviewed within 2-3 business days</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Card>
                </div>
            </Main>
        </div>
    )
}

export default GuideRegister
