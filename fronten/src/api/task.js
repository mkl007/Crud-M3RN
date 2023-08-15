// import axios from 'axios'
import axios from './axios'

export const createTaskRequest = (task) => axios.post(`/nota/crear`, task);

export const getTasksRequest = ()  => axios.get(`/nota`);

// export const getTaskRequest = (id) => axios.get(`/nota/tasks/${id}`);
export const getTaskRequest = (id) => axios.get(`/nota/tasks/${id}`);

export const updateTaskRequest = (task) => axios.put('/nota/tasks', task);

export const deleteTaskRequest = (id) => axios.delete(`/nota/tasks/${id}`);

export const verifyTokenRequestNota = () => axios.get('/verify');

