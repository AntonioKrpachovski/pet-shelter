import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAnimals } from '../api'

export default function Home() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnimals({ available: true })
      .then(data => setAnimals(data.slice(0, 3)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="hero">
        <div>
          <h1>Најди го твојот<br /><span className="accent">нов најдобар пријател</span></h1>
          <p>Стотици животни чекаат топол дом. Посвои, не купувај.</p>
          <div className="hero-actions">
            <Link to="/animals" className="btn btn-primary">Види животни</Link>
            <Link to="/contact" className="btn btn-outline">Контактирај нè</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', color: '#7C4A2D', marginBottom: '0.5rem' }}>
          Истакнати животни
        </h2>
        <p style={{ color: '#8A7060', marginBottom: '2.5rem' }}>
          Запознај ги нашите пријатели кои те чекаат
        </p>

        {loading ? (
          <div className="loading">Вчитување...</div>
        ) : (
          <div className="animal-grid">
            {animals.map(animal => (
              <div key={animal.id} className="animal-card">
                <div className="card-img-wrap">
                  {animal.imageUrl
                    ? <img src={animal.imageUrl} alt={animal.name} className="card-img" />
                    : <div className="card-img-placeholder" />
                  }
                  <span className="badge badge-available">Достапно</span>
                </div>
                <div className="card-body">
                  <h3>{animal.name}</h3>
                  <p className="card-meta">{animal.breed} · {animal.age} год.</p>
                  <p className="card-desc">{animal.description}</p>
                  <div className="card-actions">
                    <Link to={`/animals/${animal.id}`} className="btn btn-sm btn-primary">Дознај повеќе</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link to="/animals" className="btn btn-primary">Види сите животни</Link>
        </div>

        <div style={{ marginTop: '4rem', background: '#E8D5B7', borderRadius: '16px', padding: '3rem' }}>
          <h2 style={{ fontFamily: 'Playfair Display', fontSize: '2rem', color: '#7C4A2D', marginBottom: '2rem', textAlign: 'center' }}>
            Како да посвоиш?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Избери животно', desc: 'Прегледај ги нашите животни и избери го своето идно милениче.' },
              { step: '02', title: 'Поднеси барање', desc: 'Пополни ја формата за посвојување со твоите информации.' },
              { step: '03', title: 'Донеси го дома', desc: 'Нашиот тим ќе се поврзе со тебе и ќе го организира преземањето.' },
            ].map(item => (
              <div key={item.step} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: '#C9694A', marginBottom: '0.75rem' }}>{item.step}</div>
                <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#7C4A2D' }}>{item.title}</h3>
                <p style={{ color: '#8A7060', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
