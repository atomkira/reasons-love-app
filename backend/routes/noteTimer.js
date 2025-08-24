import { Router } from 'express'
import NoteTimer from '../models/NoteTimer.js'

const router = Router()

// Get or create state for a clientId
router.get('/:clientId', async (req, res) => {
  const { clientId } = req.params
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    let doc = await NoteTimer.findOne({ clientId })
    if (!doc) doc = await NoteTimer.create({ clientId })
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch note timer' })
  }
})

// Upsert state for a clientId
router.put('/:clientId', async (req, res) => {
  const { clientId } = req.params
  const { auto, minutes, lastTickTs } = req.body || {}
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    const doc = await NoteTimer.findOneAndUpdate(
      { clientId },
      {
        ...(typeof auto === 'boolean' ? { auto } : {}),
        ...(Number.isFinite(minutes) ? { minutes } : {}),
        ...(Number.isFinite(lastTickTs) ? { lastTickTs } : { lastTickTs: Date.now() }),
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to save note timer' })
  }
})

export default router
