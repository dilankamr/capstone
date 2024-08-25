"use client";
import React, { useState, useEffect } from 'react';
import { fetchFeedbacks, createFeedback, deleteFeedback } from '../../service/feedback.service';
import { Feedback, FeedbackRequest } from './feedback';
import FeedbackDecision from '../components/FeedbackDecision';
import FeedbackFormPage from './FeedbackFormPage';
import FeedbackDisplay from './FeedbackDisplay';
import useAxiosAuth from '@/lib/hook/useAxiosAuth';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';


const HomePage = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const axiosAuth = useAxiosAuth();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const guideId = searchParams?.get('id') || '';



    useEffect(() => {
        loadFeedbacks();
    }, [axiosAuth]);

    const loadFeedbacks = async () => {
        try {
            const feedbackList = await fetchFeedbacks(axiosAuth);
            setFeedbacks(feedbackList);
        } catch (error) {
            console.error('Error loading feedbacks:', error);
        }
    };

    const handleFeedbackSubmit = async (feedbackRequest: FeedbackRequest) => {
        try {
            await createFeedback(axiosAuth, feedbackRequest);
            setCurrentStep(3);
            loadFeedbacks();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    console.log(guideId);

    const handleDeleteFeedback = async (id: string) => {
        try {
            const feedbackToDelete = feedbacks.find((feedback) => feedback.id === id);
            if (!feedbackToDelete) {
                console.error(`Feedback with id ${id} not found.`);
                return;
            }

            // Check ownership before deletion
            if (session?.user?.id === feedbackToDelete.student.id) {
                await deleteFeedback(axiosAuth, id);
                loadFeedbacks();
            } else {
                console.error('You are not authorized to delete this feedback.');
            }
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleClose = () => {
        setCurrentStep(1);
    };

    return (
        <div className="bg-black text-white w-3/5 relative left-2">
            {currentStep === 1 && (
                <FeedbackDecision setCurrentStep={setCurrentStep} feedbacks={feedbacks} onClose={handleClose} />
            )}
            {currentStep === 2 && (
                <FeedbackFormPage
                    setCurrentStep={setCurrentStep}
                    feedbackText={feedbackText}
                    setFeedbackText={setFeedbackText}
                    rating={rating}
                    setRating={setRating}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                    isOpen={currentStep === 2}
                    onClose={handleClose}
                    guideId={guideId}
                />
            )}
        </div>
    );
};

export default HomePage;
