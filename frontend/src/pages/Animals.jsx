import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAnimals } from '../api'

export default function Animals() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [species, setSpecies] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = species ? { species } : {}
    getAnimals(params)
      .then(setAnimals)
      .finally(() => setLoading(false))
  }, [species])

  return (
    <>
      <div className="page-header">
        <h1>Нашите животни</h1>
        <p>Запознај ги сите милениченија кои бараат дом</p>
      </div>

      <div className="container">
        <div className="filter-bar">
          <button className={`filter-btn ${species === '' ? 'active' : ''}`} onClick={() => setSpecies('')}>Сите</button>
          <button className={`filter-btn ${species === 'dog' ? 'active' : ''}`} onClick={() => setSpecies('dog')}>Кучиња</button>
          <button className={`filter-btn ${species === 'cat' ? 'active' : ''}`} onClick={() => setSpecies('cat')}>Мачки</button>
        </div>

        {loading ? (
          <div className="loading">Вчитување...</div>
        ) : animals.length === 0 ? (
          <div className="empty-state"><p>Нема животни за прикажување.</p></div>
        ) : (
          <div className="animal-grid">
            {animals.map(animal => (
              <div key={animal.id} className="animal-card">
                <div className="card-img-wrap">
                  {animal.imageUrl
                    ? <img src={animal.imageUrl} alt={animal.name} className="card-img" />
                    : <div className="card-img-placeholder" />
                  }
                  <span className={`badge ${animal.available ? 'badge-available' : 'badge-unavailable'}`}>
                    {animal.available ? 'Достапно' : 'Посвоено'}
                  </span>
                </div>
                <div className="card-body">
                  <h3>{animal.name}</h3>
                  <p className="card-meta">{animal.breed} · {animal.age} год.</p>
                  <p className="card-desc">{animal.description}</p>
                  <div className="card-actions">
                    <Link to={`/animals/${animal.id}`} className="btn btn-sm">Детали</Link>
                    {animal.available && (
                      <Link to={`/adopt/${animal.id}`} className="btn btn-sm btn-primary">Посвои</Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
