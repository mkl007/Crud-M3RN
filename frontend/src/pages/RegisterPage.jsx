import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export const RegisterPage = () => {

  const {
    register,
    handleSubmit,
    formState: { errors }, } = useForm();

  const { signup, isAuthenticated, errors: RegisterErros } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')

  })

  const onSubmit = handleSubmit(async (values) => {
    await signup(values)
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
            <input type="text" className="form-control"  {...register("name", { required: true })} placeholder='Name' />
            {errors.name && (<p className='badge bg-warning' >Username Required</p>)}
            <hr />
            <input type="email" className="form-control" {...register("email", { required: true })} placeholder='Email' />
            {errors.email && (<p className='badge bg-warning' >Email Required</p>)}

            <hr />
            <input type="password" className="form-control" {...register("password", { required: true })} placeholder='Contraseña' />
            {errors.password && (<p className='badge bg-warning' >Password Required</p>)}

            <br />
            <button className='btn btn-success' type="submit">Register</button>
          </form>
          <p>Dont have an account? <Link to={'/login'}>Signin</Link></p>

        </div>
      </div>
    </div>
  )
}

