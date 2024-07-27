import api from './api';

export const getTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await api.post('/tasks', task);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await api.delete(`/tasks/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return error;
    }
};
