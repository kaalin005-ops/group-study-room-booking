import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-morphism rounded-2xl px-8 py-3 !bg-white/90 border-wood/10 shadow-lg">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="w-8 h-8 text-forest" />
          <span className="text-xl font-bold tracking-tight text-wood">
            Study room booking
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <div className="flex items-center space-x-3 text-wood font-semibold">
                <User className="w-5 h-5 text-forest" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 glass-button !py-2 !px-4 text-sm shadow-none hover:shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-wood font-bold hover:text-forest transition-colors">Login</Link>
              <Link to="/register" className="glass-button !py-2 !px-6 text-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
