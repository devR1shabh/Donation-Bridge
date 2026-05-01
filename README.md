# Donation Bridge - Full-Stack MERN Food Donation Platform

Donation Bridge is a role-based food donation platform that connects restaurants with NGOs. Restaurants can post surplus food donations, NGOs can claim available donations, and restaurants can confirm final pickup.

The project is built around a controlled donation lifecycle:

```txt
available -> claimed -> collected
```

This ensures that donations move through a predictable workflow, prevents multiple NGOs from claiming the same donation, and keeps collection responsibility clear.

## Live Links

| Resource | URL |
| --- | --- |
| Live App | https://donation-bridge-iota.vercel.app |
| Backend API | https://donation-bridge-api.onrender.com |
| Swagger Docs | https://donation-bridge-api.onrender.com/api-docs |

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- Axios
- CSS
- Vercel deployment

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- bcrypt password hashing
- Swagger UI
- express-rate-limit
- Render deployment

## Key Features

- User signup and login
- JWT-based authentication
- Role-based authorization for restaurants and NGOs
- Protected frontend routes
- Restaurant dashboard
- NGO dashboard
- Create food donations
- View restaurant's own donations
- View available donations
- Claim donations
- View claimed donations
- Mark claimed donations as collected
- API pagination, filtering, and sorting
- Swagger API documentation
- API rate limiting
- Production deployment with separate frontend and backend services

## User Roles

### Restaurant

Restaurants can:

- Create food donations
- View their own donations
- Track donation status
- Mark claimed donations as collected

### NGO

NGOs can:

- View available donations
- Claim a donation
- View their claimed donations

## Donation Lifecycle

```txt
Restaurant creates donation
        |
        v
Status: available
        |
        v
NGO claims donation
        |
        v
Status: claimed
        |
        v
Restaurant confirms pickup
        |
        v
Status: collected
```

Lifecycle rules:

- Only restaurants can create donations.
- Only NGOs can claim donations.
- A donation can only be claimed if it is available.
- A restaurant can only mark its own claimed donation as collected.
- Collected donations complete the workflow.

## System Architecture

```txt
React Frontend
      |
      v
Axios API Layer
      |
      v
Express REST API
      |
      v
JWT Authentication Middleware
      |
      v
Role Authorization Middleware
      |
      v
Controllers
      |
      v
Mongoose Models
      |
      v
MongoDB Database
```

## API Endpoints

Base API URL:

```txt
https://donation-bridge-api.onrender.com/api/v1
```

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | Public | Register a restaurant or NGO |
| POST | `/auth/login` | Public | Login and receive JWT token |

### Restaurant Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/donation/create` | Restaurant | Create a donation |
| GET | `/donation/my-donations` | Restaurant | View own donations |
| PATCH | `/donation/:id/collect` | Restaurant | Mark donation as collected |

### NGO Routes

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| GET | `/donation/available` | NGO | View available donations |
| POST | `/donation/:id/claim` | NGO | Claim a donation |
| GET | `/donation/claimed` | NGO | View claimed donations |

## Example API Request

### Create Donation

```http
POST /api/v1/donation/create
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

```json
{
  "foodName": "Cooked Rice",
  "quantity": "50 plates",
  "location": "Sector 18, Noida",
  "pickupBy": "2026-04-05T20:31:58.857Z"
}
```

### Example Response

```json
{
  "success": true,
  "message": "Donation Created successfully",
  "donation": {
    "_id": "donation_id",
    "foodName": "Cooked Rice",
    "quantity": "50 plates",
    "location": "Sector 18, Noida",
    "status": "available"
  }
}
```

## Project Structure

```txt
Donation-Bridge/
|
|-- index.js
|-- package.json
|-- README.md
|-- src/
|   |-- app.js
|   |-- config/
|   |   |-- database.js
|   |-- controllers/
|   |   |-- authController.js
|   |   |-- donationController.js
|   |-- middleware/
|   |   |-- authMiddleware.js
|   |   |-- errorMiddleware.js
|   |   |-- roleMiddleware.js
|   |-- models/
|   |   |-- Donation.js
|   |   |-- User.js
|   |-- routes/
|       |-- authRoutes.js
|       |-- donationRoutes.js
|
|-- frontend/
    |-- index.html
    |-- package.json
    |-- vite.config.js
    |-- vercel.json
    |-- src/
        |-- App.jsx
        |-- main.jsx
        |-- styles.css
        |-- api/
        |   |-- axios.js
        |-- components/
        |   |-- DonationCard.jsx
        |   |-- EmptyState.jsx
        |   |-- Loading.jsx
        |   |-- Navbar.jsx
        |   |-- ProtectedRoute.jsx
        |   |-- StatusMessage.jsx
        |-- context/
        |   |-- AuthContext.jsx
        |-- pages/
            |-- AvailableDonations.jsx
            |-- ClaimedDonations.jsx
            |-- CreateDonation.jsx
            |-- Dashboard.jsx
            |-- Login.jsx
            |-- MyDonations.jsx
            |-- Signup.jsx
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/devR1shabh/Donation-Bridge
cd Donation-Bridge
```

### 2. Configure backend environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 3. Install and run backend

```bash
npm install
npm run dev
```

Backend will run on:

```txt
http://localhost:5000
```

Swagger docs will be available at:

```txt
http://localhost:5000/api-docs
```

### 4. Configure frontend environment variables

Go to the frontend folder:

```bash
cd frontend
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### 5. Install and run frontend

```bash
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

## Production Environment Variables

### Render Backend

```env
PORT=10000
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://donation-bridge-iota.vercel.app
```

### Vercel Frontend

```env
VITE_API_BASE_URL=https://donation-bridge-api.onrender.com/api/v1
```

## Deployment

### Backend

The backend is deployed on Render.

Render settings:

```txt
Build Command: npm install
Start Command: node index.js
```

### Frontend

The frontend is deployed on Vercel.

Vercel settings:

```txt
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

## Security Features

- Passwords hashed with bcrypt
- JWT authentication
- Protected API routes
- Role-based route access
- Rate limiting using express-rate-limit
- Environment variables for secrets
- CORS configured for production frontend

## Tested Flows

- Restaurant signup
- Restaurant login
- Restaurant donation creation
- Restaurant view own donations
- NGO signup
- NGO login
- NGO view available donations
- NGO claim donation
- NGO view claimed donations
- Restaurant mark donation as collected
- Full donation lifecycle from available to claimed to collected

## Future Improvements

- Add unit and integration tests using Jest and Supertest
- Add image upload support for donations
- Add pickup reminder notifications
- Add Redis caching for frequently accessed donations
- Add admin dashboard
- Dockerize the full-stack application

## Author

Rishabh Vyas

- GitHub: https://github.com/devR1shabh
- LinkedIn: https://www.linkedin.com/in/rishabhvyas-dev
- Email: rishavvyas74@gmail.com
