export interface Task {
    _id?: string;
    title: string;
    description: string;
    completed: boolean;
    status: 'In Progress' | 'Completed' | "Won't do";
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
