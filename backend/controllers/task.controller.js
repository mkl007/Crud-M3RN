import { TaskModel } from '../models/task.model.js'
import jwt from 'jsonwebtoken'
import { config } from '../configs/config.js'
import dayjs from 'dayjs'

/**
 * @sumary It's only for testing porpuses.
 * @param {*} req -basic HTTP request
 * @param {*} res -basic HTTP response
 */
export const example = (req, res) => {
  res.json({ msg: 'Message from example' })
}

/**
 * @summary Create new task
 * @param {*} req - Basic HTTP request
 * @param {*} res - Basic HTTP response
 * @constants { title, description, userId, added, edited, completed }, from body of the request; newTask
 */
export const newTask = async (req, res) => {
  try {
    const { title, description, userId } = req.body
    const added = dayjs()
    const newTask = new TaskModel({
      title, description, userId, added
    })

    const addTask = await newTask.save()
    res.status(201).json({ addTask })
  } catch (error) {
    res.status(500).json({ error, msg: ' Operation Failed ' })
  }
}
export const getAllTaks = async (req, res) => {
  try {
    const userId = req.userId

    const tasks = await TaskModel.find({ userId })

    if (tasks.length === 0) {
      return res.status(204).json({ msg: 'No task' })
    }

    res.send(tasks)
  } catch (err) {
    res.status(500).send({ error: 'Ocurrió un error' })
  }
}

/**
 * getTask used to retreive only one task by the ID
 * @param {idTask} -id received from params, task id
 * @param {task} -gets the task from database associated to idTask
 * @returns -Return status code and messages, expected task
 */

export const getTask = async (req, res) => {
  const userId = req.userId
  const idTask = req.params.idTask
  try {
    const task = await TaskModel.findById({ _id: idTask, userId })

    if (!task) return res.status(404).json({ msg: 'Task no found' })
    res.json(task)
  } catch (error) {
    return res.status(404).json({ msg: 'Catch error' })
  }
}

export const editTask = async (req, res) => {
  try {
    const userId = req.userId
    const idTask = req.params.idTask
    const findTask = await TaskModel.findByIdAndUpdate({ _id: idTask, userId },
      {
        title: req.body.title,
        description: req.body.description,
        edited: new Date(),
        completed: req.body.completed
      }, { new: true })

    if (!findTask) {
      res.status(502).send('Error updating task')
    }

    res.status(200).json({ msg: 'Task updated', findTask })
  } catch (error) {
    res.status(500).send('Operation failed!')
  }
}

export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId
    const idTask = req.params.idTask
    const task = await TaskModel.findByIdAndDelete({ _id: idTask, userId })
    res.status(204).json({ msg: 'task deleted' })
  } catch (err) {
    // console.error(err)3
    res.status(500).send('Failed deleting the task')
  }
}

export const verifyTokenRequestTask = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ msg: 'Unauthorized' })

  jwt.verify(token, config.SUPERSECRET, async (err, user) => {
    if (err) return res.status(401).json({ msg: 'Unauthorized' })

    const userFound = await TaskModel.findById(user.id)
    if (!userFound) return res.status(401).json({ msg: 'Unauthorized' })

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email
    })
  })
}
