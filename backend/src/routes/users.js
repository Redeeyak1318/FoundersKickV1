import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { getMe, listUsers, connectUser } from '../controllers/userController.js'

const router = Router()

router.get('/me', requireAuth, getMe)
router.get('/', requireAuth, listUsers)
router.post('/:id/connect', requireAuth, connectUser)

export default router
