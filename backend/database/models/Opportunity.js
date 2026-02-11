import mongoose from 'mongoose'

const opportunitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 4000 },
    type: { type: String, enum: ['job', 'cofounder', 'gig'], required: true },
    tags: [{ type: String, trim: true, maxlength: 40 }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

opportunitySchema.index({ type: 1 })

export default mongoose.model('Opportunity', opportunitySchema)
