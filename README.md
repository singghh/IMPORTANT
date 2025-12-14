# 🍬 Sweet Shop Management System

A full-stack web application to manage and explore sweets with **user authentication**, **admin management**, **search & filtering**, and **secure role-based access control**.

---

## 🚀 Live Demo

- **Frontend**: (Vercel URL here)  
- **Backend API**: (Render URL here)

---

## 📌 Features Overview

### 👤 User Features
- User Registration & Login  
- JWT-based authentication  
- Browse sweets  
- Search sweets by name & category  
- Filter by price range  
- Sort by price (ascending / descending)  
- Pagination  
- Purchase sweets (stock reduces automatically)

---

### 🛠 Admin Features
- Admin login  
- Add new sweets  
- Update existing sweets  
- Delete sweets  
- Search & filter sweets  
- Secure admin-only access  
- Logout functionality  

---

## 🔐 Authentication & Authorization

- Uses **JWT (JSON Web Tokens)** for authentication  
- Token stored securely in `localStorage`  
- Protected routes implemented on frontend  
- Role-based access control:
  - **USER** → Dashboard only  
  - **ADMIN** → Dashboard + Admin Panel  
- Backend enforces security using middleware  

---

## 🧱 Tech Stack

### Frontend
- React + Vite  
- React Router DOM  
- Axios  
- CSS (custom styling)

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT  
- bcryptjs  

### Deployment
- Frontend → **Vercel**  
- Backend → **Render**  
- Database → **MongoDB Atlas**

---

## 📁 Project Structure


---

## 🔗 API Endpoints

### 🔑 Authentication
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |

---

### 🍭 Sweets (User)
| Method | Endpoint | Description |
|------|--------|------------|
| GET | `/api/sweets` | Get all sweets |
| GET | `/api/sweets/search` | Search, filter, sort, paginate |
| POST | `/api/sweets/:id/purchase` | Purchase sweet |

---

### 🛠 Sweets (Admin Only)
| Method | Endpoint | Description |
|------|--------|------------|
| POST | `/api/sweets` | Add sweet |
| PUT | `/api/sweets/:id` | Update sweet |
| DELETE | `/api/sweets/:id` | Delete sweet |

---

## 🔍 Search API Example

GET /api/sweets/search?
name=ladoo&
category=Indian&
minPrice=50&
maxPrice=300&
sort=price_asc&
page=1&
limit=5


---

## 🧠 How It Works (Flow)

1. User registers or logs in  
2. Backend returns JWT token  
3. Token stored in `localStorage`  
4. Frontend route guards check:
   - Logged-in status  
   - User role  
5. Backend middleware validates token for every request  
6. Admin routes are fully protected on both frontend & backend  

---

## 🚧 Challenges Faced & Solutions

### 1️⃣ Route Protection Issues
- **Problem**: Users could manually access `/admin`  
- **Solution**: Implemented `AdminRoute` & `ProtectedRoute` components  

### 2️⃣ Pagination + Sorting Bugs
- **Problem**: `.map is not a function` error  
- **Cause**: Backend response changed to include metadata  
- **Solution**: Updated frontend to consume `res.data.data`  

### 3️⃣ Token Not Found in Frontend
- **Problem**: `localStorage.getItem("token")` returned null  
- **Solution**: Ensured login stores token properly and Axios sends it via headers  

### 4️⃣ Admin Actions Failing (401 / 403)
- **Problem**: Missing Authorization header  
- **Solution**: Axios interceptor added to attach JWT automatically  

---

## 🧪 How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```
### Create .env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key

### Frontend
cd frontend
npm install
npm run dev

## 🔒 Security Highlights

JWT verification middleware
Role-based authorization
Admin APIs protected on backend
Token cleared on logout
Invalid token handling

## 📈 Future Improvements

Token refresh mechanism
Auth context for global state
Infinite scroll
Better error handling UI
Unit tests

## 🔑 Admin Credentials

Admin Email: varun@test.com
Password: 123456
