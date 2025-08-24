import mongoose from 'mongoose'

const WaterReminderSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true, unique: true },
    auto: { type: Boolean, default: false },
    intervalMin: { type: Number, default: 30 }, // minutes between reminders
    nextAt: { type: Number, default: () => Date.now() + 30 * 60000 }, // ms epoch of next reminder
    totalReminders: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('WaterReminder', WaterReminderSchema)
