import mongoose from 'mongoose'
import dayjs from 'dayjs'
// import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs.extend(relativeTime)

const Eschema = mongoose.Schema

const taskSchema = new Eschema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  userId: { type: String, required: true, trim: true },
  added: { type: Date, default: dayjs, required: true, trim: true },
  edited: { type: Date, required: false, trim: true }
  // completed: { type: Boolean, required: true, trim: true }

})

export const TaskModel = mongoose.model('Task', taskSchema)
