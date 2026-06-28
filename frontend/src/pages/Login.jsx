import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = 'admin123'

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onLogin()
      navigate('/admin')
    } else {
      setError('Погрешна лозинка.')
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Најава</h1>
        <p>Пристап само за администратори</p>
      </div>
      <div className="container">
        <div className="form-card" style={{ maxWidth: '400px' }}>
          <h2 style={{ marginBottom: '1.5rem', fontFamily: 'Playfair Display', color: '#7C4A2D' }}>Администраторска најава</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Лозинка</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Внесете лозинка"
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Најави се
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
