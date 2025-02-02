"use client";

import { useEffect, useState } from "react";
import { fetchHoldingsData } from "@/lib/api";
import DummyPrice from "./DummyPrice";

export default function HoldingsData() {
    const [holdingsData, setHoldingsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const handleHoldingData = async () => {
        try {
            const response = await fetchHoldingsData();
            setHoldingsData(response);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
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
        handleHoldingData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    } return (
        <div className="holdings-container">
            <h1>Holdings</h1>
            <div className="price-container">
                <div className="card">
                    <h4>Total Profit/Loss</h4>
                    <p>{calculateTotalProfitLoss()}</p>
                </div>
                <div className="card">
                    <h4>Real-Time Price Updates</h4>
                    <DummyPrice />
                </div>
            </div>
            <div className="table-container">
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
            </div>
        </div>
    );
}
