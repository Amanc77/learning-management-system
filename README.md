# Learning Management System (LMS)

This is a full-stack Learning Management System project where users can register, log in, and manage courses.
The project is built using React.js (frontend) and Node.js + Express.js + MongoDB (backend).

Currently, the frontend and user authentication modules are completed.

## Features (Completed so far)

- User Authentication with JWT and bcrypt
- Frontend UI with React.js and Tailwind CSS
- Backend APIs with Node.js, Express.js, and MongoDB
- CORS handling for secure client-server communication
- Form handling and state management in React

## Tech Stack

Frontend:

- React.js
- Tailwind CSS
- Axios

Backend:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt

## Setup Instructions

1. Clone the Repository
   git clone https://github.com/Amanc77/learning-management-system.git
   cd learning-management-system

2. Install Dependencies
   Backend:
   cd server
   npm install

   Frontend:
   cd ../client
   npm install

3. Configure Environment Variables
   Create a .env file inside the server folder with the following values:

   PORT=5000
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173

4. Run the Project
   Backend:
   cd server
   npm run dev

   Frontend:
   cd client
   npm run dev

## Current Status

- Frontend completed
- User authentication completed
- Upcoming: Course management, instructor dashboard, and student progress tracking.

## GitHub Repository

https://github.com/Amanc77/learning-management-system

## Contributing

Feel free to fork this repo and make improvements. Pull requests are welcome.
