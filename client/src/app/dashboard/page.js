"use client";

import { useEffect, useState } from "react";
import { fetchProfileData } from "@/lib/api";
import OrderForm from "@/components/OrderForm";
import TimeSeriesData from "@/components/TimeSeriesData";
import HoldingsData from "@/components/HoldingsData";
// import "./page.css";
import '@/styles/globals.css'; 



export default function DashboardPage() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleProfileData = async () => {
        try {
            const response = await fetchProfileData();
            setProfileData(response);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        handleProfileData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className="profile-container">
                <h1>User Profile</h1>
                <p><span>User ID:</span> {profileData.data.user_id}</p>
                <p><span>Email:</span> {profileData.data.email}</p>
                <p><span>User Name:</span> {profileData.data.user_name}</p>
                <p><span>Broker:</span> {profileData.data.broker}</p>
                <p><span>User Type:</span> {profileData.data.user_type}</p>
            </div>
            <HoldingsData />
            <TimeSeriesData />
            <OrderForm />
        </div>
    );
}
