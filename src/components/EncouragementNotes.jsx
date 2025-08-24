import React, { useEffect, useMemo, useState } from 'react'

const messages = [
  "I'm proud of you 💕",
  "You're doing amazing 🌟",
  'One page at a time. You can do this! 📚',
  'Tiny steps add up. Keep going ✨',
]

export default function EncouragementNotes() {
  const [msg, setMsg] = useState(messages[0])
  const [auto, setAuto] = useState(false)

  useEffect(() => {
    if (!auto) return
    const id = setInterval(() => randomize(), 60 * 1000)
    return () => clearInterval(id)
  }, [auto])

  const randomize = () => setMsg(messages[Math.floor(Math.random() * messages.length)])

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700 p-5">
      <div className="text-lg font-semibold">{msg}</div>
      <div className="mt-3 flex gap-2">
        <button onClick={randomize} className="rounded-md bg-rose-500 text-white px-3 py-1.5 shadow hover:bg-rose-600">Randomize</button>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
          Auto every minute
        </label>
      </div>
    </div>
  )
}
