import mongoose from 'mongoose'

const BlockSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // yyyy-mm-dd
    start: { type: String, required: true }, // HH:mm
    end: { type: String, required: true },   // HH:mm
  },
  { timestamps: true }
)

export default mongoose.model('Block', BlockSchema)
