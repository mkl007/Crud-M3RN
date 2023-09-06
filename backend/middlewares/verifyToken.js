/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { config } from '../configs/config.js'

/**
 * -Validate token after proceed to profile,dashbaord and some routes that has verifyToken
 * @param {*} req -to require data HTTP
 * @param {*} res -To responde to cliente side by HTTP
 * @param {*} next -To proceed after completing the validation
 * @returns {token , req.userId} -sending these datas to our dashboard route.
 */

export function verifyToken (req, res, next) {
  try {
    const preToken = req.headers.cookie
    if (!preToken) {
      return res.json({ msg: 'Please login' })
    }

    const token = preToken.split('=')[1]
    if (!token) {
      return res.status(401).json({
        auth: false,
        message: 'No token provided :('
      })
    }
    const decoded = jwt.verify(token, config.SUPERSECRET)
    req.userId = decoded.id
    next()
  } catch (error) {
    res.status(500).json({ msg: 'Error bro', error })
  }
}
