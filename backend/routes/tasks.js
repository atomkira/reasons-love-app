import { Router } from 'express'
import Task from '../models/Task.js'

const router = Router()

// GET all tasks
router.get('/', async (_req, res) => {
  try {
    const items = await Task.find().sort({ createdAt: 1 })
    res.json(items)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

// POST create task
router.post('/', async (req, res) => {
  try {
    const { text, priority = 'Medium' } = req.body || {}
    if (!text) return res.status(400).json({ error: 'Missing text' })
    const created = await Task.create({ text, priority })
    res.status(201).json(created)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// PUT update task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { text, done, priority } = req.body || {}
    const updated = await Task.findByIdAndUpdate(
      id,
      { text, done, priority },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

export default router
