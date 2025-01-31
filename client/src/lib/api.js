import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

export const fetchHistoricalData = async (symbol, fromDate, toDate) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/historical-data`, {
            params: { symbol, from_date: fromDate, to_date: toDate },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data:", error);
        return [];
    }
};
