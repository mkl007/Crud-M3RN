// import axios from 'axios'
import axios from './axios'

export const createTaskRequest = (task) => axios.post(`/nota/crear`, task);

export const getTasksRequest = ()  => axios.get(`/nota`);

// export const getTaskRequest = (id) => axios.get(`/nota/tasks/${id}`);
export const getTaskRequest = (id) => axios.get(`/nota/${id}`);
// export const getTaskRequest = (id) => axios.get(`/nota/64e4d3a0dce9d0ce87d5bb5e`);

// export const updateTaskRequest = (id) => axios.put(`/nota/${id}`);
export const updateTaskRequest = (id, task) => axios.put(`/nota/${id}`, task);

// export const deleteTaskRequest = (id) => axios.delete(`/nota/tasks/${id}`);
export const deleteTaskRequest = (id) => axios.delete(`/nota/${id}`);

export const verifyTokenRequestNota = () => axios.get('/verify');

