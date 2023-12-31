import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


export const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm()

    const { signin, errors: signinErrors, isAuthenticated } = useAuth()
    const navitage = useNavigate()

    const onSubmit = handleSubmit((data) => {
        signin(data)
    })


    useEffect(() => {
        if (isAuthenticated) navitage('/tasks')
    })
    return (
        <div className="container">
            <div className="row">
                <h1>Login</h1>

                <div className="col-md-6">
                    {
                        signinErrors.map((error, i) => (
                            <span className="badge bg-danger" key={i}>{error}</span>

                        ))
                    }
                    <form onSubmit={onSubmit} className="card card-body">
                        <input type="email" className="form-control" {...register("email", { required: true })} placeholder='Email' />
                        {errors.email && (<p className='badge bg-warning' >Email Required</p>)}

                        <hr />
                        <input type="password" className="form-control" {...register("password", { required: true })} placeholder='Contraseña' />
                        {errors.password && (<p className='badge bg-warning' >Password Required</p>)}

                        <br />
                        <button className='btn btn-success' type="submit">Login</button>
                    </form>
                    <p>Dont have an account? <Link to={'/register'}>Sign Up</Link></p>
                </div>
            </div>


        </div>
    )
}
