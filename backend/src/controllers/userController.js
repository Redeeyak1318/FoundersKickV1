import User from '../../database/models/User.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json(user.toJSONSafe())
})

export const listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
  res.json(users)
})

export const connectUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  if (String(id) === String(req.user._id)) {
    return res.status(400).json({ message: 'Cannot connect to yourself' })
  }
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { connections: id } })
  await User.findByIdAndUpdate(id, { $addToSet: { connections: req.user._id } })
  const updated = await User.findById(req.user._id).select('-password')
  res.json(updated)
})
