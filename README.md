# 📌 Backend Intern Assessment – Mini User Management System  
**Purple Merit Technologies**

---

## 📖 Project Overview

This project is a **Mini User Management System** developed as part of the **Backend Intern Assessment** at **Purple Merit Technologies**.

The system demonstrates:
- Secure authentication
- Role-based access control (RBAC)
- Admin-level user management
- Frontend integration with protected routes
- Docker & CI/CD readiness

All features are implemented **strictly as per the assessment PDF**.

---

## 🎯 Objectives (As per PDF)

- Implement secure authentication using JWT
- Apply role-based access (User / Admin)
- Enable admin user management with pagination
- Build frontend with protected routes
- Ensure production readiness
- Implement Docker & CI/CD (Bonus)
- Provide complete documentation

---

## 🧩 Features

### 🔐 Authentication
- User signup & login
- JWT-based authentication (1 day expiry)
- Password hashing using bcrypt
- Email uniqueness validation
- Login blocked for inactive users
- Logout support

### 👤 User Features
- View profile
- Update full name & email
- Change password (separate page)
- Cancel profile edits
- Persistent login on refresh

### 🛠️ Admin Features
- View all users
- Pagination (10 users/page)
- Activate / deactivate users
- Confirmation dialogs
- Admin cannot deactivate own account

### 🎨 Frontend UI
- Login & Signup pages
- Profile page
- Admin dashboard
- Protected routes
- Toast notifications
- Loading spinners
- Responsive layout

---

## 🏗️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt

### Frontend
- React (Vite)
- React Router v6
- Context API
- Inline CSS
- react-hot-toast

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

---

## 📂 Complete Project Folder Structure (PDF-Compliant)

```
PurpleMerit/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── role.js
│   │   │
│   │   ├── models/
│   │   │   └── User.js
│   │   │
│   │   ├── utils/
│   │   │   └── passwordValidator.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── auth.test.js
│   │
│   ├── Dockerfile
│   ├── .env.example
│   ├── .dockerignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── auth/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AccessDenied.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── package-lock.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── README.md
└── .gitignore
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```

> `.env` files are excluded from version control.

---

## ⚙️ Running the Project Locally

### Backend
```
cd backend
npm install
npm run dev
```

Backend URL:
```
http://localhost:5000
```

### Frontend
```
cd frontend
npm install
npm run dev
```

Frontend URL:
```
http://localhost:5173
```

---

## 🐳 Docker Setup (Bonus)

```
docker compose up --build
```

Frontend → http://localhost:3000  
Backend → http://localhost:5000

---

## ⚙️ CI/CD Pipeline

- Implemented using GitHub Actions
- Runs on push & pull request to `main`
- Installs dependencies
- Runs backend tests
- Builds frontend

Workflow:
```
.github/workflows/ci.yml
```

---

## 🔑 API Endpoints

### Authentication
- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`

### User
- GET `/users/me`
- PATCH `/users/me`
- PATCH `/users/me/password`

### Admin
- GET `/users?page=1`
- PATCH `/users/:id/status`

---

## 🎥 Walkthrough Video (Required)

```
https://your-video-link-here
```

---

## 📋 PDF Compliance Checklist

| Requirement | Status |
|-----------|--------|
| Authentication | ✅ |
| JWT & bcrypt | ✅ |
| Role-based access | ✅ |
| Admin user management | ✅ |
| Pagination | ✅ |
| Separate password page | ✅ |
| Frontend UI | ✅ |
| Docker | ✅ |
| CI/CD | ✅ |
| Folder structure | ✅ |
| Documentation | ✅ |

---

## 👤 Author

**Boda Vamshi Kumar**  
Backend Intern Assessment  
Purple Merit Technologies

---

## ✅ Final Status

**100% PDF-Compliant – Production Ready – Ready for Submission**
