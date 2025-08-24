import mongoose from 'mongoose'

const NoteTimerSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true, unique: true },
    auto: { type: Boolean, default: false },
    minutes: { type: Number, default: 0 },
    lastTickTs: { type: Number, default: () => Date.now() }, // ms epoch of last minute increment
  },
  { timestamps: true }
)

export default mongoose.model('NoteTimer', NoteTimerSchema)
