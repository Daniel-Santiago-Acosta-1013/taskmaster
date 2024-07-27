import api from './api';
import { Task, ApiResponse } from '../types/task';

export const getTasks = async (): Promise<Task[] | null> => {
    try {
        const response = await api.get<ApiResponse<Task[]>>('/tasks');
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createTask = async (task: Task): Promise<Task | null> => {
    try {
        const response = await api.post<ApiResponse<Task>>('/tasks', task);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task | null> => {
    try {
        const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteTask = async (id: string): Promise<Task | null> => {
    try {
        const response = await api.delete<ApiResponse<Task>>(`/tasks/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};
