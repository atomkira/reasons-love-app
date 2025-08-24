import React, { useState } from 'react'

export default function ScheduleBoard() {
  const [blocks, setBlocks] = useState([])
  const [modal, setModal] = useState(null) // {id?, subject, start, end}

  const openAdd = () => setModal({ subject: '', start: '09:00', end: '10:00' })
  const openEdit = (b) => setModal({ ...b })
  const close = () => setModal(null)
  const save = () => {
    if (!modal.subject || !modal.start || !modal.end) return
    if (modal.id) {
      setBlocks((arr) => arr.map((x) => (x.id === modal.id ? modal : x)))
    } else {
      setBlocks((arr) => [...arr, { ...modal, id: crypto.randomUUID() }])
    }
    close()
  }
  const remove = (id) => setBlocks((arr) => arr.filter((x) => x.id !== id))
  const move = (idx, dir) => {
    setBlocks((arr) => {
      const copy = arr.slice()
      const j = idx + dir
      if (j < 0 || j >= copy.length) return copy
      const [item] = copy.splice(idx, 1)
      copy.splice(j, 0, item)
      return copy
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Daily Schedule</h2>
        <button onClick={openAdd} className="rounded-md bg-rose-500 text-white px-3 py-1.5 shadow hover:bg-rose-600">
          Add block
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {blocks.map((b, idx) => (
          <div key={b.id} className={`rounded-xl border p-4 bg-white/90 dark:bg-slate-800/80 border-white/70 dark:border-slate-700 shadow-sm`}> 
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900 dark:text-slate-100">{b.subject}</div>
              <div className="text-base sm:text-lg font-semibold tracking-wide text-slate-900 dark:text-slate-100">{b.start} – {b.end}</div>
            </div>
            <div className="mt-2 flex gap-2">
              <button onClick={() => openEdit(b)} className="text-xs underline">Edit</button>
              <button onClick={() => remove(b.id)} className="text-xs underline">Delete</button>
              <button onClick={() => move(idx, -1)} className="text-xs underline">↑</button>
              <button onClick={() => move(idx, 1)} className="text-xs underline">↓</button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 border border-white/60 dark:border-slate-700 p-4">
            <h3 className="font-bold mb-3">{modal.id ? 'Edit' : 'Add'} Block</h3>
            <div className="space-y-2">
              <label className="block text-sm">Subject</label>
              <input
                placeholder="e.g., Math, Biology, History"
                value={modal.subject}
                onChange={(e) => setModal((m) => ({ ...m, subject: e.target.value }))}
                className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white/90 dark:bg-slate-700/60 px-2 py-1.5"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm">Start</label>
                  <input type="time" value={modal.start} onChange={(e) => setModal((m) => ({ ...m, start: e.target.value }))} className="w-full rounded-md border px-2 py-1.5 text-slate-900 dark:text-slate-100" />
                </div>
                <div>
                  <label className="block text-sm">End</label>
                  <input type="time" value={modal.end} onChange={(e) => setModal((m) => ({ ...m, end: e.target.value }))} className="w-full rounded-md border px-2 py-1.5 text-slate-900 dark:text-slate-100" />
                </div>
              </div>
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
