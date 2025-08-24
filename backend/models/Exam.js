import mongoose from 'mongoose'

const ExamItemSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    done: { type: Boolean, default: false },
  },
  { _id: false }
)

const ExamSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // yyyy-mm-dd
    items: { type: [ExamItemSchema], default: [] },
  },
  { timestamps: true }
)

export default mongoose.model('Exam', ExamSchema)
