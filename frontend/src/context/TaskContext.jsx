import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, updateTaskRequest, getTaskRequest } from "../api/task";


const TaskContent = createContext();


// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
    const context = useContext(TaskContent);

    if (!context) {
        return new Error("useTaks must be used within TaskProvider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function checkEmptyArrayTasks(res) {
        if (res.data) {
            setTasks(res.data)
        }
        else {
            // alert('error')
            console.log('Error in Taskcontext')
            // setTasks('No hya tareas')
        }
    }

    const createTask = async (task) => {
        createTaskRequest(task)
    }

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            checkEmptyArrayTasks(res)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id);
            // aqui hay que poner un componente que cargue un popup
            if (res.status === 204) {
                setTasks(tasks.filter(task => task._id !== id))
            }

        } catch (error) {
            console.log(error)
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        // <TaskContent.Provider value={{ tasks, createTask, getTasks }}>
        <TaskContent.Provider value={{ tasks, createTask, getTasks, isAuthenticated, deleteTask, getTask, updateTask }}>
            {children}
        </TaskContent.Provider>
    )
}