import { useEffect, useState } from 'react';
import { fetchFeedbacks } from '../../service/feedback.service'; 
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

interface Feedback {
    rating: number;
    guide: {
        id: string;
    };
}

interface Ratings {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
}

const CustomGraph = ({ guideId }: { guideId: string }) => {
    const [ratings, setRatings] = useState<Ratings>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFeedbacks = async () => {
            try {
                const feedbacks: Feedback[] = await fetchFeedbacks(axios);
                const guideFeedbacks = feedbacks.filter(feedback => feedback.guide.id === guideId);

                const totalFeedbacks = guideFeedbacks.length;
                const ratingCounts: Ratings = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

                guideFeedbacks.forEach(feedback => {
                    ratingCounts[feedback.rating as keyof Ratings] += 1;
                });

                const ratingPercentages: Ratings = {
                    1: (ratingCounts[1] / totalFeedbacks) * 100,
                    2: (ratingCounts[2] / totalFeedbacks) * 100,
                    3: (ratingCounts[3] / totalFeedbacks) * 100,
                    4: (ratingCounts[4] / totalFeedbacks) * 100,
                    5: (ratingCounts[5] / totalFeedbacks) * 100,
                };

                setRatings(ratingPercentages);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch feedbacks:', error);
            }
        };

        getFeedbacks();
    }, [guideId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const data = {
        labels: ['1⭐', '2⭐', '3⭐', '4⭐', '5⭐'],
        datasets: [
            {
                label: 'Ratings',
                data: [ratings[1], ratings[2], ratings[3], ratings[4], ratings[5]],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192,1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
                barPercentage: 0.2,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,  
            },
            datalabels: {
                color: '#03DAC6',
                align: 'end' as 'end',
                anchor: 'end' as 'end',
                formatter: (value: number) => `${value.toFixed(1)}%`,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.raw.toFixed(1)}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#3498db'
                },
                ticks: {
                    color: '#03DAC6',  
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: '#3498db'
                },
                
                ticks: {
                    stepSize: 25,
                    callback: (value: string | number) => `${value}`,
                    color: '#03DAC6', 
                },
                
            },
        },
        layout: {
            padding: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 10,
            },
        },
          
    };

    return (
        <div className="p-6 max-w-4xl mx-auto rounded-xl shadow-md space-y-4 bg-black">
            <div className="relative bg-black p-4 rounded-lg shadow">
                <div className="relative bg-black p-4 rounded-lg shadow" style={{ width: '100%', height: '400px' }}>
                    <Bar data={data} options={options} plugins={[ChartDataLabels]} />
                </div>
            </div>
        </div>
    );
};

export default CustomGraph;
