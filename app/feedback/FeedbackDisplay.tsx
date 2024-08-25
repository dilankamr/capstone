import React, { useState } from 'react';
import { Feedback } from './feedback';
import { FaStar, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
    handleDeleteFeedback: (id: string) => void;
}

const DisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, handleDeleteFeedback }) => {
    const { data: session } = useSession();
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const canDelete = (feedback: Feedback): boolean => {
        return session?.user?.id === feedback.student.id;
    };

    const visibleFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);  

    return (
        <div className="inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 mb-20 ">
            <div className="w-full max-w-3xl mx-auto bg-black shadow-lg rounded-lg p-8 text-white relative">
                <h2 className="text-1xl font-bold text-left mb-4">Comments</h2>
                <div className="space-y-6">
                    <div className="max-h-[30rem] overflow-y-auto pr-2">
                        {visibleFeedbacks.map((feedback) => (
                            <div key={feedback.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                                <div className="flex items-start space-x-4 mb-2">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/009/210/368/small/review-icon-line-monoline-symbol-suggestions-and-critics-customer-chat-gives-an-assessment-vector.jpg"
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    
                                        
                                        {canDelete(feedback) && (
                                            <div className="flex space-x-4 text-sm text-gray-400">
                                                <button
                                                    onClick={() => handleDeleteFeedback(feedback.id)}
                                                    className="flex items-center space-x-1 hover:text-white"
                                                >
                                                    <FaTrash /> <span>Delete</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            
                        ))}
                    </div>
                    {!showAll && feedbacks.length > 3 && (
                        <div className="flex justify-center">
                            <button
                                onClick={toggleShowAll}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600"
                            >
                                Show more
                            </button>
                        </div>
                    )}
                    {showAll && (
                        <div className="flex justify-center">
                            <button
                                onClick={toggleShowAll}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md mt-4 hover:bg-gray-600"
                            >
                                Show less
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisplayFeedbackPage;
