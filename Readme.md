# 🎓 Student Records App (Full-Stack)

A web application for managing student information and marks, built with **Node.js, Express, PostgreSQL, and jQuery (DataTables.net)**.  
![image](https://github.com/user-attachments/assets/705cc219-6d3a-4c10-801d-d4825dbf2a5f)

![image](https://github.com/user-attachments/assets/e7637026-fc43-4375-939e-139ac2c1f379)

## 🚀 Live Demo
- **Frontend**: [https://student-records-app-frontend.vercel.app](https://student-records-app-frontend.vercel.app)  
- **Backend API**: [https://student-records-app-backend.vercel.app](https://student-records-app-backend.vercel.app)  
- **Frontend Github**: [https://github.com/satyamjaysawal/Student-Records-App-Frontend.git](https://github.com/satyamjaysawal/Student-Records-App-Frontend.git)
- **Backend Github**: [https://github.com/satyamjaysawal/Student-Records-App-Backend.git](https://github.com/satyamjaysawal/Student-Records-App-Backend.git)


---

## 📌 Features
### 🎯 **Frontend (HTML, CSS, JavaScript, jQuery)**
- **User Authentication** (Login/Register) using JWT  
- **Student Management** (Add, Edit, Delete Students)  
- **Marks Management** (CRUD operations for subjects & marks)  
- **DataTables.net Integration** (Search, Pagination, Filtering)  

### 🛠 **Backend (Node.js, Express, PostgreSQL)**
- **JWT Authentication** for Secure Login  
- **REST API** for Students & Marks (CRUD Operations)  
- **PostgreSQL Database** with Proper Relations  
- **Middleware** for Authentication & Error Handling  

---

## 🏠 **Project Structure**
```
student-records-app/
├── frontend/
│   ├── index.html           # Student management page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── studentsandmarks.html # Marks management page
│   ├── js/
│   │   ├── config.js        # Backend API URL
│   │   ├── auth.js          # Authentication logic
│   │   ├── students.js      # Student logic
│   │   └── marks.js         # Marks logic
│   └── assets/              # CSS & Images
│
├── backend/
│   ├── server.js           # Main Express app
│   ├── routes/
│   │   ├── authRoutes.js    # Authentication Routes
│   │   ├── studentRoutes.js # Students & Marks Routes
│   ├── controllers/
│   │   ├── authController.js # Login/Register Logic
│   │   ├── studentController.js # Student & Marks Logic
│   ├── models/
│   │   └── db.js            # PostgreSQL Database Config
│   ├── middleware/
│   │   └── authMiddleware.js # JWT Middleware
│   ├── .env                 # Environment Variables
│   ├── package.json         # Dependencies
│   └── README.md            # This file
```

---

## ⚙️ **Installation Guide**
### 1️⃣ **Clone the Repositories**
```bash
# Clone Frontend
git clone https://github.com/satyamjaysawal/Student-Records-App-Frontend.git
cd student-records-app-frontend

# Clone Backend
git clone https://github.com/satyamjaysawal/Student-Records-App-Backend.git
cd student-records-app-backend
```

---

## 🖥 **Backend Setup**
### 2️⃣ **Install Dependencies**
```bash
cd student-records-app-backend
npm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env` file inside `backend/` and add:
```
DATABASE_URL=postgresql://your-db-url
JWT_SECRET=your-secret-key
FRONTEND_URL=https://student-records-app-frontend.vercel.app
BACKEND_API_BASE_URL=https://student-records-app-backend.vercel.app
```
👉 **DO NOT COMMIT `.env` TO GITHUB!**  

### 4️⃣ **Run Backend Server**
```bash
npm start
```
- API will run at `http://localhost:5000 || https://student-records-app-frontend.vercel.app/`  

---

## 🌐 **Frontend Setup**
### 5️⃣ **Run Frontend Locally**
```bash
cd student-records-app-frontend
npm install -g live-server
live-server
```
- The frontend will be available at `http://localhost:8080 || https://student-records-app-backend.vercel.app`

---

## 🔗 **API Endpoints**
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/auth/register` | Register a user |
| **POST** | `/api/auth/login` | Login and get JWT token |
| **GET** | `/api/students` | Fetch all students |
| **POST** | `/api/students` | Add a new student |
| **PUT** | `/api/students/:id` | Update student details |
| **DELETE** | `/api/students/:id` | Remove a student |
| **GET** | `/api/students/marks` | Fetch student marks |

---

## 🚀 **Deployment Guide**
### ✅ **Deploy Backend on Vercel**
1. Push the backend repo to GitHub
2. **Set Environment Variables** in **Vercel → Project Settings**
3. Run:
   ```bash
   vercel --prod
   ```
4. **Test API** at `https://student-records-app-backend.vercel.app/api/students`

### ✅ **Deploy Frontend on Vercel**
1. Push the frontend repo to GitHub
2. Run:
   ```bash
   vercel --prod
   ```
3. Visit `https://student-records-app-frontend.vercel.app`

---

## 🎭 **Technologies Used**
### 💻 **Frontend**
- **HTML, CSS, JavaScript (jQuery)**
- **Bootstrap 5** for styling
- **DataTables.net** for table management
- **AJAX** for dynamic data fetching

### ⚙️ **Backend**
- **Node.js + Express.js**
- **PostgreSQL (Neon/Supabase)**
- **JWT Authentication**
- **Vercel Serverless Deployment**

---

## 🤝 **Contributing**
1. **Fork** the repo  
2. **Create a branch** (`git checkout -b feature-name`)  
3. **Commit changes** (`git commit -m "Added new feature"`)  
4. **Push to branch** (`git push origin feature-name`)  
5. **Open a Pull Request**  

---

