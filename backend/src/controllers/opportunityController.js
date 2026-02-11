import Opportunity from '../../database/models/Opportunity.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listOpportunities = asyncHandler(async (req, res) => {
  const items = await Opportunity.find().populate('createdBy', 'name email')
  res.json(items)
})

export const createOpportunity = asyncHandler(async (req, res) => {
  const created = await Opportunity.create({ ...req.body, createdBy: req.user._id })
  res.status(201).json(created)
})
