export interface Task {
    _id?: string;
    title: string;
    description: string;
    completed: boolean;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}
