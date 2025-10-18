// src/pages/guide/hooks/useGuideRequests.js
import { useState, useEffect } from 'react'
import { getRequest, putRequest } from '../../../core/service'

const useGuideRequests = (guideId) => {
    const [tourRequests, setTourRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!guideId) {
            setError('Guide ID not provided')
            setLoading(false)
            return
        }

        const fetchRequests = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await getRequest(`/api/guid-requests/guid/${guideId}`)
                
                if (!Array.isArray(response)) {
                    setTourRequests([])
                    setLoading(false)
                    return
                }

                const pendingRequests = response.filter(req => req.status === 'pending')

                const transformedRequests = pendingRequests.map(req => ({
                    requestId: req.id,
                    tripId: req.trip?.id,
                    customer: {
                        user_id: req.user?.id,
                        name: req.travelerName || `${req.user?.firstName} ${req.user?.lastName}`,
                        email: req.travelerEmail || req.user?.email,
                        phone: req.travelerPhone || req.user?.phone,
                        image: req.user?.profilePictures?.[0] || null,
                        joined: req.user?.createdAt 
                            ? new Date(req.user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
                            : 'Unknown'
                    },
                    tour: {
                        tour_id: req.trip?.id,
                        destination: req.trip?.destination || 'Not specified',
                        date: formatTripDates(req.trip?.tripStartDate, req.trip?.tripEndDate),
                        groupSize: String((req.trip?.numberOfAdults || 0) + (req.trip?.numberOfKids || 0)),
                        duration: calculateDuration(req.trip?.tripStartDate, req.trip?.tripEndDate) || req.trip?.duration || '0',
                    },
                    payment: {
                        payment_id: req.id,
                        dailyRate: formatCurrency(req.trip?.basePrice || 0),
                        totalAmount: formatCurrency(req.amount || (req.trip?.basePrice * parseInt(calculateDuration(req.trip?.tripStartDate, req.trip?.tripEndDate))) || 0),
                        status: 'Pending Payment',
                        deadline: calculateDeadline(req.createdAt),
                        due: req.requestedDate 
                            ? new Date(req.requestedDate).toLocaleDateString()
                            : 'Not specified',
                    },
                    accommodation: transformAccommodation(req.trip?.selectedHotels, req.trip?.selectedRooms),
                    transport: transformTransport(req.trip?.selectedVehicle, req.trip?.selectedVehicleAgency),
                    itinerary: transformItinerary(req.trip?.itineraryJson),
                    rawData: req
                }))

                setTourRequests(transformedRequests)
            } catch (err) {
                setError(err.message || 'Failed to fetch tour requests')
                console.error('Error fetching requests:', err)
                setTourRequests([])
            } finally {
                setLoading(false)
            }
        }

        fetchRequests()
    }, [guideId])

    const acceptRequest = async (requestId, tripId, guideId) => {
        try {
            setError(null)
            
            const tripPayload = {
                selected_guide_id: guideId,
                trip_status: 'accepted'
            }
            
            await putRequest(`/trips/${tripId}`, tripPayload)
            
            const requestPayload = {
                status: 'accepted'
            }
            
            await putRequest(`/api/guid-requests/${requestId}`, requestPayload)
            
            setTourRequests(prev => prev.filter(req => req.requestId !== requestId))
            
            return true
        } catch (err) {
            setError(err.message || 'Failed to accept request')
            console.error('Error accepting request:', err)
            throw err
        }
    }

    const rejectRequest = async (requestId) => {
        try {
            setError(null)
            
            const payload = {
                status: 'rejected'
            }
            
            await putRequest(`/api/guid-requests/${requestId}`, payload)
            
            setTourRequests(prev => prev.filter(req => req.requestId !== requestId))
            
            return true
        } catch (err) {
            setError(err.message || 'Failed to reject request')
            console.error('Error rejecting request:', err)
            throw err
        }
    }

    return {
        tourRequests,
        loading,
        error,
        acceptRequest,
        rejectRequest
    }
}

function formatTripDates(startDate, endDate) {
    if (!startDate || !endDate) return 'Not specified'
    
    try {
        const start = new Date(startDate)
        const end = new Date(endDate)
        
        const monthStart = start.toLocaleDateString('en-US', { month: 'short' })
        const dayStart = start.getDate()
        const monthEnd = end.toLocaleDateString('en-US', { month: 'short' })
        const dayEnd = end.getDate()
        const year = end.getFullYear()
        
        return `${monthStart} ${dayStart}–${monthEnd} ${dayEnd}, ${year}`
    } catch {
        return 'Invalid dates'
    }
}

function calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) return '0'
    
    try {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        return String(diffDays)
    } catch {
        return '0'
    }
}

function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function calculateDeadline(createdDate) {
    if (!createdDate) return 'Unknown'
    
    try {
        const created = new Date(createdDate)
        const deadline = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000)
        const today = new Date()
        const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
        
        return daysLeft > 0 ? `${daysLeft} days left` : 'Expired'
    } catch {
        return 'Unknown'
    }
}

function transformAccommodation(hotels, rooms) {
    if (!hotels || hotels.length === 0) return []
    
    return hotels.map((hotel, idx) => ({
        hotelName: hotel.hotelName || 'Hotel',
        roomType: rooms?.[idx]?.roomType || 'Standard Room',
        nights: rooms?.[idx]?.nights || 1,
        dates: 'Not specified',
        price: formatCurrency(rooms?.[idx]?.pricePerNight || hotel.pricePerNight || 0)
    }))
}

function transformTransport(vehicle, agency) {
    if (!vehicle) return null
    
    return {
        type: vehicle.vehicleType || 'Vehicle',
        details: `${vehicle.vehicleModel || ''} - ${agency?.agencyName || 'Agency'}`,
        price: formatCurrency(vehicle.basePrice || 0)
    }
}

function transformItinerary(itineraryJson) {
    if (!itineraryJson) return []
    
    try {
        if (Array.isArray(itineraryJson)) {
            return itineraryJson
        }
        
        if (typeof itineraryJson === 'string') {
            const parsed = JSON.parse(itineraryJson)
            if (Array.isArray(parsed)) {
                return parsed
            }
        }
        
        return []
    } catch (err) {
        console.error('Error parsing itinerary:', err)
        return []
    }
}

export default useGuideRequests