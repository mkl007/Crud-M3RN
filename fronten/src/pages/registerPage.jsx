import { useForm } from 'react-hook-form'
import { useAuth } from "../context/authContext";
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export function RegisterPage() {

  const {
    register,
    handleSubmit,
    formState: { errors }, } = useForm();

  const { signup, isAuthenticated, errors: RegisterErros } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])


  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  })

  return (
    <div className='container'>
      <div className="row">
        <h1>Register</h1>
        <div className="col-md-4">
          {
            RegisterErros.map((error, i) => (
              <span className="badge bg-danger" key={i}>{error}</span>

            ))
          }
          <form onSubmit={onSubmit} className="card card-body">
            <input type="text" className="form-control"  {...register("nombre", { required: true })} placeholder='Nombre' />
            {errors.nombre && (<p className='badge bg-warning' >Username Required</p>)}
            <hr />
            <input type="email" className="form-control" {...register("email", { required: true })} placeholder='Email' />
            {errors.email && (<p className='badge bg-warning' >Email Required</p>)}

            <hr />
            <input type="password" className="form-control" {...register("password", { required: true })} placeholder='Contraseña' />
            {errors.password && (<p className='badge bg-warning' >Password Required</p>)}

            <br />
            <button className='btn btn-success' type="submit">Register</button>
          </form>
          <p>Don't have an account? <Link to={'/login'}>Signin</Link></p>

        </div>
      </div>
    </div>
  )
}

export default RegisterPage