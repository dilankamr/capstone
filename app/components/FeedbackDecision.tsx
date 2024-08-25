import { Feedback } from '../feedback/feedback';
import React from 'react';
import { hedding } from "@/app/components/primitives";

interface DisplayFeedbackPageProps {
    feedbacks: Feedback[];
    setCurrentStep: (step: number) => void;
    onClose: () => void;  
}

const DisplayFeedbackPage: React.FC<DisplayFeedbackPageProps> = ({ feedbacks, setCurrentStep, onClose }) => {
    return (
        <div className="fixed bottom-0 right-0 z-50 m-4 ">
            <div className="relative w-full max-w-lg bg-black shadow-lg rounded-lg p-0 text-white p-2">
                <button
                    className="absolute top-2 right-2 text-white hover:text-gray-400"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Heading */}
                <div className="text-center justify-center mb-5 p-4">
                    <h3 className={hedding({ size: "sm" })}>Do you like to give feedback for this</h3>
                    <h2 className={hedding({ color: "violet", size: "md" })}> Guide?</h2>
                    <br />
                </div>

                {/* Buttons */}
                <div className="flex justify-around mb-5">
                    <button
                        className="w-1/4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
                        onClick={() => setCurrentStep(2)}
                    >
                        Yes
                    </button>
                    <button
                        className="w-1/4 bg-black border border-gray-600 text-white py-2 rounded-md hover:bg-gray-500"
                        onClick={() => setCurrentStep(3)}
                    >
                        No
                    </button>
                </div>

                
            </div>
        </div>
    );
};

export default DisplayFeedbackPage;
