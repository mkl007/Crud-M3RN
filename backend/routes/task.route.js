import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { example, newTask, getAllTaks, getTask, editTask, deleteTask } from '../controllers/task.controller.js'
const taskRoute = express.Router()
taskRoute.use(express.json())

taskRoute.get('/ejemplo', verifyToken, example)

taskRoute.post('/newtask', verifyToken, newTask)

taskRoute.get('/tasks', verifyToken, getAllTaks)

taskRoute.get('/task/:idTask', verifyToken, getTask)

taskRoute.put('/task/:idTask', verifyToken, editTask)

taskRoute.delete('/task/:idTask', verifyToken, deleteTask)

export { taskRoute }
