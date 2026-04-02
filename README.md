# Group Study Room Booking System

A complete production-ready MERN stack project for university students to book physical study rooms or create virtual study sessions in real-time.

## Features
- **Authentication**: JWT & bcryptjs protected registration and login.
- **Room Booking**: Physical room reservation with real-time availability.
- **Virtual Sessions**: Create study groups with Google Meet integration.
- **Real-time Updates**: Powered by Socket.io for instant dashboard updates.
- **Modern UI**: Glassmorphism design using Tailwind CSS and Framer Motion.

## Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Axios, Lucide-React
- **Database**: Mongoose (MongoDB)

## Project Structure
- `backend/`: Express server, MongoDB models, Socket.io handlers.
- `frontend/`: React application with Vite, Context API for state management.

## Installation & Run Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running on `localhost:27017`

### Backend
1. Open a terminal and navigate to the backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
2. The server will run on `http://localhost:5000`.
3. Initial room data will be seeded automatically on first run.

### Frontend
1. Open another terminal and navigate to the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
2. The application will be available at `http://localhost:5173`.

## Default Admin Credentials
You can register an account and change the role to `admin` in MongoDB if you want to access the Admin Management page.

## Real-Time Socket Events
- `roomBooked`: Notifies all clients when a room is reserved.
- `roomUpdated`: Triggers a refresh of the rooms list.
- `activeUsers`: Updates the list of online peers in the virtual room.
