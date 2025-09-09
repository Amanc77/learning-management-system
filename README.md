
# 🎓 Learning Management System (LMS)

> A fully-featured, full-stack **Learning Management System** where users can register, log in, purchase courses, track progress, and instructors can manage courses and lectures.  
> Built with ❤️ using **React.js**, **Node.js**, **Express.js**, and **MongoDB**.

🔗 Live Demo: [https://lms-ak.vercel.app/](https://lms-ak.vercel.app/)

---

## 🚀 Project Overview

This project enables:
- User Authentication (Students & Instructors)
- Course Purchase with **Razorpay Integration**
- Interactive Video Learning (Cloudinary & YouTube Support)
- Instructor Course & Lecture Management
- Real-time Course Progress Tracking
- Course Search & Filter Functionality
- Responsive UI for Desktop & Mobile

- 
[LMS-VideoDemo.webm](https://github.com/user-attachments/assets/2ffcfeaf-5e6c-49d3-99d3-f13eb036859b)

---

## Features

### 🎯 Student Side:
- Register & Login with **JWT** & **bcrypt**
- Purchase Paid Courses using **Razorpay**
- Update Profile (Name, Bio, Profile Picture)
- View Enrolled Courses & Track Progress
- Interactive Video Playback with progress auto-tracking
- Search and Filter Courses
- Responsive, Clean UI built with **Tailwind CSS**

---

### 👨‍🏫 Instructor Side:
- Create, Edit, Delete Courses & Lectures
- Publish/Unpublish Courses and Lectures
- Upload Media Files using **Cloudinary**
- Manage Students and Course Content

---

### ⚡ Global Features:
- Role-based Access Control
- Secure Cookie-based Authentication
- Secure CORS Configuration
- Error Handling & Loading Indicators
- Responsive UI across devices
- Razorpay Integration for Course Payments

---

## 🧱 Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Axios  

**Backend:**
- Node.js + Express.js  
- MongoDB + Mongoose  
- JWT & bcrypt  
- Razorpay Payment Gateway  
- Cloudinary for Media Uploads  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
git clone https://github.com/Amanc77/learning-management-system.git
cd learning-management-system

### 2️⃣ Install Dependencies

Backend
cd server
npm install

Frontend
cd ../client
npm install

### 3️⃣ Configure Environment Variables

Create a .env file in the server folder:

```env
# Server Configuration
PORT=5000
MONGO_URI=your_mongo_connection_string

# Authentication
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

### 4️⃣ Run the Project

Backend
cd server
npm run dev

Frontend
cd client
npm run dev

---


Please Give a  GitHub ⭐️ : [https://github.com/Amanc77/learning-management-system](https://github.com/Amanc77/learning-management-system)

---

## 🤝 Contributing

Contributions are welcome!  
Fork the repo ➔ Make your improvements ➔ Submit a Pull Request 🚀

---
