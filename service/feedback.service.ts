
import { Feedback, FeedbackRequest } from '../app/feedback/feedback';

const API_URL = 'http://127.0.0.1:3000/feedbacks';

export const fetchFeedbacks = async (axiosInstance: any): Promise<Feedback[]> => {
    const response = await axiosInstance.get(API_URL);
    return response.data.map((feedback: any) => ({
        ...feedback,
        student: {
            id: feedback.student.id,
            firstName: feedback.student.firstName,
            lastName: feedback.student.lastName,
            email: feedback.student.email,
        },
        guide: {
            id: feedback.guide.id,
            firstName: feedback.guide.firstName,
        }
    }));
};

export const createFeedback = async (axiosInstance: any, feedback: FeedbackRequest): Promise<Feedback> => {
    const response = await axiosInstance.post(API_URL, feedback);
    return response.data;
};

export const deleteFeedback = async (axiosInstance: any, id: string): Promise<void> => {
    try {
        await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Failed to delete feedback:', error);
        throw error;
    }
};
