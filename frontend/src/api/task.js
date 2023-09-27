import instance from './axios'

export const createTaskRequest = (task) => instance.post(`/tasks/newtask`, task);

export const getTasksRequest = ()  => instance.get(`/tasks/tasks`);

export const getTaskRequest = (id) => instance.get(`/tasks/task/${id}`);

export const updateTaskRequest = (id, task) => instance.put(`/tasks/task/${id}`, task);

export const deleteTaskRequest = (id) => instance.delete(`/tasks/task/${id}`);

export const verifyTokenRequestTask = () => instance.get('/verify');
  