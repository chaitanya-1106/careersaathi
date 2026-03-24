import { useState } from 'react'
import api from '../services/api'

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', student_class: '12th', stream: 'PCM', marks: 75,
    interests: ['Coding'], financial_background: 'Low', area_type: 'Urban', city: 'Delhi'
  })
  const [profileId, setProfileId] = useState(localStorage.getItem('profileId') || '')

  const submit = async () => {
    const res = await api.post('/signup', form)
    localStorage.setItem('profileId', res.data.id)
    setProfileId(res.data.id)
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold mb-3">Student Profile Engine</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input className="border p-2 rounded" placeholder="City" onChange={e => setForm({...form, city: e.target.value})} />
      </div>
      <button className="bg-indigo-600 text-white px-4 py-2 mt-3 rounded" onClick={submit}>Create Profile</button>
      {profileId && <p className="text-sm mt-2">Saved Profile ID: {profileId}</p>}
    </section>
  )
}
