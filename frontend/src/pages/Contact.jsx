import { useState } from 'react'
import { sendMessage } from '../api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendMessage(form)
      setSuccess(true)
    } catch {
      setError('Грешка при испраќање. Обиди се повторно.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1>Контактирај нè</h1>
        <p>Имаш прашање? Со задоволство ќе одговориме.</p>
      </div>

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', maxWidth: '900px' }}>
          <div>
            <h3 style={{ fontWeight: 800, color: '#7C4A2D', marginBottom: '1.5rem' }}>Информации</h3>
            {[
              { label: 'Адреса', value: 'Лајка Засолниште, Скопје' },
              { label: 'Телефон', value: '+389 2 XXX XXXX' },
              { label: 'Е-пошта', value: 'info@laika.mk' },
              { label: 'Работно време', value: 'Пон–Саб: 09:00–17:00' },
            ].map(({ label, value }) => (
              <div key={label} style={{ marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#8A7060', marginBottom: '0.2rem' }}>{label}</div>
                <div>{value}</div>
              </div>
            ))}
          </div>

          <div className="form-card">
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <h3>Пораката е испратена!</h3>
                <p style={{ color: '#8A7060', marginTop: '0.5rem' }}>Ќе одговориме наскоро.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-error">{error}</div>}
                <div className="form-row">
                  <div className="form-group">
                    <label>Вашето име *</label>
                    <input name="name" required placeholder="Марко Марковски" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Е-пошта *</label>
                    <input name="email" type="email" required placeholder="marko@email.com" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Тема *</label>
                  <input name="subject" required placeholder="За што се работи?" value={form.subject} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Порака *</label>
                  <textarea name="message" rows="5" required value={form.message} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                  {loading ? 'Испраќање...' : 'Испрати порака'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
