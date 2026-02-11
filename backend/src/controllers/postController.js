import Post from '../../database/models/Post.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate('author', 'name')
  res.json(posts)
})

export const createPost = asyncHandler(async (req, res) => {
  const created = await Post.create({ author: req.user._id, content: req.body.content })
  res.status(201).json(created)
})

export const likePost = asyncHandler(async (req, res) => {
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
  res.json(updated)
})

export const commentPost = asyncHandler(async (req, res) => {
  const updated = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { author: req.user._id, content: req.body.content } } },
    { new: true }
  )
  res.json(updated)
})
