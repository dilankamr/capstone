import React from 'react';
import { FaStar, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import Slider from 'react-slick';
import { Feedback } from './feedback';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
    handleDeleteFeedback: (id: string) => void;
}

const GuideDisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, handleDeleteFeedback }) => {
    const { data: session } = useSession();

    const currentUserFeedbacks = feedbacks.filter(feedback => feedback.guide.id === session?.user?.id);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg p-8 text-white relative bg-opacity-10">
            <div className="space-y-6">
                <Slider {...sliderSettings}>
                    {currentUserFeedbacks.map((feedback) => (
                        <div key={feedback.id} className="flex justify-center">
                            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 m-6 relative flex flex-col h-80 ">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-500 opacity-30 pointer-events-none"></div>
                                <div className="flex items-start space-x-2 relative z-10 flex-grow">
                                    <img
                                        src="images/28.png"
                                        alt="Avatar"
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between mb-2">
                                            <p className="text-lg font-semibold">{feedback.student.firstName} {feedback.student.lastName}</p>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            {Array(feedback.rating).fill(0).map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" size={15} />
                                            ))}
                                            {Array(5 - feedback.rating).fill(0).map((_, i) => (
                                                <FaStar key={i + feedback.rating} className="text-gray-500" size={15} />
                                            ))}
                                        </div>
                                         
                                          <div className="text-gray-100 text-md overflow-y-auto max-h-36 mt-4 relative right-8"  >
                                            <p className="whitespace-pre-wrap m-0">{feedback.content}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <button
                                        onClick={() => handleDeleteFeedback(feedback.id)}
                                        className="flex items-center space-x-1 hover:text-white transition-colors duration-300"
                                    >
                                        <FaTrash className="text-red-500" size={12} /> <span className="text-sm text-red-500">Delete</span>
                                    </button>
                                    <div className="text-gray-300 text-xs flex flex-col items-end">
                                        <p>{new Date(feedback.createdAt).toLocaleDateString()}</p>
                                        <p>{new Date(feedback.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default GuideDisplayFeedbackPage;
