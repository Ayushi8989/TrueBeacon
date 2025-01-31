import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const PriceChart = ({ data }) => {
    if (data.length === 0) return <p>No data available</p>;

    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Price',
                data: data.map(item => parseFloat(item.price)),
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default PriceChart;