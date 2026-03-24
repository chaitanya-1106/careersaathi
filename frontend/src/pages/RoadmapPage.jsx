import { useEffect, useState } from 'react'
import api from '../services/api'

export default function RoadmapPage() {
  const [data, setData] = useState(null)
  useEffect(() => { api.get('/roadmap?career=Data Scientist').then(r => setData(r.data)) }, [])

  if (!data) return <p>Loading roadmap...</p>
  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold">Roadmap: {data.career}</h2>
      <ul className="list-disc pl-5 mt-2 text-sm">
        {data.steps.map(s => <li key={s.timeline}><b>{s.timeline}:</b> {s.action}</li>)}
      </ul>
    </section>
  )
}
