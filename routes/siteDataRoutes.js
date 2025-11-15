import { Router } from 'express'
import { getData, upsertData, patchAbout, patchContact, patchProjects, patchTestimonials } from '../controllers/siteDataController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = Router()

// Public
router.get('/data', getData)

// Protected
router.post('/data', authMiddleware, upsertData)
router.patch('/about', authMiddleware, patchAbout)
router.patch('/contact', authMiddleware, patchContact)
router.patch('/projects', authMiddleware, patchProjects)
router.patch('/testimonials', authMiddleware, patchTestimonials)

export default router
