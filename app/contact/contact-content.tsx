'use client'

import { useState } from 'react'

export function ContactContent() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Name:', name)
    console.log('Message:', message)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <div>
        <label className="block mb-1">الاسم</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="اكتب اسمك"
        />
      </div>

      <div>
        <label className="block mb-1">الرسالة</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder="اكتب رسالتك"
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        إرسال
      </button>
    </form>
  )
}
