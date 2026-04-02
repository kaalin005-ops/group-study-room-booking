import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, UserPlus, ArrowLeft, BookOpen, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg glass-morphism p-10 rounded-[3rem] shadow-2xl border border-white/20 relative z-10"
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-8 group">
          <BookOpen className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-black tracking-tighter text-white">StudyRooms</span>
        </Link>

        <div className="text-center mb-8 space-y-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-indigo-200/60 font-medium">Join the ultimate study network today.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-2xl text-sm font-bold flex items-center gap-3"
          >
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="text"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass-button !py-5 text-xl font-black uppercase tracking-[0.2em] shadow-xl hover:shadow-indigo-500/20 flex items-center justify-center gap-4 transition-all"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Register Now</span>
                <UserPlus size={24} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center flex flex-col items-center gap-4">
          <p className="text-indigo-100/50 font-medium">Already have an account?</p>
          <Link to="/login" className="flex items-center gap-2 text-white font-black uppercase tracking-widest hover:text-indigo-400 transition-colors group">
            <ArrowLeft size={20} className="text-indigo-400" />
            <span>Back to Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
