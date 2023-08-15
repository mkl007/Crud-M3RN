import { useForm } from "react-hook-form"
import { useState} from 'react'
import { useTasks } from "../context/TaskContext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function TaskFormPage() {
  const {
    register,
    handleSubmit, } = useForm();
  const { createTask } = useTasks();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, isSaved] = useState(false);


const onSubmit = handleSubmit(async (data) => {
  const taskData = {
    ...data,
    idusuario: user._id, // Agregar el ID del usuario al objeto de datos
  };
  try {
    await createTask(taskData);
    // alert("Nota creada");
    isSaved(true)
    function ejecutar(){
      navigate('/tasks');
    }
    setTimeout(() => {
      ejecutar();
    }, "2500");
 
    
  } catch (error) {
    console.error("Error al crear tarea:", error);
  }
});

  return (
    <div className="container">
      <div className="row" >
        { saved ? <h1>Note Saved :) ! </h1> : <h1>New Task</h1>}
        

        <div className="col-md-4">
          <form onSubmit={onSubmit} className="card card-body">
            <input type="text" className="form-control" {...register("titulo", { required: true })} placeholder='Titulo' />
            {/* {errors.email && (<p className='badge bg-warning' >Email Required</p>)} */}

            <hr />
            <textarea rows="3" placeholder="Descripcion" {...register("descripcion")} className="form-control" />
            {/* <textarea type="test" className="form-control" {...register("Descripcion", { required: true })} placeholder='Descripcion' /> */}
            {/* {errors.password && (<p className='badge bg-warning' >Password Required</p>)} */}

            <br />
            <button className='btn btn-success' type="submit">Guardar</button>
          </form>
        </div>
      </div>


    </div>
  )
}
