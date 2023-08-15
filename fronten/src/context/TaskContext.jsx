import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest } from "../api/task";


const TaskContent = createContext();

export const useTasks = () => {
    const context = useContext(TaskContent);

    if (!context) {
        return new Error("useTaks must be used within TaskProvider");
    }
    return context;
}


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        // console.log(res)
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            // setUser(user)
            setTasks(res.data)
            // console.log(res)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            console.log('ello')

            const res = await deleteTaskRequest(id);
            console.log(res)
            if (res.status === 204) {
                setTasks(tasks.filter(task => task._id !== id))

            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <TaskContent.Provider value={{ tasks, createTask, getTasks }}>
        <TaskContent.Provider value={{ tasks, createTask, getTasks, isAuthenticated, deleteTask }}>
            {children}
        </TaskContent.Provider>
    )
}