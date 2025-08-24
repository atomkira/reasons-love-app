import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  },
  { timestamps: true }
)

export default mongoose.model('Task', TaskSchema)
