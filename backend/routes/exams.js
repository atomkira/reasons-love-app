import { Router } from 'express'
import Exam from '../models/Exam.js'

const router = Router()

// GET all exams
router.get('/', async (_req, res) => {
  try {
    const items = await Exam.find().sort({ date: 1, createdAt: 1 })
    res.json(items)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch exams' })
  }
})

// POST create exam
router.post('/', async (req, res) => {
  try {
    const { title, date, items = [] } = req.body || {}
    if (!title || !date) return res.status(400).json({ error: 'Missing fields' })
    const created = await Exam.create({ title, date, items })
    res.status(201).json(created)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create exam' })
  }
})

// PUT update exam
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { title, date, items } = req.body || {}
    const updated = await Exam.findByIdAndUpdate(
      id,
      { title, date, items },
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update exam' })
  }
})

// DELETE exam
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Exam.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete exam' })
  }
})

export default router
