# 📌 Backend Intern Assessment
## User Management System (Full Stack – Production Ready)

## 📄 Project Overview
A full-stack User Management System built strictly according to the Backend Intern Assessment PDF.
The application includes secure authentication, role-based access control (RBAC), user profile management,
admin-level user management, pagination, testing, CI/CD, Docker, and production deployment.

---

## 🏗️ Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- Jest & Supertest

### Frontend
- React (Vite)
- React Router v6
- Axios
- Context API

### DevOps & Deployment
- Docker & Docker Compose
- GitHub Actions (CI)
- Render (Backend)
- Netlify (Frontend)

---

## 📁 Folder Structure

```
purplemerit-backend-intern-assessment
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── tests
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   ├── netlify.toml
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## ⚙️ Installation & Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account
- Docker (optional)

---

## 📥 Clone Repository

```bash
git clone https://github.com/thvvamshi/purplemerit-backend-intern-assessment.git
cd purplemerit-backend-intern-assessment
```

---

## 🔧 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend will run at:
```
http://localhost:5000/api
```

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

---

## 🐳 Docker Setup (Optional)

```bash
docker compose up --build
```

---

## 🔐 API Endpoints (Sample)

| Method | Endpoint | Description |
|------|--------|------------|
| POST | /api/auth/signup | Signup |
| POST | /api/auth/login | Login |
| GET | /api/users/me | Get Profile |
| PATCH | /api/users/me | Update Profile |
| GET | /api/users | Admin: List Users |

---

## 🌍 Live Deployment URLs

- Frontend (Netlify):  
  https://golden-puffpuff-3dd44f.netlify.app

- Backend API (Render):  
  https://purplemerit-backend-intern-assessment.onrender.com/api

- Health Check:  
  https://purplemerit-backend-intern-assessment.onrender.com/healthz

---

## ✅ PDF Compliance Checklist

| Requirement | Status |
|------------|--------|
| Authentication | ✅ |
| JWT + bcrypt | ✅ |
| RBAC | ✅ |
| Admin user management | ✅ |
| Pagination | ✅ |
| Profile management | ✅ |
| Password validation | ✅ |
| Backend tests | ✅ |
| CI/CD | ✅ |
| Docker | ✅ |
| Deployment | ✅ |
| Documentation | ✅ |

---

## 🏁 Final Verdict

✔ 100% PDF compliant  
✔ Production ready  
✔ Fully tested and deployed  
✔ Safe to submit  

---

**Author:**  
Boda Vamshi Kumar  
Backend Developer Intern Candidate
