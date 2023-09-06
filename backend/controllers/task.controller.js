/* eslint-disable no-unused-vars */
import { TaskModel } from '../models/task.model.js'

export const example = (req, res) => {
  res.json({ msg: 'Message from example' })
}

export const newTask = async (req, res) => {
  try {
    const { title, description, userId, added, edited, completed } = req.body
    const newTask = new TaskModel({
      title, description, userId, added, edited, completed
    })

    const addTask = await newTask.save()
    res.status(200).json({ addTask })
  } catch (error) {
    res.status(500).json({ error, msg: ' Operation Failed ' })
  }
}
export const getAllTaks = async (req, res) => {
  const userId = req.userId // Obtener el ID del usuario desde req.userId

  try {
    const tasks = await TaskModel.find({ userId })
    if (!tasks) {
      return res.send('No task found')
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
    res.status(200).json({ msg: 'task deleted' })
  } catch (err) {
    console.error(err)
    res.status(500).send('Error al eliminar la nota')
  }
}
