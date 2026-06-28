const BASE = '/api'

export const getAnimals = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return fetch(`${BASE}/animals${query ? '?' + query : ''}`).then(r => r.json())
}

export const getAnimal = (id) =>
  fetch(`${BASE}/animals/${id}`).then(r => r.json())

export const createAnimal = (data) =>
  fetch(`${BASE}/animals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const deleteAnimal = (id) =>
  fetch(`${BASE}/animals/${id}`, { method: 'DELETE' })

export const seedAnimals = () =>
  fetch(`${BASE}/animals/seed`, { method: 'POST' }).then(r => r.json())

export const getAdoptions = (params = {}) => {
  const query = new URLSearchParams(params).toString()
  return fetch(`${BASE}/adoptions${query ? '?' + query : ''}`).then(r => r.json())
}

export const createAdoption = (data) =>
  fetch(`${BASE}/adoptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const updateAdoptionStatus = (id, status) =>
  fetch(`${BASE}/adoptions/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  }).then(r => r.json())

export const getMessages = () =>
  fetch(`${BASE}/contact`).then(r => r.json())

export const sendMessage = (data) =>
  fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(r => r.json())

export const markMessageRead = (id) =>
  fetch(`${BASE}/contact/${id}/read`, { method: 'PATCH' }).then(r => r.json())
