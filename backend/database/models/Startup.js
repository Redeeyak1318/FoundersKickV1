import mongoose from 'mongoose'

const startupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    tagline: { type: String, trim: true, maxlength: 140 },
    about: { type: String, trim: true, maxlength: 2000 },
    stage: {
      type: String,
      enum: ['Idea', 'MVP', 'Growing', 'Funded', 'Scaling'],
      required: true
    },
    problem: { type: String, trim: true, maxlength: 2000 },
    solution: { type: String, trim: true, maxlength: 2000 },
    targetMarket: { type: String, trim: true, maxlength: 2000 },
    categories: [{ type: String, trim: true, maxlength: 40 }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

startupSchema.index({ name: 1 })
startupSchema.index({ stage: 1 })
startupSchema.index({ categories: 1 })

export default mongoose.model('Startup', startupSchema)
