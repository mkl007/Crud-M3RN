
// import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const NavBar = () => {
    const { isAuthenticated, logout, user } = useAuth()

    const logoutFunction = () => {
        logout();
    };
    return (
        <div className=''>

            <nav className="navbar fixed navbar-expand-xl bg-dark navbar-fixed-top" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>Tasks Manager</Link>
                    {isAuthenticated ? (
                        <>
                            <div className="collapse navbar-collapse col-md-2" id="navbarColor02">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        { }
                                        <Link className="nav-link disabled">Welcome <b>{user.name}</b></Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/newTask'}>Add Task</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'tasks'}>Tasks</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    {/* {user.id} */}
                                    <li className="nav-item">
                                        <button onClick={logoutFunction}><Link className="nav-link" >Logout</Link></button>
                                    </li>
                                </ul>
                            </div>

                        </>
                    ) : (
                        <>
                            <div className="collapse navbar-collapse col-md-2" id="navbarColor02">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link active" to={'/login'}>Login
                                            <span className="visually-hidden">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/register'}>register</Link>
                                    </li>

                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}
