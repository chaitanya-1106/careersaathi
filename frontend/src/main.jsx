import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import SignupPage from './pages/SignupPage'
import QuizPage from './pages/QuizPage'
import DashboardPage from './pages/DashboardPage'
import ChatPage from './pages/ChatPage'
import RoadmapPage from './pages/RoadmapPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
