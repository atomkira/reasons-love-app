import React, { useEffect, useMemo, useState } from 'react'
import TaskChecklist from './TaskChecklist'
import PomodoroTimer from './PomodoroTimer'
import ScheduleBoard from './ScheduleBoard'
import ThemeCustomizer from './ThemeCustomizer'
import ProgressTracker from './ProgressTracker'
import ExamCountdown from './ExamCountdown'
import EncouragementNotes from './EncouragementNotes'
import WaterReminder from './WaterReminder'

const tabs = [
  { id: 'schedule', label: 'Schedule 🗓️' },
  { id: 'tasks', label: 'Tasks ✅' },
  { id: 'pomodoro', label: 'Pomodoro ⏱️' },
  { id: 'progress', label: 'Progress 📈' },
  { id: 'exams', label: 'Exams 📅' },
  { id: 'notes', label: 'Notes 💌' },
  { id: 'water', label: 'Water 💧' },
 
]

export default function StudyTrackerApp() {
  const [active, setActive] = useState('schedule')
  const [blocks, setBlocks] = useState([]) // {id, subject, start, end, date}

  // Load blocks from backend on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/blocks')
        if (!res.ok) throw new Error('Failed to load blocks')
        const data = await res.json()
        // Map backend _id to id for UI
        setBlocks(data.map((b) => ({ id: b._id ?? b.id, subject: b.subject, start: b.start, end: b.end, date: b.date })))
      } catch (e) {
        console.warn('Blocks fetch failed, using empty list:', e?.message)
        setBlocks([])
      }
    }
    load()
  }, [])

  // CRUD handlers
  const createBlock = async (payload) => {
    const res = await fetch('/api/blocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: payload.subject, date: payload.date, start: payload.start, end: payload.end }),
    })
    if (!res.ok) throw new Error('Create failed')
    const saved = await res.json()
    const item = { id: saved._id ?? saved.id, subject: saved.subject, start: saved.start, end: saved.end, date: saved.date }
    setBlocks((arr) => [...arr, item])
    return item
  }

  const updateBlock = async (id, payload) => {
    const res = await fetch(`/api/blocks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: payload.subject, date: payload.date, start: payload.start, end: payload.end }),
    })
    if (!res.ok) throw new Error('Update failed')
    const saved = await res.json()
    const item = { id: saved._id ?? saved.id, subject: saved.subject, start: saved.start, end: saved.end, date: saved.date }
    setBlocks((arr) => arr.map((x) => (x.id === id ? item : x)))
    return item
  }

  const deleteBlock = async (id) => {
    const res = await fetch(`/api/blocks/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Delete failed')
    setBlocks((arr) => arr.filter((x) => x.id !== id))
  }

  return (
    <div className="min-h-screen w-full bg-study-light dark:bg-study-dark text-slate-800 dark:text-slate-100">
      <div className="mx-auto max-w-5xl p-4 md:p-6">
        <header className="flex items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-rose-700 dark:text-rose-200 drop-shadow">
            Study Tracker ✨
          </h1>
          <ThemeCustomizer />
        </header>

        <nav className="mt-4 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`rounded-full px-3 py-1.5 text-sm shadow transition-all border ${
                active === t.id
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white/80 dark:bg-slate-700/60 text-slate-700 dark:text-slate-100 border-slate-200 dark:border-slate-600 hover:bg-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <main className="mt-6">
          {active === 'schedule' && (
            <ScheduleBoard
              blocks={blocks}
              setBlocks={setBlocks}
              onCreateBlock={createBlock}
              onUpdateBlock={updateBlock}
              onDeleteBlock={deleteBlock}
            />
          )}
          {active === 'tasks' && <TaskChecklist />}
          {active === 'pomodoro' && <PomodoroTimer />}
          {active === 'progress' && <ProgressTracker blocks={blocks} />}
          {active === 'exams' && <ExamCountdown />}
          {active === 'notes' && <EncouragementNotes />}
          {active === 'water' && <WaterReminder />}
          {active === 'theme' && (
            <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700 p-5">
              <p className="opacity-80">Use the toggle in the header to switch light/dark. More themes coming soon.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
