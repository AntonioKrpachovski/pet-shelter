import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getAnimal } from '../api'

export default function AnimalDetail() {
  const { id } = useParams()
  const [animal, setAnimal] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnimal(id).then(setAnimal).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading">Вчитување...</div>
  if (!animal) return <div className="container"><p>Животното не е пронајдено.</p></div>

  return (
    <div className="container">
      <Link to="/animals" style={{ color: '#8A7060', fontWeight: 600, display: 'inline-block', marginBottom: '2rem' }}>
        ← Назад кон животни
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
        <div style={{ borderRadius: '16px', overflow: 'hidden' }}>
          {animal.imageUrl
            ? <img src={animal.imageUrl} alt={animal.name} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            : <div className="card-img-placeholder" style={{ height: '400px' }} />
          }
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontFamily: 'Playfair Display', fontSize: '2.5rem' }}>{animal.name}</h1>
            <span className={`badge ${animal.available ? 'badge-available' : 'badge-unavailable'}`} style={{ position: 'static' }}>
              {animal.available ? 'Достапно' : 'Посвоено'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Вид', value: animal.species === 'dog' ? 'Куче' : 'Мачка' },
              { label: 'Раса', value: animal.breed },
              { label: 'Возраст', value: `${animal.age} години` },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ fontWeight: 700, color: '#8A7060', minWidth: '80px' }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>

          <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>{animal.description}</p>

          {animal.available
            ? <Link to={`/adopt/${animal.id}`} className="btn btn-primary btn-lg">Посвои го/ја</Link>
            : <p style={{ color: '#6B8C6B', fontWeight: 700, fontSize: '1.1rem' }}>Ова животно е веќе посвоено.</p>
          }
        </div>
      </div>
    </div>
  )
}
