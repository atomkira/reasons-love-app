import React, { useMemo, useState } from 'react'

const reasonsDefault = [
  'I love you because you make me smile every day.',
  'I love you because you support me no matter what.',
  'I love you because you understand me better than anyone.',
  'I love you because you’re my best friend and my soulmate.',
]

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        size: `${Math.random() * 24 + 12}px`,
        duration: `${Math.random() * 6 + 8}s`,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="select-none absolute animate-float"
          style={{
            left: h.left,
            bottom: '-20px',
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
            opacity: h.opacity,
            filter: 'drop-shadow(0 4px 8px rgba(244,63,94,0.25))',
          }}
        >
          💗
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [index, setIndex] = useState(-1)
  const [done, setDone] = useState(false)

  const reasons = reasonsDefault

  const onClickHeart = () => {
    if (done) return
    const next = index + 1
    if (next >= reasons.length) {
      setDone(true)
    } else {
      setIndex(next)
    }
  }

  const currentText = done
    ? 'But the biggest reason is just YOU. 💙'
    : index >= 0
    ? reasons[index]
    : ''

  return (
    <div className="min-h-screen w-full bg-love-gradient flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <FloatingHearts />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-pink-700 drop-shadow-sm">
            Reasons I Love You 💖
          </h1>

          <button
            aria-label="Show next reason"
            onClick={onClickHeart}
            className="mt-8 flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-rose-500 text-white text-4xl sm:text-5xl shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-3 active:scale-95 focus:outline-none focus:ring-4 focus:ring-rose-300"
          >
            ❤
          </button>

          <div className="mt-8 w-full px-2">
            {(index >= 0 || done) && (
              <div className="mx-auto max-w-xl rounded-2xl bg-white/80 backdrop-blur shadow-xl p-5 sm:p-6 md:p-7 border border-white/60 animate-slideUp">
                <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
                  {currentText}
                </p>
              </div>
            )}

            {index < 0 && !done && (
              <p className="mt-4 text-sm sm:text-base text-rose-700/80">Tap the heart to see a reason</p>
            )}

            {!done && index >= 0 && (
              <p className="mt-3 text-xs sm:text-sm text-rose-700/70">
                {index + 1} / {reasons.length}
              </p>
            )}

            {done && (
              <button
                onClick={() => {
                  setIndex(-1)
                  setDone(false)
                }}
                className="mt-4 inline-flex items-center gap-2 text-rose-700 hover:text-rose-800 text-sm font-medium transition-colors"
              >
                ↺ Start over
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
