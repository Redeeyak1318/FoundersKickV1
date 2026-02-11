import jwt from 'jsonwebtoken'
import User from '../../database/models/User.js'

export const requireAuth = async (req, res, next) => {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.sub).select('-password')
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
