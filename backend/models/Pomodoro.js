import mongoose from 'mongoose'

const PomodoroSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true, unique: true },
    isRunning: { type: Boolean, default: false },
    isBreak: { type: Boolean, default: false },
    secondsLeft: { type: Number, default: 25 * 60 },
    referenceTs: { type: Number, default: () => Date.now() }, // ms epoch when snapshot taken
  },
  { timestamps: true }
)

export default mongoose.model('Pomodoro', PomodoroSchema)
