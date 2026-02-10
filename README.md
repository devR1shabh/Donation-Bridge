

# 🍽️ Donation Bridge — Backend

A role-based food donation management backend where restaurants donate surplus food and NGOs claim and collect it, ensuring accountability through a well-defined donation lifecycle.

---

## 🚀 Overview

**Donation Bridge** is a backend system designed to solve a real-world coordination problem:  
matching food donors (restaurants) with food distributors (NGOs) in a controlled and reliable way.

The system focuses on **ownership, responsibility, and state transitions**, rather than just basic CRUD operations.

---

## 🎯 Key Features

### 🔐 Authentication & Authorization
- Secure user authentication using **JWT**
- Role-based access control:
  - Restaurant
  - NGO

### 🔄 Donation Lifecycle Management
Each donation follows a strict and validated lifecycle:

available → claimed → collected


- **available**: Donation is open and visible to NGOs  
- **claimed**: An NGO has taken responsibility for pickup  
- **collected**: Restaurant confirms physical handover and closes the donation  

### 🧠 Business Logic Enforcement
- Prevents multiple NGOs from claiming the same donation
- Ensures only the restaurant that created a donation can mark it as collected
- Filters expired donations using pickup deadlines
- Enforces valid state transitions at every step

---

## 🏗️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)

---

## 📦 Core API Endpoints

### 🔑 Authentication

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/auth/signup` | User registration |
| POST | `/auth/login` | User login & JWT generation |

---

### 🍽️ Donations (Restaurant)

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/donations/create` | Create a new donation |
| PATCH | `/donations/:id/collect` | Mark donation as collected |

---

### 🤝 Donations (NGO)

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/donations/available` | View available donations |
| POST | `/donations/:id/claim` | Claim a donation |

---

## 🔁 Complete Application Flow

1. User signs up and logs in (JWT issued)
2. Restaurant creates a donation
3. NGO views available donations
4. NGO claims a donation (takes responsibility)
5. Restaurant confirms collection and closes the lifecycle

This design mirrors real-world ownership and accountability.

---

## 🧠 Design Decisions (Why This Matters)

- **Claim ≠ Collect**
  - Claim assigns responsibility
  - Collect confirms physical handover

- **Restaurant closes the lifecycle**
  - The food owner is the source of truth

- **PATCH used for collection**
  - Partial update of resource state

- **State-based logic**
  - Prevents invalid or duplicate actions

---

## 📁 Project Structure

```bash
donationBridge/
│
├── index.js
├── .env
├── package.json
│
└── src/
    ├── app.js
    │
    ├── config/
    │   └── database.js
    │
    ├── models/
    │   ├── User.js
    │   └── Donation.js
    │
    ├── controllers/
    │   ├── authController.js
    │   └── donationController.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── donationRoutes.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── roleMiddleware.js
    │   └── errorMiddleware.js
    
        
```



---

## 🔒 Security Practices
- Password hashing
- JWT verification middleware
- Role-based route protection
- Environment variables hidden via `.gitignore`

---

## 🧪 Testing

All endpoints were tested end-to-end using **Postman**, covering:
- Authentication
- Role switching
- Valid and invalid state transitions
- Full donation lifecycle

---

## 🌱 Future Improvements
- React frontend (planned)
- Donation history dashboards
- Pagination & filters
- Deployment (Render / Railway / Vercel)

---

## 📌 Status
✅ Backend complete  
🟡 Frontend (React) coming next  

---

## 👤 Author

**Rishabh Vyas**  
Backend Developer | Node.js | Express | MongoDB  

---

## 💬 Final Note
This project focuses on **correct system design**, **clear responsibilities**, and **real-world workflow modeling** — not just basic CRUD APIs.
