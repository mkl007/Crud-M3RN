import React, { useEffect } from 'react'
// import { useAuth } from '../context/authContext'
import { useTasks } from '../context/TaskContext';
import { Link } from 'react-router-dom'



export default function VerNotas() {
    const { getTasks, tasks, deleteTask } = useTasks();

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        tasks.map(task => (
            //desde aqui empieza la parte tomada de github
            <div className="container col-md-6" key={task._id}>
                <div className="row">
                    <div>
                        <ul className="list-group">
                            {/* <li className="list-group-item" >{task._id}</li> */}
                            <li className="list-group-item"><h4>Titulo: </h4>{task.titulo}</li>
                            <li className="list-group-item"><h4>Descripcion: </h4>{task.descripcion}</li>
                            <li className="list-group-item"><h4>Fecha: </h4>{task.fecha_creada}</li>
                        </ul>
                        <button className='btn btn-danger' onClick={() => { deleteTask(task._id) }}> Eliminar</button>
                        &nbsp;
                        {/* <button className='btn btn-outline-primary'> Editar</button> */}
                        <button className='btn btn-outline-primary'>
                            <Link to={`/tasks/${task._id}`}>Edit</Link>
                        </button>
                        <hr className="mt-4" />
                    </div>
                </div>
            </div>

        ))
    )
}
