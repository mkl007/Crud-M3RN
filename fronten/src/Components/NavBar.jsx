// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function NavBar() {
//     return (
//         <div>

//             <nav>
//                 <ul>
//                     <li><Link to='/landing'> Landing</Link></li>
//                 </ul>
//                 <ul>
//                     <li><Link to='/home'> Home</Link></li>
//                 </ul>
//                 <ul>
//                     <li><Link to='/dashboard'> Dashboard</Link></li>
//                 </ul>
//                 <ul>
//                     <li><Link to='/analytics'> Analytics</Link></li>
//                 </ul>
//                 <ul>
//                     <li><Link to='/admin'> Admin</Link></li>
//                 </ul>
//             </nav>
//         </div>
//     )
// }

import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function NavBar() {
    const { isAuthenticated } = useAuth()
    return (
        <div className='container-large'>
            {/* <nav>
                <Link>
                    <h1>Tasks Manager</h1>
                </Link>
                <ul>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/register'}>Register</Link></li>
                </ul>
            </nav> */}
            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={'/'}>Tasks Manager</Link>
                    {isAuthenticated ? (
                        <>
                            <div className="collapse navbar-collapse col-md-2" id="navbarColor02">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <Link className="nav-link disabled">Welcome</Link>

                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'/newTask'}>Add Task</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to={'tasks'}>Tasks</Link>
                                    </li>
                                </ul>
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <button><Link className="nav-link" >Logout</Link></button>
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
