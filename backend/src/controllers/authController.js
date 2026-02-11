import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../database/models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const signToken = (userId) =>
  jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const existing = await User.findOne({ email })
  if (existing) return res.status(409).json({ message: 'Email already in use' })
  const hash = await bcrypt.hash(password, 12)
  const user = await User.create({ name, email, password: hash })
  const token = signToken(user._id)
  res.status(201).json({ token, user: user.toJSONSafe() })
})

export const login = asyncHandler(async (req, res) => {
  try {
    console.log('Login request body:', req.body)
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
    const user = await User.findOne({ email })
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    const safeUser = user.toJSONSafe()
    return res.json({ token, user: safeUser })
  } catch (err) {
    console.error('Login error:', err)
    return res.status(500).json({ message: 'Login failed. Please try again.' })
  }
})

export const googleCallback = asyncHandler(async (req, res) => {
  const token = signToken(req.user._id)
  const redirect = `${process.env.CLIENT_URL}/auth/callback?token=${token}`
  res.redirect(redirect)
})
