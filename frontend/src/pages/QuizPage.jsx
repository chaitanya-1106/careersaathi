import { useState } from 'react'
import api from '../services/api'

const QUESTIONS = [
  { id: 'q1', text: 'You enjoy?', options: ['aptitude_logic', 'skills_creative', 'skills_biology'] },
  { id: 'q2', text: 'You prefer?', options: ['personality_extrovert', 'personality_introvert', 'skills_civics'] }
]

export default function QuizPage() {
  const [result, setResult] = useState(null)
  const profileId = localStorage.getItem('profileId') || ''

  const submit = async () => {
    const answers = QUESTIONS.map(q => ({ question_id: q.id, option: q.options[0] }))
    const res = await api.post('/psychometric-test', { profile_id: profileId, answers })
    setResult(res.data)
  }

  return (
    <section className="bg-white rounded-xl p-4 shadow">
      <h2 className="font-semibold">Psychometric Test</h2>
      {QUESTIONS.map(q => <p key={q.id} className="text-sm mt-2">• {q.text}</p>)}
      <button className="bg-emerald-600 text-white px-4 py-2 mt-3 rounded" onClick={submit}>Submit Test</button>
      {result && <p className="mt-3">Cluster: <b>{result.cluster}</b> | Match: {result.career_match_score}%</p>}
    </section>
  )
}
