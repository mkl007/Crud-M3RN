import React from 'react'
import { useAuth } from '../context/authContext'
import { useTasks } from '../context/TaskContext';
import { Link } from "react-router-dom";

export default function VerNotas() {
    const { getTasks, tasks } = useTasks();

    if (!tasks) {
        return (<h5>No hay Tareas</h5>)
    }

    return (
        tasks.map(task => (
            // <div key={task._id}>
            //   <h6>{task.titulo}</h6>
            //   <p>{task.descripcion}</p>
            // </div>
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
                        {/* <Link to={`/editartask/${task.idtask}`}><ul classNamse='btn btn-success'>Editar</ul></Link> */}
                        {/* &nbsp; */}

                        <button className='btn btn-danger'> Eliminar</button>
                        &nbsp;

                        <button className='btn btn-outline-primary'> Editar</button>
                        <hr className="mt-4" />
                    </div>
                </div>
            </div>

        ))
    )
}
