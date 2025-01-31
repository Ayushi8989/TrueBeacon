"use client";

import { useEffect, useState } from "react";
import { fetchProfileData, fetchHoldingsData } from "@/lib/api";
import OrderForm from "@/components/OrderForm";
import "@/styles/card.css";

export default function DashboardPage() {
    const [profileData, setProfileData] = useState(null);
    const [holdingsData, setHoldingsData] = useState(null);
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

    const handleHoldingData = async () => {
        try {
            const response = await fetchHoldingsData();
            setHoldingsData(response);
        } catch (error) {
            setError(error.message);
        }
    };

    const calculateTotalProfitLoss = () => {
        if (holdingsData && holdingsData.data) {
            return holdingsData.data.reduce((total, holding) => {
                return total + holding.pnl; // Summing up the Profit and Loss values
            }, 0);
        }
        return 0;
    };

    useEffect(() => {
        handleProfileData();
        handleHoldingData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>User ID: {profileData.data.user_id}</p>
            <p>Email: {profileData.data.email}</p>
            <p>User Name: {profileData.data.user_name}</p>
            <p>Broker: {profileData.data.broker}</p>
            <p>User Type: {profileData.data.user_type}</p>

            <h1>Holdings</h1>
            <div className="card">
                <h4>Total Profit/Loss</h4>
                <p>{calculateTotalProfitLoss()}</p> 
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Tradingsymbol</th>
                        <th>Exchange</th>
                        <th>ISIN</th>
                        <th>Quantity</th>
                        <th>Authorised Date</th>
                        <th>Average Price</th>
                        <th>Last Price</th>
                        <th>Close Price</th>
                        <th>PnL</th>
                        <th>Day Change</th>
                        <th>Day Change Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {holdingsData &&
                        holdingsData.data.map((holding, index) => (
                            <tr key={index}>
                                <td>{holding.tradingsymbol}</td>
                                <td>{holding.exchange}</td>
                                <td>{holding.isin}</td>
                                <td>{holding.quantity}</td>
                                <td>{holding.authorised_date}</td>
                                <td>{holding.average_price}</td>
                                <td>{holding.last_price}</td>
                                <td>{holding.close_price}</td>
                                <td>{holding.pnl}</td>
                                <td>{holding.day_change}</td>
                                <td>{holding.day_change_percentage}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <OrderForm />
        </div>
    );
}
