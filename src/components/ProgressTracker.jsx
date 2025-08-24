import React, { useMemo, useState } from 'react'

const subjects = ['Math', 'Physics', 'Chemistry', 'English']

export default function ProgressTracker() {
  const [hours, setHours] = useState(() => subjects.map((s) => ({ subject: s, weekly: 0 })))
  const [dates, setDates] = useState(new Set()) // days studied (yyyy-mm-dd)

  const todayKey = new Date().toISOString().slice(0, 10)

  const addToday = () => setDates((prev) => new Set(prev).add(todayKey))

  const streak = useMemo(() => {
    let count = 0
    const d = new Date()
    for (;;) {
      const key = d.toISOString().slice(0, 10)
      if (!dates.has(key)) break
      count++
      d.setDate(d.getDate() - 1)
    }
    return count
  }, [dates])

  const setVal = (i, val) => {
    setHours((arr) => arr.map((x, idx) => (idx === i ? { ...x, weekly: Math.max(0, Number(val) || 0) } : x)))
  }

  const max = Math.max(1, ...hours.map((h) => h.weekly))

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700 p-5">
      <h3 className="font-bold">Weekly Hours per Subject</h3>
      <div className="mt-3 grid sm:grid-cols-2 gap-4">
        {hours.map((h, i) => (
          <div key={h.subject} className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-24 text-sm">{h.subject}</div>
              <input
                type="number"
                min={0}
                value={h.weekly}
                onChange={(e) => setVal(i, e.target.value)}
                className="w-24 rounded-md border px-2 py-1"
              />
            </div>
            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-rose-500 transition-all"
                style={{ width: `${(h.weekly / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={addToday} className="rounded-md bg-emerald-500 text-white px-3 py-1.5 shadow hover:bg-emerald-600">
          Mark today studied
        </button>
        <div className="text-sm">Streak: You've studied {streak} day(s) in a row! 🔥</div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-sm">
        <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-200 dark:border-rose-800">
          Focused Queen 👑
        </span>
        <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-200 dark:border-amber-800">
          Consistency Champ 🏆
        </span>
      </div>
    </div>
  )
}
