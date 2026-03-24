import { useState } from 'react'
import api from '../services/api'

export default function ChatPage() {
  const [query, setQuery] = useState('Best career for me?')
  const [lang, setLang] = useState('en')
  const [answer, setAnswer] = useState('')

  const ask = async () => {
    const profile_id = localStorage.getItem('profileId') || ''
    const res = await api.post('/ask-ai', { profile_id, query, lang })
    setAnswer(res.data.answer)
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold">AI Chat + RAG</h2>
      <textarea className="border rounded p-2 w-full mt-2" value={query} onChange={e => setQuery(e.target.value)} />
      <select className="border rounded p-2 mt-2" value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
      <div><button className="bg-indigo-600 text-white px-4 py-2 mt-3 rounded" onClick={ask}>Ask AI</button></div>
      {answer && <p className="mt-3 text-sm">{answer}</p>}
    </section>
  )
}
