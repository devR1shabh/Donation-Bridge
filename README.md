# 🍽️ Donation Bridge — Backend API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![API](https://img.shields.io/badge/API-REST-orange)


A **role-based food donation management backend** where restaurants donate surplus food and NGOs claim and collect it.  
The system enforces a structured **donation lifecycle and responsibility model** to ensure food distribution happens transparently and efficiently.

This backend focuses on **secure authentication, role-based authorization, and workflow-driven API design**, rather than simple CRUD operations.

---

## 🚀 Overview

Donation Bridge solves a real-world coordination problem:

Connecting **food donors (restaurants)** with **food distributors (NGOs)**.

Restaurants often have surplus food, while NGOs distribute it to people in need. This backend provides the infrastructure to ensure:

- Only authorized users perform actions
- Food donations follow a a structured lifecycle
- NGOs cannot claim already claimed donations
- Restaurants confirm final collection

---

## ✨ Features

- JWT Authentication
- Role-Based Access Control (Restaurant / NGO)
- Secure password hashing using **bcrypt**
- Donation lifecycle management
- Swagger API documentation
- Rate limiting for API protection
- RESTful API architecture
- MongoDB database integration
- Deployed backend API

---

## 🧠 System Architecture

```
Client (Swagger UI / Future Frontend)
            │
            ▼
       Express Server
            │
            ▼
 Authentication Middleware (JWT)
            │
            ▼
  Role Authorization Middleware
            │
            ▼
       Controllers
      (Business Logic)
            │
            ▼
       MongoDB Database
       (Mongoose Models)
```

### Architecture Layers

| Layer | Responsibility |
|------|------|
| Routes | Define API endpoints |
| Middleware | Authentication & role validation |
| Controllers | Business logic implementation |
| Models | MongoDB data structure |
| Database | Persistent storage |

---

## 🔄 Donation Lifecycle

```
Restaurant creates donation
        │
        ▼
Status: AVAILABLE
        │
        ▼
NGO views available donations
        │
        ▼
NGO claims donation
        │
        ▼
Status: CLAIMED
        │
        ▼
Restaurant confirms pickup
        │
        ▼
Status: COLLECTED
```

This ensures:

- Only **one NGO** can claim a donation
- Restaurants **verify final pickup**
- All actions follow a **controlled workflow**

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt Password Hashing
- Swagger UI
- express-rate-limit
- Render Deployment

---

## 📦 API Endpoints

### 🔑 Authentication Routes

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/v1/auth/signup | Register a new user |
| POST | /api/v1/auth/login | Login and receive JWT token |

---

### 🍽️ Restaurant Routes

| Method | Endpoint | Description |
|------|------|------|
| POST | /api/v1/donation/create | Create a new donation |
| PATCH | /api/v1/donation/{id}/collect | Mark donation as collected |

---

### 🤝 NGO Routes

| Method | Endpoint | Description |
|------|------|------|
| GET | /api/v1/donation/available | View available donations |
| POST | /api/v1/donation/{id}/claim | Claim a donation |

---

## 📄 Example API Request

### Create Donation

POST /api/v1/donation/create

#### Request Body

```json
{
  "foodName": "Cooked Rice",
  "quantity": "50 plates",
  "location": "Sector 18, Noida",
  "pickupBy": "2026-04-05T20:31:58.857Z"
}
```

#### Response

```json
{
  "success": true,
  "message": "Donation Created successfully"
}
```

---

## 📚 API Documentation

Interactive API documentation is available via **Swagger UI**.

### Local Development

http://localhost:5000/api-docs

Swagger allows developers to:

- Test endpoints
- Authorize JWT tokens
- Send request bodies
- View API responses

---

## 🌐 Live Deployment

The backend API is deployed on **Render**.

### Base URL

https://your-api-name.onrender.com

### Swagger Documentation

https://your-api-name.onrender.com/api-docs

---

## 🧪 Testing

All endpoints were tested using:

- Swagger UI

### Tested Flows

- User signup
- User login
- Donation creation
- Viewing available donations
- Claiming donations
- Marking donations as collected
- Full donation lifecycle

---

## 📁 Project Structure

```
donationBridge/
│
├── index.js
├── package.json
├── .env
│
└── src/
    ├── app.js
    │
    ├── config/
    │   └── database.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── donationController.js
    │
    ├── models/
    │   ├── User.js
    │   └── Donation.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── donationRoutes.js
    │
    └── middleware/
        ├── authMiddleware.js
        ├── roleMiddleware.js
        └── errorMiddleware.js
```

---

## 🛡️ Security Features

- Password hashing using **bcrypt**
- JWT authentication
- Role-based route protection
- Rate limiting
- Environment variables for sensitive credentials

---

## ⚙️ Local Setup

### Clone the repository

```
git clone https://github.com/your-username/donation-bridge.git
```

### Install dependencies

```
npm install
```

### Create `.env` file

```
PORT=5000
DATABASE_URL=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Run the server

```
npm run dev
```

---

## 📌 Project Status

**Backend:** Completed  
**Frontend:** Planned (React)

---

## 👤 Author

**Rishabh Vyas**

Backend Developer  
Node.js • Express • MongoDB

---

## 💡 Final Note

This project focuses on **correct backend architecture and real-world workflow modeling**, demonstrating:

- Authentication
- Authorization
- REST API design
- Secure backend development
- Business logic enforcement

The goal was to design a **structured backend system rather than a simple CRUD application**.




## 🚧 Future Improvements

- Add unit and integration testing using **Jest + Supertest**
- Implement **Redis caching** for frequently accessed data
- Add **background job queue** for pickup reminders
- Build a **React frontend dashboard**
- Dockerize the application for easier deployment