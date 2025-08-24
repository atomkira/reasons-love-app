import React, { useEffect, useMemo, useState } from 'react'
import TaskChecklist from './TaskChecklist'
import PomodoroTimer from './PomodoroTimer'
import ThemeCustomizer from './ThemeCustomizer'
import ScheduleBoard from './ScheduleBoard'
import ProgressTracker from './ProgressTracker'
import ExamCountdown from './ExamCountdown'
import EncouragementNotes from './EncouragementNotes'

const tabs = [
  { id: 'schedule', label: 'Schedule 🗓️' },
  { id: 'tasks', label: 'Tasks ✅' },
  { id: 'pomodoro', label: 'Pomodoro ⏱️' },
  { id: 'progress', label: 'Progress 📈' },
  { id: 'exams', label: 'Exams 📅' },
  { id: 'notes', label: 'Notes 💌' },
  { id: 'theme', label: 'Theme 🎨' },
]

export default function StudyTrackerApp() {
  const [active, setActive] = useState('schedule')

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
          {active === 'schedule' && <ScheduleBoard />}
          {active === 'tasks' && <TaskChecklist />}
          {active === 'pomodoro' && <PomodoroTimer />}
          {active === 'progress' && <ProgressTracker />}
          {active === 'exams' && <ExamCountdown />}
          {active === 'notes' && <EncouragementNotes />}
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
