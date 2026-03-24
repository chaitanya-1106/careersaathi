import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="bg-indigo-700 text-white p-4 sticky top-0">
        <div className="max-w-5xl mx-auto flex justify-between">
          <h1 className="font-bold">CareerSaathi</h1>
          <nav className="space-x-3 text-sm">
            <Link to="/">Signup</Link>
            <Link to="/quiz">Quiz</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/chat">AI Chat</Link>
            <Link to="/roadmap">Roadmap</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  )
}
