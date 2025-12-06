# 🛠 Project Setup (Manual + Docker)

## MANUAL SETUP

### 1. Clone the repository

```
git clone https://github.com/Amanc77/learning-management-system.git
cd learning-management-system
```

### 2. Install backend dependencies

```
cd server
npm install
```

### 3. Install frontend dependencies

```
cd ../client
npm install
```

### 4. Create server/.env

```
PORT=8000
MONGO_URI=your_mongo_uri
SECRET_KEY=your_secret
CLIENT_URL=http://localhost:5173
FRONTEND_URL=http://localhost:5173
CLOUD_NAME=your_cloudinary
API_KEY=your_key
API_SECRET=your_secret
RAZORPAY_ID_KEY=your_key
RAZORPAY_SECRET_KEY=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
```

### 5. Run backend

```
cd server
npm run dev
```

### 6. Run frontend

```
cd client
npm run dev
```

Your local setup will run on:
Backend → http://localhost:8000  
Frontend → http://localhost:5173

# 🐳 DOCKER SETUP

### 1. Create server/.env.docker

```
NODE_ENV=production
PORT=8000
MONGO_URI=your_mongo_uri
SECRET_KEY=your_secret
FRONTEND_URL=http://localhost:8000
CLIENT_URL=http://localhost:8000
CLOUD_NAME=your_cloudinary
API_KEY=your_key
API_SECRET=your_secret
RAZORPAY_ID_KEY=your_key
RAZORPAY_SECRET_KEY=your_secret
GOOGLE_CLIENT_ID=your_id
GOOGLE_CLIENT_SECRET=your_secret
GOOGLE_CALLBACK_URL=http://localhost:8000/auth/google/callback
```

### 2. Dockerfile (already included in repo)

Multi‑stage build for frontend + backend.

### 3. docker-compose.yml (already included)

Runs everything in one container.

### 4. Build and run

```
docker compose build --no-cache
docker compose up
```

App runs at:
http://localhost:8000

### 5. Stop containers

```
docker compose down
```
