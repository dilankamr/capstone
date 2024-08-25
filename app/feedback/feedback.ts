export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Feedback {
    id: string;
    content: string;
    student: Student;
    guide: Guide;
    rating: number;
    userId: string;
    createdAt: string;
}

export interface FeedbackRequest {
    content: string;
    student: string;
    rating: number;
    guide:string;
}

export interface Guide {
    id: string;
    firstName: string;
}
