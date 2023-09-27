import { useEffect } from 'react'
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from  'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);



export const ViewTasks = () => {
    const { getTasks, tasks, deleteTask } = useTasks();

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    return (
        <div className=''>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    //desde aqui empieza la parte tomada de github
                    <div key={task._id}>
                        <div className="row">
                            <div>
                                <ul className="list-group">
                                    {/* <li className="list-group-item" >{task._id}</li> */}
                                    <li className="list-group-item"><h4>title: </h4>{task.title}</li>
                                    <li className="list-group-item"><h4>Description: </h4>{task.description}</li>
                                    <li className="list-group-item"><h4>Created: </h4>{dayjs(task.added).fromNow()}</li>
                                </ul>
                                <button className='btn btn-danger' onClick={() => { deleteTask(task._id) }}> Eliminar</button>
                                &nbsp;
                                <button className='btn btn-outline-primary'>
                                    <Link to={`/tasks/${task._id}`}>Edit</Link>
                                </button>
                                <hr className="mt-4" />
                            </div>
                        </div>
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

