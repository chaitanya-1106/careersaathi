import { useEffect, useState } from 'react'
import api from '../services/api'

export default function DashboardPage() {
  const [jobs, setJobs] = useState([])
  const [scholarships, setScholarships] = useState([])
  const [mentors, setMentors] = useState([])

  useEffect(() => {
    api.get('/jobs').then(r => setJobs(r.data.jobs))
    api.get('/scholarships').then(r => setScholarships(r.data.scholarships))
    api.get('/mentors').then(r => setMentors(r.data.mentors))
  }, [])

  return (
    <section className="grid md:grid-cols-3 gap-4">
      <Card title="Jobs" items={jobs.map(i => i.title)} />
      <Card title="Scholarships" items={scholarships.map(i => i.name)} />
      <Card title="Mentors" items={mentors.map(i => i.name)} />
    </section>
  )
}

function Card({ title, items }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="font-semibold">{title}</h3>
      <ul className="text-sm mt-2 list-disc pl-5">
        {items.map(x => <li key={x}>{x}</li>)}
      </ul>
    </div>
  )
}
