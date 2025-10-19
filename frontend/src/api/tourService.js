import { getRequest, postRequest } from '../core/service';

/**
 * Tour API Service
 * Handles all API calls related to tour creation and booking
 */

// Guide APIs
export const getAllGuides = async (params = {}) => {
    try {
        const guides = await getRequest('/api/guides', params);
        return guides;
    } catch (error) {
        console.error('Error fetching guides:', error);
        throw error;
    }
};

export const getGuideById = async (id) => {
    try {
        const guide = await getRequest(`/api/guides/${id}`);
        return guide;
    } catch (error) {
        console.error(`Error fetching guide ${id}:`, error);
        throw error;
    }
};

// Hotel APIs
export const getAllHotels = async () => {
    try {
        const hotels = await getRequest('/api/hotels');
        return hotels;
    } catch (error) {
        console.error('Error fetching hotels:', error);
        throw error;
    }
};

export const getHotelById = async (id) => {
    try {
        const hotel = await getRequest(`/api/hotels/${id}`);
        return hotel;
    } catch (error) {
        console.error(`Error fetching hotel ${id}:`, error);
        throw error;
    }
};

// Room APIs
export const getAllRooms = async () => {
    try {
        const rooms = await getRequest('/api/rooms');
        return rooms;
    } catch (error) {
        console.error('Error fetching rooms:', error);
        throw error;
    }
};

export const getRoomsByHotelId = async (hotelId) => {
    try {
        const rooms = await getRequest(`/api/rooms/hotel/${hotelId}`);
        return rooms;
    } catch (error) {
        console.error(`Error fetching rooms for hotel ${hotelId}:`, error);
        throw error;
    }
};

export const getRoomById = async (id) => {
    try {
        const room = await getRequest(`/api/rooms/${id}`);
        return room;
    } catch (error) {
        console.error(`Error fetching room ${id}:`, error);
        throw error;
    }
};

// Vehicle APIs
export const getAllVehicles = async () => {
    try {
        const vehicles = await getRequest('/api/vehicles');
        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export const getVehicleById = async (id) => {
    try {
        const vehicle = await getRequest(`/api/vehicles/${id}`);
        return vehicle;
    } catch (error) {
        console.error(`Error fetching vehicle ${id}:`, error);
        throw error;
    }
};

export const getVehiclesByAgencyId = async (agencyId) => {
    try {
        const vehicles = await getRequest(`/api/vehicles/agency/${agencyId}`);
        return vehicles;
    } catch (error) {
        console.error(`Error fetching vehicles for agency ${agencyId}:`, error);
        throw error;
    }
};

// Trip APIs
export const createTrip = async (tripData) => {
    try {
        const trip = await postRequest('/api/trips', tripData);
        return trip;
    } catch (error) {
        console.error('Error creating trip:', error);
        throw error;
    }
};

export const getTripById = async (id) => {
    try {
        const trip = await getRequest(`/api/trips/${id}`);
        return trip;
    } catch (error) {
        console.error(`Error fetching trip ${id}:`, error);
        throw error;
    }
};
