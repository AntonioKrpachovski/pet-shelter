import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Animals from './pages/Animals'
import AnimalDetail from './pages/AnimalDetail'
import Adopt from './pages/Adopt'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import Login from './pages/Login'

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  const handleLogin = () => setIsAdmin(true)
  const handleLogout = () => setIsAdmin(false)

  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar isAdmin={isAdmin} onLogout={handleLogout} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animals" element={<Animals />} />
            <Route path="/animals/:id" element={<AnimalDetail />} />
            <Route path="/adopt" element={<Adopt />} />
            <Route path="/adopt/:animalId" element={<Adopt />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={isAdmin ? <Admin /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Дом за Милениченија — Лајка Скопје</p>
          <p>Секое животно заслужува дом.</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
