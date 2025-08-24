import React, { useMemo, useState } from 'react'

export default function ExamCountdown() {
  const [exams, setExams] = useState([])
  const [modal, setModal] = useState(null) // {id?, title, date, items: []}

  const openAdd = () => setModal({ title: '', date: '', items: [] })
  const openEdit = (e) => setModal({ ...e })
  const close = () => setModal(null)

  const save = () => {
    if (!modal.title || !modal.date) return
    if (modal.id) setExams((arr) => arr.map((x) => (x.id === modal.id ? modal : x)))
    else setExams((arr) => [...arr, { ...modal, id: crypto.randomUUID() }])
    close()
  }

  const remove = (id) => setExams((arr) => arr.filter((x) => x.id !== id))

  const daysLeft = (dateStr) => {
    const now = new Date()
    const d = new Date(dateStr)
    const diff = Math.ceil((d - now) / (1000 * 60 * 60 * 24))
    return diff
  }

  const toggleItem = (examId, idx) => {
    setExams((arr) =>
      arr.map((e) =>
        e.id !== examId
          ? e
          : { ...e, items: e.items.map((it, i) => (i === idx ? { ...it, done: !it.done } : it)) }
      )
    )
  }

  const addItem = (examId) => {
    const text = prompt('Add revision task')
    if (!text) return
    setExams((arr) =>
      arr.map((e) => (e.id === examId ? { ...e, items: [...e.items, { text, done: false }] } : e))
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Exam Countdown</h2>
        <button onClick={openAdd} className="rounded-md bg-rose-500 text-white px-3 py-1.5 shadow hover:bg-rose-600">
          Add exam
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {exams.map((e) => (
          <div key={e.id} className="rounded-xl border bg-white/80 dark:bg-slate-800/60 border-white/60 dark:border-slate-700 p-3">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm opacity-80">{e.date}</div>
            </div>
            <div className="mt-1 text-sm">
              {(() => {
                const d = daysLeft(e.date)
                return d >= 0 ? `${d} day(s) left` : `Happened ${Math.abs(d)} day(s) ago`
              })()}
            </div>
            <div className="mt-2 flex gap-2 text-sm">
              <button onClick={() => openEdit(e)} className="underline">Edit</button>
              <button onClick={() => remove(e.id)} className="underline">Delete</button>
              <button onClick={() => addItem(e.id)} className="underline">+ Revision</button>
            </div>
            {!!e.items.length && (
              <ul className="mt-2 space-y-1">
                {e.items.map((it, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={it.done} onChange={() => toggleItem(e.id, idx)} />
                    <span className={it.done ? 'line-through opacity-60' : ''}>{it.text}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-white/60 dark:border-slate-700 p-4">
            <h3 className="font-bold mb-3">{modal.id ? 'Edit' : 'Add'} Exam</h3>
            <div className="space-y-2">
              <label className="block text-sm">Title</label>
              <input value={modal.title} onChange={(e) => setModal((m) => ({ ...m, title: e.target.value }))} className="w-full rounded-md border px-2 py-1.5" />
              <label className="block text-sm">Date</label>
              <input type="date" value={modal.date} onChange={(e) => setModal((m) => ({ ...m, date: e.target.value }))} className="w-full rounded-md border px-2 py-1.5" />
              <div className="mt-3 flex justify-end gap-2">
                <button onClick={close} className="px-3 py-1.5 rounded-md bg-slate-200 dark:bg-slate-700">Cancel</button>
                <button onClick={save} className="px-3 py-1.5 rounded-md bg-rose-500 text-white">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
