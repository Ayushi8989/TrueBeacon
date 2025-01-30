"use client";

import { useState, useEffect } from "react";
import { fetchHistoricalData } from "../lib/api.js";
import PriceChart from "../components/priceChart.js";
import { format } from "date-fns";

export default function Home() {
    const [symbol, setSymbol] = useState("NIFTY 50");
    const [fromDate, setFromDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [toDate, setToDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [symbol, fromDate, toDate]);

    const fetchData = async () => {
        const result = await fetchHistoricalData(symbol, fromDate, toDate);
        console.log(20, result);
        setData(result);
    };

    return (
        <div className="container">
            <h1 className="heading">Historical Prices</h1>

            <div className="filters">
                <select
                    className="select"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                >
                    <option value="NIFTY 50">NIFTY 50</option>
                    <option value="NIFTY BANK">NIFTY BANK</option>
                </select>

                <input
                    type="date"
                    className="input"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                />

                <input
                    type="date"
                    className="input"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                />

                <button
                    className="button"
                    onClick={fetchData}
                >
                    Fetch Data
                </button>
            </div>

            <div className="chart-container">
                <PriceChart data={data} />
            </div>
        </div>
    );
}
