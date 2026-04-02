import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { BookingProvider } from './context/BookingContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoomBooking from './pages/RoomBooking';
import VirtualRoom from './pages/VirtualRoom';
import MyBookings from './pages/MyBookings';
import AdminRooms from './pages/AdminRooms';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  return children;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/room-booking" element={
          <ProtectedRoute>
            <RoomBooking />
          </ProtectedRoute>
        } />
        
        <Route path="/virtual-room" element={
          <ProtectedRoute>
            <VirtualRoom />
          </ProtectedRoute>
        } />
        
        <Route path="/my-bookings" element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        } />

        <Route path="/admin/rooms" element={
          <ProtectedRoute>
            <AdminRooms />
          </ProtectedRoute>
        } />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BookingProvider>
          <AppContent />
        </BookingProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
