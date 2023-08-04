import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import { AuthProvider } from './context/authContext';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import { TaskProvider } from './context/TaskContext';
import NavBar from './Components/NavBar';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/newTask' element={<TaskFormPage />} />
              <Route path='/tasks/:id' element={<TaskFormPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App








///////////////////////////////////////////////////////////////////


// import React, { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import './index.css';
// import Logeo from './pages/Logeo';



// function App() {
//   // const [isOnline, setIsOnline] = useState(false);
//   // 
//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Logeo/>} />
//         {/* <Route path='/login' element={<Logeo/>} /> */}
//         {/* <Route path='/register' element={<RegisterPage />} />
//         <Route path='/tasks' element={<Tasks />} />
//         <Route path='/newTask' element={<h2>Adding tasks page</h2>} />
//         <Route path='/tasks/:id' element={<h2>Edit Task</h2>} />
//         <Route path='/profile' element={<h2>Profile page</h2>} /> */}
//       </Routes>
//     </Router>
//     // <div className='container'>
//     //   <h1>Notes CRUD</h1>
//     //   <Login/>
//     // </div>

//   );
// }

// export default App;

//////////////////////////// A PARTIR DE AQUI ESTOY TRABAJANDO CON LAS RUTAS PROTEGIDAS Y VARIOS ARCHIVOS
//COMO ""ProtectetdRoute"" AND ""Logeo""

// import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
// import { Landing, Home, Dashboard, Analytics, Admin } from "./pages"
// import { useState } from "react"
// import { ProtectedRoute } from "./Components/ProtectetdRoute";
// import Logeo from "./pages/Logeo";

// export default function App() {
//   const [user, setUser] = useState(null);

//   const login = () => {
//     //aqui hago todo el request para encontrar a mi usuario
//     setUser({
//       id: 1,
//       name: "John",
//       permisson: ['a'],
//       roles: ['admin']
//     })
//   }

//   const logout = () => setUser(null)
//   return (
//     <BrowserRouter>
//       <Navigation />
//       {
//         user ? (
//           <button onClick={logout}>Logout</button>
//         ) : (
//           <button onClick={login}>Login</button>
//         )
//       }
//       <Routes>
//         <Route index element={<Landing />} />
//         <Route path="/landing" element={<Landing />} />
//         <Route element={<ProtectedRoute isAllowed={!!user} />}>
//           <Route path="/home" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Route>

//         <Route path="/analytics" element={
//           <ProtectedRoute
//             isAllowed={!!user && user.permisson.includes('analize')}
//             redirectTo="/home"
//           >
//             <Analytics />
//           </ProtectedRoute>
//         } />
//         <Route path="/admin" element={
//           <ProtectedRoute
//             isAllowed={!!user && user.permisson.includes('admin')}
//             redirectTo="/home"
//           >
//             <Admin />
//           </ProtectedRoute>
//         } />

//       </Routes>
//     </BrowserRouter>
//   )
// }


// function Navigation() {
//   return (

//     <nav>
//       <ul>
//         <li><Link to='/landing'> Landing</Link></li>
//       </ul>
//       <ul>
//         <li><Link to='/home'> Home</Link></li>
//       </ul>
//       <ul>
//         <li><Link to='/dashboard'> Dashboard</Link></li>
//       </ul>
//       <ul>
//         <li><Link to='/analytics'> Analytics</Link></li>
//       </ul>
//       <ul>
//         <li><Link to='/admin'> Admin</Link></li>
//       </ul>
//     </nav>
//   )

// }
