🏎️ Car Vault
A Full-Stack MEAN Application for Seamless Car Inventory Management.
Car Vault is a robust, secure web application designed to help users manage car listings. It features a complete authentication system, 
secure API routes, and a dynamic frontend that allows users to create, view, update, and delete car records.

Live Demo
Frontend: https://car-vault-app.vercel.app/
Backend API: https://car-vault-app.onrender.com

🛠️ Tech Stack
Frontend: Angular (Signals, Reactive Forms, Standalone Components)
Backend: Node.js & Express.js
Database: MongoDB Atlas (Cloud)
Authentication: JSON Web Tokens (JWT) & Bcryptjs
Deployment: Vercel (Frontend) & Render (Backend)

✨ Key Features
Secure Authentication: User registration and login with encrypted passwords and JWT-based session management.
Role-Based Access: Protected routes ensuring only authenticated users can manage car data.
Advanced Filtering: Search and filter functionality by car company, model, year, and price.
Responsive Design: Fully mobile-responsive UI built with Angular and custom CSS.
Cloud Integration: Real-time data persistence using MongoDB Atlas.

###PROJECT STRUCTURE###
Car-Vault-App/
├── backend/
│   ├── controllers/    # Business logic (Auth, Cars)
│   ├── models/         # Mongoose Schemas (User, Car)
│   ├── routes/         # API Endpoint definitions
│   └── server.js       # Entry point & DB Connection
└── frontend/
    └── src/app/
        ├── components/ # Angular Components (Create, View, Auth)
        └── services/   # API Communication Logic


1. Clone the Repository
git clone https://github.com/your-username/car-vault-app.git
cd car-vault-app  

2. Backend Setup
cd backend
npm install
Create a .env file in the backend folder:
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=jwtSecret
Start the server:
node server.js

3. Frontend Setup
cd frontend
npm install
ng serve
Navigate to http://localhost:4200


Security Implementation
Password Hashing: Uses bcryptjs for one-way salting and hashing.
JWT Protection: Custom middleware verifies the Authorization: Bearer <token> header on all sensitive routes.
CORS Configuration: Strictly managed to allow communication between specific Vercel and Render domains.
Environment Safety: All sensitive credentials (DB URI, Secrets) are managed via Render Environment Variables.


👤 Author
Your Name
LinkedIn: www.linkedin.com/in/soham-patil-28854a314
GitHub: https://github.com/patilsohamcs2425
