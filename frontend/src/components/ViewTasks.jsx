import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
//import { DeleteTaskComponent } from './DeleteTaskComponent';

dayjs.extend(relativeTime);

export const ViewTasks = () => {
    const { getTasks, tasks, deleteTask } = useTasks();

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const divGrandContainerStyle = {
        // border: "5px solid red",
        display: "flex",
        flexWrap: "wrap",
        // height: "500px",
        "@media screen and (maxWidth: 480px)": {
            border: "5px solid black",

        }
    }

    const divChildContainerStyle = {
        // border: "2px solid yellow",
        width: "250px",
        margin: "10px",
    }

    return (
        <div className='container ' style={divGrandContainerStyle}>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <div key={task._id} style={divChildContainerStyle}>
                        <div className="card border-secondary mb-3" >
                            <div className="card-header">Created: {dayjs(task.added).fromNow()}</div>
                            {task.edited ? (<div className="card-header">Edited: {dayjs(task.edited).fromNow()}</div>) : (<div></div>)}
                            <div className="card-body">
                                <h4 className="card-title">{task.title}</h4>
                                <p className="card-text">{task.description}</p>
                            </div>
                        </div>
                        <button className='btn btn-danger' onClick={() => { deleteTask(task._id) }}> Done</button>
                        &nbsp;
                        <button className='btn btn-outline-info  primary'>
                            <Link to={`/tasks/${task._id}`}>Edit</Link>
                        </button>

                    </div>

                ))
            ) : (
                <div>
                    <h2>No tasks yet</h2>
                </div>
            )}
        </div>
    )
}

