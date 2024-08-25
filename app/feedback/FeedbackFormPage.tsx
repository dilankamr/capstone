'use client'
import React, { FormEvent, useEffect } from 'react';
import { FeedbackRequest } from './feedback';
import { FaStar } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { createFeedback } from '@/service/feedback.service';
import { axiosInstance } from '@/lib/axios';


interface FeedbackFormPageProps {
    setCurrentStep: (step: number) => void;
    feedbackText: string;
    setFeedbackText: (text: string) => void;
    rating: number;
    setRating: (rating: number) => void;
    handleFeedbackSubmit: (feedbackRequest: FeedbackRequest) => void;
    isOpen: boolean;
    onClose: () => void;
    guideId: string;
    
}

const FeedbackFormPage: React.FC<FeedbackFormPageProps> = ({
    setCurrentStep,
    feedbackText,
    setFeedbackText,
    rating,
    setRating,
    handleFeedbackSubmit,
    isOpen,
    onClose,
    guideId
    
}) => {
    const { data: session } = useSession();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (feedbackText && rating) {
            const feedbackRequest: FeedbackRequest = {
                content: feedbackText,
                rating,
                student: session?.user.id || '',
                guide:guideId,
            };

            try {
                await createFeedback(axiosInstance, feedbackRequest);
                setCurrentStep(3);
                onClose();
                window.location.reload();
            } catch (error) {
                console.error('Failed to submit feedback:', error);
                alert('There was an error submitting your feedback. Please try again.');
            }
        } else {
            alert('Please provide feedback and a rating.');
        }
        console.log(guideId)
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-hidden">
            <div className="w-full max-w-xl mx-auto bg-gray-900 shadow-lg rounded-lg p-6 text-white relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition"
                >
                    X
                </button>
                <h2 className="text-lg font-bold text-center mb-4">What was it like working with this guide?</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        placeholder="Type your comment here..."
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        required
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <h4 className="text-md font-semibold mb-2 text-gray-400">Rate to the guide</h4>
                    <div className="flex space-x-2 mb-4">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <label key={index} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="hidden"
                                        value={starValue}
                                        onClick={() => setRating(starValue)}
                                    />
                                    <FaStar
                                        className="text-3xl"
                                        color={starValue <= rating ? "#CFFF04" : "#4b5563"}
                                    />
                                </label>
                            );
                        })}
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition-colors duration-200"
                        onClick={handleSubmit}
                    >
                        Send Feedback
                    </button>
                </form>
            </div>
        </div>
    );
    
    
};

export default FeedbackFormPage;
