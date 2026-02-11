import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, maxlength: 80 },
    bio: { type: String, trim: true, maxlength: 500 },
    location: { type: String, trim: true, maxlength: 120 },
    avatar: { type: String, trim: true }
  },
  { _id: false }
)

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    googleId: { type: String, index: true },
    profile: { type: profileSchema, default: {} },
    connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
)

userSchema.index({ email: 1 }, { unique: true })

userSchema.methods.toJSONSafe = function toJSONSafe() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model('User', userSchema)
