import React, { useEffect, useMemo, useRef, useState } from 'react'

const WORK_MIN = 25
const BREAK_MIN = 5

export default function PomodoroTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(WORK_MIN * 60)
  const intervalRef = useRef(null)

  const total = (isBreak ? BREAK_MIN : WORK_MIN) * 60
  const progress = 1 - secondsLeft / total

  useEffect(() => {
    if (!isRunning) return
    intervalRef.current && clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          // switch phase
          const nextBreak = !isBreak
          setIsBreak(nextBreak)
          return (nextBreak ? BREAK_MIN : WORK_MIN) * 60
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [isRunning, isBreak])

  const toggle = () => setIsRunning((r) => !r)
  const reset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setSecondsLeft(WORK_MIN * 60)
  }

  const mmss = useMemo(() => {
    const m = Math.floor(secondsLeft / 60)
    const s = secondsLeft % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }, [secondsLeft])

  const message = isBreak ? 'Stretch time! 🌸' : 'Focus mode. You got this! 💪'

  const radius = 64
  const circumference = 2 * Math.PI * radius
  const dash = circumference * progress

  return (
    <div className="rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-white/60 dark:border-slate-700 p-6 flex flex-col items-center">
      <div className="text-sm opacity-80 mb-3">{message}</div>
      <div className="relative">
        <svg width="160" height="160" className="drop-shadow">
          <circle cx="80" cy="80" r={radius} strokeWidth="10" className="fill-none stroke-slate-200 dark:stroke-slate-600" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="10"
            strokeLinecap="round"
            className="fill-none stroke-rose-500"
            style={{ strokeDasharray: `${dash} ${circumference}`, transition: 'stroke-dasharray 0.3s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
          {mmss}
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={toggle} className="rounded-md bg-rose-500 px-4 py-2 text-white shadow hover:bg-rose-600">
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset} className="rounded-md bg-slate-200 dark:bg-slate-700 px-4 py-2 shadow">
          Reset
        </button>
      </div>
      <p className="mt-3 text-xs opacity-70">
        Work {WORK_MIN}m / Break {BREAK_MIN}m — Breathe and smile 💖
      </p>
    </div>
  )
}
