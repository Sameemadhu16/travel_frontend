import Main from '../../components/Main'
import { Plus, Clock, Paperclip, TimerReset, User, ForwardIcon, Check } from 'lucide-react'
import Card from './guideComponents/Card'
import { Link } from 'react-router-dom'

const GuideComplaints = () => {
    return (
        <Main>
            <div>
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>
                        <p className="text-gray-600">Submit and track your complaints to administration</p>
                    </div>
                    <div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4" />
                            <span>New Complaint</span>
                        </button>
                    </div>
                </div>
                <div>
                    <h3 className='font-bold text-gray-600 text-lg'>Your Complaints</h3>
                </div>
                <div>
                    <Card>
                        <div>
                            <div className='flex gap-5 items-center'>
                                <h3 className='font-bold'>Payment delay for October tours</h3>
                                <p className='flex items-center gap-1 mt-1 px-2 py-1 bg-blue-200 text-blue-800 text-xs rounded-full'>
                                    <ForwardIcon className="w-4 h-4" />
                                    Responded
                                </p>
                            </div>
                            <div className='text-sm text-gray-500'>
                                <p>Category: Payment Issues</p>
                                <p>Submitted: Apr 4,2025</p>
                            </div>
                            <div className='my-5 pb-5 border-b-2'>
                                <div>
                                    <p>During the city tour on November 8th, a group of travelers were consistently late, disruptive, and ignored safety instructions...</p>
                                </div>
                                <div className='flex gap-2 items-start mt-3 bg-blue-200 p-4 rounded-lg border-l-4 border-blue-600'>
                                    <div className='bg-blue-100 p-2 rounded-full'>
                                        <User />
                                    </div>
                                    <div className='text-sm items-center'>
                                        <div className='flex gap-2 mb-2 items-center'>
                                            <p className='text-md'>Admin Response</p>
                                            <p>Apr 6, 2025</p>
                                        </div>
                                        <div>
                                            <p>Thank you for reporting this. We&apos;ve contacted the travelers and issued a warning. We&apos;re also implementing stricter guidelines for future bookings. You&apos;ll receive a bonus payment for handling this difficult situation professionally.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center text-sm'>
                                <div className='flex gap-5'>
                                    <div className='gap-1 flex items-center'>
                                        <Paperclip className='w-4 h-4' />
                                        <p>1 attachment</p>
                                    </div>
                                    <div className='gap-1 flex items-center'>
                                        <TimerReset className='w-4 h-4' />
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                                <div className='text-blue-600 hover:text-blue-800'>
                                    <Link to={'/guide-earnings'}>View details</Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <div className='flex gap-5 items-center'>
                                <h3 className='font-bold'>Payment delay for October tours</h3>
                                <p className='flex items-center gap-1 mt-1 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full'>
                                    <Clock className="w-4 h-4" />
                                    Pending
                                </p>
                            </div>
                            <div className='text-sm text-gray-500'>
                                <p>Category: Payment Issues</p>
                                <p>Submitted: Apr 4,2025</p>
                            </div>
                            <div className='my-5 pb-5 border-b-2'>
                                <p>I haven&apos;t received payment for the tours I conducted in October. The payment was supposed to be processed by November 10th according to our agreement...</p>
                            </div>
                            <div className='flex justify-between items-center text-sm'>
                                <div className='flex gap-5'>
                                    <div className='gap-1 flex items-center'>
                                        <Paperclip className='w-4 h-4' />
                                        <p>1 attachment</p>
                                    </div>
                                    <div className='gap-1 flex items-center'>
                                        <TimerReset className='w-4 h-4' />
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                                <div className='text-blue-600 hover:text-blue-800'>
                                    <Link to={'/guide-earnings'}>View details</Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div>
                            <div className='flex gap-5 items-center'>
                                <h3 className='font-bold'>Payment delay for October tours</h3>
                                <p className='flex items-center gap-1 mt-1 px-2 py-1 bg-green-200 text-green-800 text-xs rounded-full'>
                                    <Check className="w-4 h-4" />
                                    Resolved
                                </p>
                            </div>
                            <div className='text-sm text-gray-500'>
                                <p>Category: Payment Issues</p>
                                <p>Submitted: Apr 4,2025</p>
                            </div>
                            <div className='my-5 pb-5 border-b-2'>
                                <div>
                                    <p>The GPS device provided for the mountain hiking tour malfunctioned, causing navigation issues and delays...</p>
                                </div>
                                <div className='flex gap-2 items-start mt-3 bg-green-200 p-4 rounded-lg border-l-4 border-green-600'>
                                    <div className='bg-green-100 p-2 rounded-full'>
                                        <User />
                                    </div>
                                    <div className='text-sm items-center'>
                                        <div className='flex gap-2 mb-2 items-center'>
                                            <p className='text-md'>Admin Response</p>
                                            <p>Apr 6, 2025</p>
                                        </div>
                                        <div>
                                            <p>We&apos;ve replaced all GPS devices and implemented a pre-tour equipment check protocol. You&apos;ll receive compensation for the inconvenience caused. Thank you for your quick thinking in handling the situation.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-between items-center text-sm'>
                                <div className='flex gap-5'>
                                    <div className='gap-1 flex items-center'>
                                        <Paperclip className='w-4 h-4' />
                                        <p>1 attachment</p>
                                    </div>
                                    <div className='gap-1 flex items-center'>
                                        <TimerReset className='w-4 h-4' />
                                        <p>2 days ago</p>
                                    </div>
                                </div>
                                <div className='text-blue-600 hover:text-blue-800'>
                                    <Link to={'/guide-earnings'}>View details</Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Main>
    )
}

export default GuideComplaints
