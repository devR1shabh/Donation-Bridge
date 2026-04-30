# Donation Bridge Frontend

React frontend for the Donation Bridge MERN app.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app reads the backend URL from:

```bash
VITE_API_BASE_URL=https://donation-bridge-api.onrender.com/api/v1
```

For a local backend, set:

```bash
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

If you run the frontend locally, update the backend `CLIENT_URL` value to the Vite URL, usually:

```bash
CLIENT_URL=http://localhost:5173
```
