import mongoose from 'mongoose'

const Eschema = mongoose.Schema

const taskSchema = new Eschema({
  title: { type: String, requred: true, trim: true },
  description: { type: String, requred: true, trim: true },
  userId: { type: String, requred: true, trim: true },
  added: { type: String, requred: true, trim: true },
  edited: { type: String, requred: true, trim: true },
  completed: { type: Boolean, requred: true, trim: true }

})

export const TaskModel = mongoose.model('Task', taskSchema)
