import { Router } from 'express'
import WaterReminder from '../models/WaterReminder.js'

const router = Router()

// Get or create water reminder state for client
router.get('/:clientId', async (req, res) => {
  const { clientId } = req.params
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    let doc = await WaterReminder.findOne({ clientId })
    if (!doc) {
      doc = await WaterReminder.create({ clientId })
    }
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch water reminder' })
  }
})

// Upsert water reminder state
router.put('/:clientId', async (req, res) => {
  const { clientId } = req.params
  const { auto, intervalMin, nextAt, totalReminders } = req.body || {}
  if (!clientId) return res.status(400).json({ error: 'clientId required' })
  try {
    const update = {}
    if (typeof auto === 'boolean') update.auto = auto
    if (Number.isFinite(intervalMin)) update.intervalMin = Math.max(1, Math.floor(intervalMin))
    if (Number.isFinite(nextAt)) update.nextAt = nextAt
    if (Number.isFinite(totalReminders)) update.totalReminders = Math.max(0, Math.floor(totalReminders))

    const doc = await WaterReminder.findOneAndUpdate(
      { clientId },
      Object.keys(update).length ? update : {},
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
    res.json(doc)
  } catch (e) {
    res.status(500).json({ error: 'Failed to save water reminder' })
  }
})

export default router
