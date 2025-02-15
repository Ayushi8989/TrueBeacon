import axios from "axios";
import { NextResponse } from "next/server";
import { use } from "react";

const API_BASE_URL = process.env.API_BASE_URL;
console.log(12345, API_BASE_URL)

// login handler
export const loginHandler = async (username, password) => {
    try {
        console.log(567890)
        console.log(2345, API_BASE_URL)
        const response = await axios.post(`${API_BASE_URL}/user/login`, {
            username,
            password
        })
        return response.data;
    } catch (error) {
        console.error("Registration Error: ", error.response?.data || error.message);
        return { success: false, message: error.message };
    }
}

// Registration handler
export const registerNewUser = async (username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register`, {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Registration Error: ", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
};

// get historical data
export const fetchHistoricalData = async (symbol, fromDate, toDate) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/historical-data`, {
            params: { symbol, from_date: fromDate, to_date: toDate },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error in fetching historical-data: ", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
};

// get profile data
export const fetchProfileData = async () => {
    try {
        console.log(2345, API_BASE_URL)
        const response = await axios.get(`${API_BASE_URL}/user/profile`);
        return response.data;
    } catch (error) {
        console.error("Error in fetching profile-data: ", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
};

// get holding_response data
export const fetchHoldingsData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/portfolio/holdings`);
        console.log(30, response.data.data)
        return response.data;
    } catch (error) {
        console.error("Error in fetching holdings-data: ", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
};

export const placeOrder = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}/order/place-order`);
        console.log(30, response.data)
        return response.data;
    } catch (error) {
        console.error("Error in placing order: ", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
};

