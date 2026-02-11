import Event from '../../database/models/Event.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listEvents = asyncHandler(async (req, res) => {
  const items = await Event.find().populate('createdBy', 'name email')
  res.json(items)
})

export const createEvent = asyncHandler(async (req, res) => {
  const created = await Event.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json(created)
})
