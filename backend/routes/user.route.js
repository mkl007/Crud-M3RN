import express from 'express'
import {
  example,
  register,
  getAllUsers,
  loginUser,
  logoutUser,
  dashboard,
  verifyTokenRoute
} from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.js'
const userRoute = express.Router()
userRoute.use(express.json())

userRoute.get('/example', example)

userRoute.post('/register', register)

userRoute.get('/getUsers', getAllUsers)

userRoute.post('/login', loginUser)

userRoute.post('/logout', logoutUser)

// userRoute.get('dashboard', verifyToken, dashboard)
userRoute.get('/dashboard', verifyToken, dashboard)

userRoute.get('/verify', verifyTokenRoute)

export { userRoute }
