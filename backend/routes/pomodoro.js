import { Router } from 'express'
import Pomodoro from '../models/Pomodoro.js'

const router = Router()

// Get or create default state for a clientId
router.get('/:clientId', async (req, res) => {
  const { clientId } = req.params
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    let doc = await Pomodoro.findOne({ clientId })
    if (!doc) {
      doc = await Pomodoro.create({ clientId })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch pomodoro state' })
  }
})

// Upsert state for a clientId
router.put('/:clientId', async (req, res) => {
  const { clientId } = req.params
  const { isRunning, isBreak, secondsLeft, referenceTs } = req.body || {}
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    const doc = await Pomodoro.findOneAndUpdate(
      { clientId },
      { isRunning: !!isRunning, isBreak: !!isBreak, secondsLeft: Number(secondsLeft) || 0, referenceTs: Number(referenceTs) || Date.now() },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to save pomodoro state' })
  }
})

export default router
