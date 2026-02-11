import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { listEvents, createEvent } from '../controllers/eventController.js'

const router = Router()

router.get('/', listEvents)
router.post('/', requireAuth, createEvent)

export default router
