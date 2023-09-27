import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const TaskFormPage = () => {
    const {
        register,
        handleSubmit,
        setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [saved, isSaved] = useState(false);
    // eslint-disable-next-line no-unused-vars

    const params = useParams();

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id);
                setValue('title', task.title)
                setValue('description', task.description)
                // setValue('edited', new )
            }
        }
        loadTask();
    }, [params.id, getTask, setValue]);

    useEffect(() => {
        user
    }, [user])

    function ejecutar() {
        navigate('/tasks');
    }


    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            updateTask(params.id, data)
            try {
                isSaved(true)
                // eslint-disable-next-line no-inner-declarations
                function ejecutar() {
                    navigate('/tasks');
                }
                setTimeout(() => {
                    ejecutar();
                }, "2500");


            } catch (error) {
                console.error("Operation failied:", error);
            }
        }
        else {
            if (user.id) {
                
                const taskData = {
                    ...data,
                    userId: user.id
                };
                try {
                    await createTask(taskData);
                    isSaved(true)
                    setTimeout(() => {
                        ejecutar();
                    }, "2500");


                } catch (error) {
                    console.error("Failed creating task:", error);
                }
            } else {
                const taskData = {
                    ...data,
                    userId: user._id
                };

                try {
                    await createTask(taskData);
                    isSaved(true)
                    setTimeout(() => {
                        ejecutar();
                    }, "2500");


                } catch (error) {
                    console.error("Failed creating task:", error);
                }
            }
        }
    }
    );

    return (
        <div className="container">
            <div className="row" >
                {saved ? <h1>Note Saved :) ! </h1> : <h1>New Task</h1>}


                <div className="col-md-6">
                    <form onSubmit={onSubmit} className="card card-body">
                        <input type="text" className="form-control" {...register("title", { required: true })} placeholder='Title' autoFocus  required/>

                        <hr />
                        <textarea rows="3" placeholder="Description" {...register("description")} className="form-control"  required/>
                        <hr />

                        <button className='btn btn-success' type="submit">Save</button>
                    </form>
                </div>
            </div>


        </div>
    )
}
