import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const Eschema = mongoose.Schema

const userSchema = new Eschema({
  name: { type: String, requred: true, trim: true },
  email: { type: String, requred: true, trim: true, unique: true },
  password: { type: String, requred: true },
  admin: Boolean
}, {
  timestamps: true
})

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10)
  return bcryptjs.hash(password, salt)
}

userSchema.methods.validatePassword = function (password) {
  return bcryptjs.compare(password, this.password)
}

export const UserModel = mongoose.model('user', userSchema)
