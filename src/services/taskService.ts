import api from './api';

export const getTasks = async () => {
    const response = await api.get('/tasks');
    return response.data.data;
};

export const createTask = async (task) => {
    const response = await api.post('/tasks', task);
    return response.data.data;
};
