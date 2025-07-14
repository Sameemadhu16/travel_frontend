import Main from '../../components/Main'
import { Clock, Paperclip, TimerReset, User, ForwardIcon, Check } from 'lucide-react'
import Card from './guideComponents/Card'
import { Link } from 'react-router-dom'
// import { FaCalendar, FaFilter } from 'react-icons/fa'
import PrimaryButton from '../../components/PrimaryButton'

const GuideComplaints = () => {
    // Data array for complaints
    const complaintsData = [
        {
            id: 1,
            title: "Payment delay for October tours",
            category: "Payment Issues",
            submittedDate: "Apr 4, 2025",
            status: "Responded",
            statusColor: "orange",
            statusIcon: ForwardIcon,
            description: "During the city tour on November 8th, a group of travelers were consistently late, disruptive, and ignored safety instructions...",
            adminResponse: {
                date: "Apr 6, 2025",
                message: "Thank you for reporting this. We've contacted the travelers and issued a warning. We're also implementing stricter guidelines for future bookings. You'll receive a bonus payment for handling this difficult situation professionally."
            },
            attachments: 1,
            timeAgo: "2 days ago"
        },
        {
            id: 2,
            title: "Payment delay for October tours",
            category: "Payment Issues", 
            submittedDate: "Apr 4, 2025",
            status: "Pending",
            statusColor: "yellow",
            statusIcon: Clock,
            description: "I haven't received payment for the tours I conducted in October. The payment was supposed to be processed by November 10th according to our agreement...",
            adminResponse: null,
            attachments: 1,
            timeAgo: "2 days ago"
        },
        {
            id: 3,
            title: "Equipment malfunction during mountain tour",
            category: "Equipment Issues",
            submittedDate: "Apr 4, 2025", 
            status: "Resolved",
            statusColor: "orange",
            statusIcon: Check,
            description: "The GPS device provided for the mountain hiking tour malfunctioned, causing navigation issues and delays...",
            adminResponse: {
                date: "Apr 6, 2025",
                message: "We've replaced all GPS devices and implemented a pre-tour equipment check protocol. You'll receive compensation for the inconvenience caused. Thank you for your quick thinking in handling the situation."
            },
            attachments: 1,
            timeAgo: "2 days ago"
        }
    ]

    // Function to get status badge styling
    const getStatusBadge = (status, statusColor, StatusIcon) => {
        const colorClasses = {
            orange: "bg-orange-200 text-orange-800",
            yellow: "bg-yellow-200 text-yellow-800",
            green: "bg-green-200 text-green-800"
        }
        
        return (
            <p className={`flex items-center gap-1 mt-1 px-2 py-1 ${colorClasses[statusColor]} text-xs rounded-full`}>
                <StatusIcon className="w-4 h-4" />
                {status}
            </p>
        )
    }

    return (
        <Main>
            <div>
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Complaints</h1>
                        <p className="text-gray-600 mb-6">Submit and track your complaints to administration</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <PrimaryButton
                            text="+ &nbsp; New Complaint"
                            type={'button'}
                            className={'text-base'}
                        />
                    </div>
                </div>

                <div>
                    {complaintsData.map((complaint) => (
                        <Card key={complaint.id}>
                            <div>
                                <div className='flex gap-5 items-center'>
                                    <h3 className='font-bold'>{complaint.title}</h3>
                                    {getStatusBadge(complaint.status, complaint.statusColor, complaint.statusIcon)}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    <p>Category: {complaint.category}</p>
                                    <p>Submitted: {complaint.submittedDate}</p>
                                </div>
                                <div className='my-5 pb-5 border-b-2'>
                                    <div>
                                        <p>{complaint.description}</p>
                                    </div>
                                    {complaint.adminResponse && (
                                        <div className='flex gap-2 items-start mt-3 bg-orange-200 p-4 rounded-lg border-l-4 border-orange-600'>
                                            <div className='bg-orange-100 p-2 rounded-full'>
                                                <User />
                                            </div>
                                            <div className='text-sm items-center'>
                                                <div className='flex gap-2 mb-2 items-center'>
                                                    <p className='text-md'>Admin Response</p>
                                                    <p>{complaint.adminResponse.date}</p>
                                                </div>
                                                <div>
                                                    <p>{complaint.adminResponse.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex justify-between items-center text-sm'>
                                    <div className='flex gap-5'>
                                        <div className='gap-1 flex items-center'>
                                            <Paperclip className='w-4 h-4' />
                                            <p>{complaint.attachments} attachment{complaint.attachments > 1 ? 's' : ''}</p>
                                        </div>
                                        <div className='gap-1 flex items-center'>
                                            <TimerReset className='w-4 h-4' />
                                            <p>{complaint.timeAgo}</p>
                                        </div>
                                    </div>
                                    <div className='text-orange-600 hover:text-orange-800'>
                                        <Link to={'/guide-earnings'}>View details</Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </Main>
    )
}

export default GuideComplaints