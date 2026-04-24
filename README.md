# 🎬 Movie App (Full Stack)

A full-stack movie web application built with **Node.js, Express, MongoDB, and JWT authentication**, integrated with the **OMDb API** for dynamic movie search and favorites management.

---

## 🚀 Features

- 🔐 User Authentication (Signup/Login) using JWT
- 🎥 Search movies using OMDb API
- ⭐ Add / Remove favorite movies
- 👤 User-specific favorites stored in MongoDB
- 📱 Responsive UI for all devices
- ⚡ Fast and dynamic API-based movie fetching

---

## 🛠️ Tech Stack

**Frontend:**
- HTML
- CSS
- JavaScript (or React if used)

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB (Mongoose)

**Authentication:**
- JSON Web Token (JWT)
- bcrypt.js for password hashing

**API:**
- OMDb API

---

## 📂 Project Structure
MovieApp/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/PRASHANSHA-NIGAM/MovieApp.git
cd MovieApp

### 2. Install backend dependencies
cd backend
npm install

### 3. Setup environment variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
OMDB_API_KEY=your_omdb_api_key

4. Run the server
npm start
