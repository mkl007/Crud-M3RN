import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { TasksPage } from './pages/TasksPage'
import { HomePage } from './pages/HomePage'
import { TaskFormPage } from './pages/TaskFormPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { NavBar } from './components/NavBar'
import { TaskProvider } from './context/TaskContext'

function App() {
  
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoute />} >
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/newTask' element={<TaskFormPage />} />
              <Route path='/tasks/:id' element={<TaskFormPage />} />
            </Route>
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider >
  )
}

export default App
