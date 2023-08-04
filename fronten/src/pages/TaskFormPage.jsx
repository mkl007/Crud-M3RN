import { useForm } from "react-hook-form"
import React from 'react'
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


  // const onSubmit = handleSubmit((data) => {
  //   createTask(data);
  //   console.log(user.id);
  //   // console.log(user)

  // });
//   const onSubmit = handleSubmit((data) => {
//   const taskData = {
//     ...data,
//     id: user.id, // Agregar el ID del usuario al objeto de datos
//   };
//   createTask(taskData);
// });
const onSubmit = handleSubmit(async (data) => {
  const taskData = {
    ...data,
    idusuario: user.id, // Agregar el ID del usuario al objeto de datos
  };
  try {
    await createTask(taskData);
    console.log("Tarea creada exitosamente");
    alert("Nota creada");
    function ejecutar(){
      navigate('/tasks');
    }
    setTimeout(() => {
      ejecutar();
    }, "3000");
    
  } catch (error) {
    console.error("Error al crear tarea:", error);
  }
});

  return (
    <div className="container">
      <div className="row" >
        <h1>New Task</h1>

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
