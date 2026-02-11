import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { listOpportunities, createOpportunity } from '../controllers/opportunityController.js'

const router = Router()

router.get('/', listOpportunities)
router.post('/', requireAuth, createOpportunity)

export default router
