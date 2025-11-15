import { Router } from 'express'
import { login, seedAdmin } from '../controllers/authController.js'

const router = Router()

// Seed first admin (dev-only): require header x-seed-secret = SEED_SECRET
router.post('/seed', seedAdmin)

// Login
router.post('/login', login)

export default router
