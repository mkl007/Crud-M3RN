import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'
import { config } from '../configs/config.js'

export const example = (req, res, next) => {
  res.send('Example from user.controller')
}

/**
 * Register a new user.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función para pasar la solicitud al siguiente middleware.
 * @returns {Promise<void>} - No devuelve un valor directamente, pero envía una respuesta HTTP o maneja errores.
 */

export const register = async (req, res, next) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      admin: false
    })
    const verifyEmail = await UserModel.findOne({ email: newUser.email })

    if (verifyEmail) return res.status(400).send(['Email already exist'])
    else {
      newUser.password = await newUser.encryptPassword(newUser.password)
      newUser.save()
      const token = jwt.sign({ id: newUser._id }, config.SUPERSECRET, {
        expiresIn: 60 * 60 * 24
      },
      (err, token) => {
        if (err) console.log(err)
        res.cookie('token', token, {
          httpOnly: false,
          sameSite: 'none',
          secure: true
        }
        )
        res.json(newUser)
      })
    }
  } catch (error) {
    res.status(500).json({ msg: 'Hay algun error bro: ', error })
  }
}

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función para pasar la solicitud al siguiente middleware.
 * @returns {Promise<void>} - No devuelve un valor directamente, pero envía una respuesta HTTP o maneja errores.
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find({})
    res.status(200).send(allUsers)
  } catch (err) {
    res.status(500).send({ error: 'Operation failed' })
  }
}

/**
 * Obtiene todos los usuarios registrados en el sistema.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @param {Function} next - La función para pasar la solicitud al siguiente middleware.
 * @returns {Promise<void>} - No devuelve un valor directamente, pero envía una respuesta HTTP o maneja errores.
 */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(404).send(['Email not found.'])
    }

    const valiPassword = await user.validatePassword(password)
    if (!valiPassword) {
      return res.status(400).json(['Email or password wrong'])
    }
    const token = jwt.sign({ id: user._id }, config.SUPERSECRET, {
      expiresIn: 60 * 60 * 24
    },
    (err, token) => {
      if (err) console.log(err)
      res.cookie('token', token, {
        httpOnly: false,
        sameSite: 'none',
        secure: true
      }
      )
      res.json(user)
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

export const logoutUser = (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(0)
  })
  return res.status(200).json({ msg: 'Loggin out...' })
}

export const dashboard = (req, res, next) => {
  res.send('Aqui desde Dashboard')
}

export const verifyTokenRoute = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(404).json({ msg: 'Unauthorized. Login required' })

  jwt.verify(token, config.SUPERSECRET, async (err, user) => {
    if (err) return res.status(404).json({ msg: 'Unauthorized, you are not authorized with the token' })

    const userFound = await UserModel.findById(user.id)
    if (!userFound) {
      return res.status(404).json({ msg: 'Unauthorized, There is token but no user' })
    }

    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email
    })
  })
}
