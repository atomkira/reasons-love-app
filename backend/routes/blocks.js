import { Router } from 'express'
import Block from '../models/Block.js'

const router = Router()

// GET all blocks
router.get('/', async (req, res) => {
  try {
    const items = await Block.find().sort({ date: 1, start: 1 })
    res.json(items)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch blocks' })
  }
})

// POST create block
router.post('/', async (req, res) => {
  try {
    const { subject, date, start, end } = req.body
    if (!subject || !date || !start || !end) return res.status(400).json({ error: 'Missing fields' })
    const created = await Block.create({ subject, date, start, end })
    res.status(201).json(created)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create block' })
  }
})

// PUT update block
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { subject, date, start, end } = req.body
    const updated = await Block.findByIdAndUpdate(
      id,
      { subject, date, start, end },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update block' })
  }
})

// DELETE block
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Block.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete block' })
  }
})

export default router
