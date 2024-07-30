import axios from 'axios';
import { Task } from '../types/task';

const API_URL = '/api/tasks';

export const getTasks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const createTask = async (task: Task) => {
    try {
        const response = await axios.post(API_URL, task);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const updateTask = async (id: string, task: Task) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, task);
        return response.data.data; 
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteTask = async (id: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};
