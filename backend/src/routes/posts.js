import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { listPosts, createPost, likePost, commentPost } from '../controllers/postController.js'

const router = Router()

router.get('/', listPosts)
router.post('/', requireAuth, createPost)
router.post('/:id/like', requireAuth, likePost)
router.post('/:id/comment', requireAuth, commentPost)

export default router
