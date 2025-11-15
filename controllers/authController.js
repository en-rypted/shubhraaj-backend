import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Settings from '../models/Settings.js'
import { badRequest, ok, created } from '../utils/response.js'

export async function seedAdmin(req, res) {
  try {
    const provided = req.headers['x-seed-secret']
    if (!provided) return badRequest(res, 'x-seed-secret header required')

    // Load settings singleton
    let settings = await Settings.findOne({})
    if (!settings) settings = await Settings.create({})

    if (!settings.seedSecretHash) {
      // Initialize the seed secret on first use
      const initHash = await bcrypt.hash(provided, 10)
      settings.seedSecretHash = initHash
      await settings.save()
    } else {
      const okSecret = await bcrypt.compare(provided, settings.seedSecretHash)
      if (!okSecret) return badRequest(res, 'Invalid seed secret')
    }

    const { username, password } = req.body || {}
    if (!username || !password) return badRequest(res, 'username and password required')

    const exists = await Admin.findOne({ username: username.toLowerCase() })
    if (exists) return badRequest(res, 'Admin already exists')

    const hashed = await bcrypt.hash(password, 10)
    await Admin.create({ username: username.toLowerCase(), password: hashed })
    return created(res, {}, 'Admin created')
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}

export async function login(req, res) {
  try {
    const { username, password } = req.body || {}
    if (!username || !password) return badRequest(res, 'username and password required')

    const admin = await Admin.findOne({ username: username.toLowerCase() })
    if (!admin) return badRequest(res, 'Invalid credentials')

    const match = await admin.comparePassword(password)
    if (!match) return badRequest(res, 'Invalid credentials')

    const token = jwt.sign({ id: admin._id, role: admin.role, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    return ok(res, { token }, 'Logged in')
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}
