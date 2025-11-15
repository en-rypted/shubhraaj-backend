import jwt from 'jsonwebtoken'
import { unauthorized } from '../utils/response.js'

export function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return unauthorized(res, 'No token provided')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    return next()
  } catch (e) {
    return unauthorized(res, 'Invalid or expired token')
  }
}
