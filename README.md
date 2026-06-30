# Pet Shelter

Web application for managing an animal shelter "Dom za Milenicinja". Implements a full CI/CD workflow with React frontend, Spring Boot backend and MongoDB database, containerized with Docker Compose and deployed on a Kubernetes cluster via GitHub Actions pipeline.

## Stack

| Service  | Technology              | Port  |
|----------|--------------------------|-------|
| Frontend | React + Vite             | 3000  |
| Backend  | Java 17 + Spring Boot    | 8080  |
| Database | MongoDB 7.0 (replica set, 3 nodes) | 27017 |

## Live Deployment

- Backend: https://shelter-backend-qr3y.onrender.com
- Frontend: https://shelter-frontend-yn39.onrender.com
- Database: MongoDB Atlas

Admin panel login: `admin123`

## Local Development

### Prerequisites
- Java 17+
- Maven
- Node.js 20+
- Docker

### Backend
```bash
cd backend
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Seed Database
```bash
curl -X POST http://localhost:8080/api/animals/seed
```

## Docker Compose

```bash
docker compose up --build
curl -X POST http://localhost:8080/api/animals/seed
```

App available at: http://localhost:3000

## Kubernetes

Includes a 3-node MongoDB replica set, horizontally scaled backend and frontend deployments, ConfigMaps, Secrets, and Ingress.

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/mongodb-statefulset.yaml
kubectl apply -f k8s/services.yaml

# Wait for MongoDB pods, then init the replica set
kubectl wait --for=condition=ready pod -l app=mongodb -n shelter --timeout=180s
kubectl apply -f k8s/mongodb-replicaset-init.yaml
kubectl wait --for=condition=complete job/mongodb-replicaset-init -n shelter --timeout=300s

kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/ingress.yaml

kubectl get all -n shelter
```

## CI/CD

GitHub Actions automatically:
1. Builds Docker images for frontend and backend
2. Pushes them to DockerHub with `latest` and commit SHA tags
3. Verifies the live deployment on Render is healthy

Required GitHub secrets:
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

## API Endpoints

| Method | URL                          | Description              |
|--------|------------------------------|---------------------------|
| GET    | /api/animals                 | List all animals          |
| POST   | /api/animals                 | Add new animal            |
| GET    | /api/animals/:id             | Get single animal         |
| DELETE | /api/animals/:id             | Delete animal              |
| POST   | /api/animals/seed            | Seed database              |
| GET    | /api/adoptions                | List adoption requests     |
| POST   | /api/adoptions                | Submit adoption request    |
| PATCH  | /api/adoptions/:id/status     | Approve/reject request     |
| GET    | /api/contact                  | List contact messages      |
| POST   | /api/contact                  | Send contact message       |
| PATCH  | /api/contact/:id/read         | Mark message as read       |

### Environment Variables
Copy `.env.example` to `.env` and adjust the values

