# Learning Management System (LMS)

This is a full-stack Learning Management System project where users can register, log in, manage profiles, and instructors can create and manage courses and lectures.  
The project is built using **React.js (frontend)** and **Node.js + Express.js + MongoDB (backend)**.  

The project is live here:-  ⚙️ [https://lms-ak.onrender.com](https://lms-ak.onrender.com)  


<img width="3062" height="1330" alt="image" src="https://github.com/user-attachments/assets/05615e65-6289-4296-a055-8baa72eafa8a" />


---

## Features 

- User Authentication with **JWT** and **bcrypt**
- Frontend UI with **React.js** and **Tailwind CSS**
- Backend APIs with **Node.js, Express.js, and MongoDB**
- Secure **CORS** handling for client-server communication
- Form handling and state management in React
- User Profile Management (update name, description, and profile photo)
- Instructor Features:
  - Create, edit, and manage courses
  - Create and edit lectures
  - Publish and unpublish courses/lectures
- Media upload support using **Cloudinary**
- Cookie-based authentication for cross-domain access

---

## Tech Stack

**Frontend:**
- React.js  
- Tailwind CSS  
- Axios  

**Backend:**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- bcrypt  
- Cloudinary  

---

## Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/Amanc77/learning-management-system.git
cd learning-management-system
```

### 2. Install Dependencies

**Backend**
```
cd server
npm install
```

**Frontend**
```
cd ../client
npm install
```

### 3. Configure Environment Variables  

Create a `.env` file inside the **server** folder with the following values:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 4. Run the Project

**Backend**
```
cd server
npm run dev
```

**Frontend**
```
cd client
npm run dev
```

---

## Current Status
- ✅ Frontend completed  
- ✅ User authentication completed  
- ✅ Profile management completed  
- ✅ Instructor course & lecture management completed  
- ✅ Publish/unpublish functionality implemented  

### Upcoming Features
- Student dashboard and course progress tracking  
- Advanced analytics for instructors  
- 
---

## GitHub Repository
[https://github.com/Amanc77/learning-management-system](https://github.com/Amanc77/learning-management-system)

---

## Contributing
Feel free to fork this repo and make improvements. Pull requests are welcome!
```

This file is ready to paste into GitHub as your `README.md` with only the **Render backend live link**.
