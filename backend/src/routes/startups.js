import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import {
  listStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup
} from '../controllers/startupController.js'

const router = Router()

router.get('/', listStartups)
router.get('/:id', getStartup)
router.post('/', requireAuth, createStartup)
router.put('/:id', requireAuth, updateStartup)
router.delete('/:id', requireAuth, deleteStartup)

export default router
