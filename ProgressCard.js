import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const ProgressCard = () => {
    const scores = [7.0, 7.5, 8.2, 9.0];
    const average = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2);
    const estimatedBac = (parseFloat(average) + 0.5).toFixed(1);

    const data = {
        labels: ['Săpt. 1', 'Săpt. 2', 'Săpt. 3', 'Săpt. 4'],
        datasets: [
            {
                label: 'Progres săptămânal',
                data: scores,
                fill: true,
                borderColor: '#008080',
                backgroundColor: 'rgba(0,128,128,0.1)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                min: 5,
                max: 10,
            },
        },
    };

    return (
        <div className="progress-card">
            <h3>📈 Progresul elevului din imagine</h3>
            <p className="progress-note">
                Elevul participă la lecții săptămânale de matematică. Progresul este monitorizat de profesorul coordonator.
            </p>

            <Line data={data} options={options} />

            <ul className="score-list">
                {scores.map((score, i) => (
                    <li key={i}>Săptămâna {i + 1}: {score}</li>
                ))}
            </ul>

            <p className="estimate">🧠 Estimare Bac: <strong>{estimatedBac}</strong></p>
            <p className="progress-footnote">🔍 Exemplu demonstrativ generat din simulări reale.</p>
        </div>
    );
};

export default ProgressCard;