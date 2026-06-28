import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAnimal, createAdoption } from '../api'

export default function Adopt() {
  const { animalId } = useParams()
  const [animal, setAnimal] = useState(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    animalId: animalId || '',
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    message: ''
  })

  useEffect(() => {
    if (animalId) getAnimal(animalId).then(setAnimal)
  }, [animalId])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.animalId) { setError('Избери животно прво.'); return }
    setLoading(true)
    setError('')
    try {
      await createAdoption(form)
      setSuccess(true)
    } catch {
      setError('Грешка при поднесување. Обиди се повторно.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Барање за посвојување</h1>
        <p>Пополни ја формата и ние ќе се јавиме наскоро</p>
      </div>

      <div className="container">
        {success ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Барањето е поднесено!</h2>
            <p style={{ color: '#8A7060', marginBottom: '2rem' }}>Ќе ве контактираме наскоро.</p>
            <Link to="/animals" className="btn btn-primary">Назад кон животни</Link>
          </div>
        ) : (
          <div className="form-card">
            {animal && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#E8D5B7', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <strong>{animal.name}</strong>
                  <div style={{ color: '#8A7060', fontSize: '0.9rem' }}>{animal.breed}</div>
                </div>
              </div>
            )}

            {!animalId && (
              <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
                Не е избрано животно. <Link to="/animals">Избери животно прво.</Link>
              </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="animalId" value={form.animalId} />

              <div className="form-group">
                <label>Вашето име и презиме *</label>
                <input name="applicantName" required placeholder="Марко Марковски" value={form.applicantName} onChange={handleChange} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Е-пошта *</label>
                  <input name="applicantEmail" type="email" required placeholder="marko@email.com" value={form.applicantEmail} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Телефон *</label>
                  <input name="applicantPhone" required placeholder="+389 XX XXX XXX" value={form.applicantPhone} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Зошто сакате да посвоите? (опционално)</label>
                <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Поднесување...' : 'Поднеси барање'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  )
}
