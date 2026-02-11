import Startup from '../../database/models/Startup.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listStartups = asyncHandler(async (req, res) => {
  const startups = await Startup.find().populate('owner', 'name email')
  res.json(startups)
})

export const getStartup = asyncHandler(async (req, res) => {
  const startup = await Startup.findById(req.params.id).populate('owner', 'name email')
  if (!startup) return res.status(404).json({ message: 'Not found' })
  res.json(startup)
})

export const createStartup = asyncHandler(async (req, res) => {
  const payload = { ...req.body, owner: req.user._id }
  const created = await Startup.create(payload)
  res.status(201).json(created)
})

export const updateStartup = asyncHandler(async (req, res) => {
  const startup = await Startup.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    { new: true }
  )
  if (!startup) return res.status(404).json({ message: 'Not found' })
  res.json(startup)
})

export const deleteStartup = asyncHandler(async (req, res) => {
  const startup = await Startup.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
  if (!startup) return res.status(404).json({ message: 'Not found' })
  res.json({ ok: true })
})
