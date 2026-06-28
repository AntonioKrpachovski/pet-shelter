# Дом за Милениченија

Веб апликација за управување со засолниште за животни — Лајка Скопје.

## Стек

| Сервис   | Технологија           | Порт  |
|----------|-----------------------|-------|
| Frontend | React + Vite          | 3000  |
| Backend  | Java 17 + Spring Boot | 8080  |
| Database | MongoDB 7.0           | 27017 |

## Локален развој

```bash
# MongoDB
docker run -d --name mongodb -p 27017:27017 mongo:7.0

# Backend
cd backend && mvn spring-boot:run

# Frontend
cd frontend && npm install && npm run dev

# Seed
curl -X POST http://localhost:8080/api/animals/seed
```

Апликацијата е достапна на: http://localhost:3000

Админ лозинка: admin123
