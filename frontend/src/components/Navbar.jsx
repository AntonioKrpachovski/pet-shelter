import { NavLink } from 'react-router-dom'

export default function Navbar({ isAdmin, onLogout }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-brand">
          Дом за Милениченија
        </NavLink>
        <ul className="nav-links">
          <li><NavLink to="/" end>Почетна</NavLink></li>
          <li><NavLink to="/animals">Животни</NavLink></li>
          <li><NavLink to="/adopt">Посвои</NavLink></li>
          <li><NavLink to="/contact">Контакт</NavLink></li>
          {isAdmin && (
            <li><NavLink to="/admin" style={({ isActive }) => isActive ? { color: '#C9694A' } : {}}>Админ</NavLink></li>
          )}
          {isAdmin
            ? <li><button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#8A7060', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'Nunito, sans-serif' }}>Одјави се</button></li>
            : <li><NavLink to="/login" style={({ isActive }) => isActive ? { color: '#C9694A' } : {}}>Најава</NavLink></li>
          }
        </ul>
      </div>
    </nav>
  )
}
