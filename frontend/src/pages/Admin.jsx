import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAnimals, getAdoptions, getMessages, deleteAnimal, updateAdoptionStatus, markMessageRead, seedAnimals, createAnimal } from '../api'

export default function Admin() {
  const [tab, setTab] = useState('animals')
  const [animals, setAnimals] = useState([])
  const [adoptions, setAdoptions] = useState([])
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAnimal, setNewAnimal] = useState({ name: '', species: 'dog', breed: '', age: 1, description: '', imageUrl: '' })
  const [feedback, setFeedback] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      const [a, ad, m] = await Promise.all([getAnimals(), getAdoptions(), getMessages()])
      setAnimals(a); setAdoptions(ad); setMessages(m)
    } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const notify = msg => { setFeedback(msg); setTimeout(() => setFeedback(''), 3000) }

  const handleSeed = async () => { await seedAnimals(); notify('Базата е пополнета со 6 животни.'); loadData() }

  const handleDelete = async id => {
    if (!confirm('Сигурно сакаш да го избришеш?')) return
    await deleteAnimal(id); notify('Животното е избришано.'); loadData()
  }

  const handleAdoptionStatus = async (id, status) => {
    await updateAdoptionStatus(id, status)
    notify(`Статусот е сменет во: ${status}`)
    loadData()
  }

  const handleMarkRead = async id => { await markMessageRead(id); loadData() }

  const handleAddAnimal = async e => {
    e.preventDefault()
    await createAnimal({ ...newAnimal, age: parseInt(newAnimal.age), available: true })
    notify('Животното е додадено.')
    setShowAddForm(false)
    setNewAnimal({ name: '', species: 'dog', breed: '', age: 1, description: '', imageUrl: '' })
    loadData()
  }

  const pendingAdoptions = adoptions.filter(a => a.status === 'pending').length
  const unreadMessages = messages.filter(m => !m.read).length

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h3>Управување</h3>
        <a href="#" className={tab === 'animals' ? 'active' : ''} onClick={e => { e.preventDefault(); setTab('animals') }}>
          Животни ({animals.length})
        </a>
        <a href="#" className={tab === 'adoptions' ? 'active' : ''} onClick={e => { e.preventDefault(); setTab('adoptions') }}>
          Посвојувања {pendingAdoptions > 0 && <span style={{ background: '#C9694A', color: 'white', borderRadius: '99px', padding: '0 6px', fontSize: '0.75rem', marginLeft: '4px' }}>{pendingAdoptions}</span>}
        </a>
        <a href="#" className={tab === 'messages' ? 'active' : ''} onClick={e => { e.preventDefault(); setTab('messages') }}>
          Пораки {unreadMessages > 0 && <span style={{ background: '#C9694A', color: 'white', borderRadius: '99px', padding: '0 6px', fontSize: '0.75rem', marginLeft: '4px' }}>{unreadMessages}</span>}
        </a>
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '1rem 0' }} />
        <Link to="/">Кон сајтот</Link>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>Администраторски Панел</h1>
          <button className="btn btn-sm" onClick={handleSeed} style={{ background: '#E8D5B7', color: '#7C4A2D', borderColor: '#E8D5B7' }}>
            Пополни база
          </button>
        </div>

        {feedback && <div className="alert alert-success">{feedback}</div>}

        <div className="stats-row">
          <div className="stat-card"><div className="stat-number">{animals.length}</div><div className="stat-label">Вкупно животни</div></div>
          <div className="stat-card"><div className="stat-number">{pendingAdoptions}</div><div className="stat-label">Чекачки барања</div></div>
          <div className="stat-card"><div className="stat-number">{unreadMessages}</div><div className="stat-label">Непрочитани пораки</div></div>
        </div>

        {loading ? <div className="loading">Вчитување...</div> : (
          <>
            {tab === 'animals' && (
              <div className="section-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #F0EAE3' }}>
                  <h2 style={{ margin: 0, border: 0, padding: 0 }}>Животни</h2>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Откажи' : 'Додај животно'}
                  </button>
                </div>

                {showAddForm && (
                  <form onSubmit={handleAddAnimal} style={{ background: '#F8F5F0', borderRadius: '8px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-row" style={{ marginBottom: '1rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Име *</label>
                        <input required value={newAnimal.name} onChange={e => setNewAnimal({ ...newAnimal, name: e.target.value })} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Вид *</label>
                        <select value={newAnimal.species} onChange={e => setNewAnimal({ ...newAnimal, species: e.target.value })}>
                          <option value="dog">Куче</option>
                          <option value="cat">Мачка</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row" style={{ marginBottom: '1rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Раса *</label>
                        <input required value={newAnimal.breed} onChange={e => setNewAnimal({ ...newAnimal, breed: e.target.value })} />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label>Возраст *</label>
                        <input type="number" min="0" max="30" required value={newAnimal.age} onChange={e => setNewAnimal({ ...newAnimal, age: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Опис *</label>
                      <textarea required rows="3" value={newAnimal.description} onChange={e => setNewAnimal({ ...newAnimal, description: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>URL на слика (опционално)</label>
                      <input value={newAnimal.imageUrl} onChange={e => setNewAnimal({ ...newAnimal, imageUrl: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary">Зачувај</button>
                  </form>
                )}

                <table className="admin-table">
                  <thead>
                    <tr><th>Ime</th><th>Вид</th><th>Раса</th><th>Возраст</th><th>Статус</th><th>Акции</th></tr>
                  </thead>
                  <tbody>
                    {animals.map(a => (
                      <tr key={a.id}>
                        <td><strong>{a.name}</strong></td>
                        <td>{a.species === 'dog' ? 'Куче' : 'Мачка'}</td>
                        <td>{a.breed}</td>
                        <td>{a.age} год.</td>
                        <td><span className={`status-badge ${a.available ? 'status-approved' : 'status-rejected'}`}>{a.available ? 'Достапно' : 'Посвоено'}</span></td>
                        <td style={{ display: 'flex', gap: '0.5rem' }}>
                          <Link to={`/animals/${a.id}`} className="btn btn-sm">Детали</Link>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(a.id)}>Избриши</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'adoptions' && (
              <div className="section-card">
                <h2>Барања за посвојување</h2>
                <table className="admin-table">
                  <thead>
                    <tr><th>Апликант</th><th>Е-пошта</th><th>Телефон</th><th>Порака</th><th>Статус</th><th>Акции</th></tr>
                  </thead>
                  <tbody>
                    {adoptions.length === 0 ? (
                      <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: '#8A7060' }}>Нема барања.</td></tr>
                    ) : adoptions.map(a => (
                      <tr key={a.id}>
                        <td><strong>{a.applicantName}</strong></td>
                        <td>{a.applicantEmail}</td>
                        <td>{a.applicantPhone}</td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.message || '—'}</td>
                        <td><span className={`status-badge status-${a.status}`}>{a.status}</span></td>
                        <td>
                          {a.status === 'pending' ? (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button className="btn btn-sm" style={{ background: '#D4EDDA', color: '#155724', borderColor: '#D4EDDA' }} onClick={() => handleAdoptionStatus(a.id, 'approved')}>Одобри</button>
                              <button className="btn btn-sm" style={{ background: '#F8D7DA', color: '#721C24', borderColor: '#F8D7DA' }} onClick={() => handleAdoptionStatus(a.id, 'rejected')}>Одбиј</button>
                            </div>
                          ) : (
                            <span style={{ color: '#8A7060', fontSize: '0.85rem' }}>Завршено</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'messages' && (
              <div className="section-card">
                <h2>Контакт пораки</h2>
                <table className="admin-table">
                  <thead>
                    <tr><th>Ime</th><th>Е-пошта</th><th>Тема</th><th>Порака</th><th>Акции</th></tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 ? (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#8A7060' }}>Нема пораки.</td></tr>
                    ) : messages.map(m => (
                      <tr key={m.id} style={{ opacity: m.read ? 0.6 : 1 }}>
                        <td><strong>{m.name}</strong></td>
                        <td>{m.email}</td>
                        <td>{m.subject}</td>
                        <td style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.message}</td>
                        <td>
                          {!m.read
                            ? <button className="btn btn-sm btn-primary" onClick={() => handleMarkRead(m.id)}>Означи прочитана</button>
                            : <span style={{ color: '#8A7060', fontSize: '0.85rem' }}>Прочитана</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
