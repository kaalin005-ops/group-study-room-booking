import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn, ArrowRight, UserPlus, BookOpen } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg glass-morphism p-10 rounded-[3rem] shadow-2xl border border-white/20 relative z-10"
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-10 group">
          <BookOpen className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-black tracking-tighter text-white">StudyRooms</span>
        </Link>

        <div className="text-center mb-10 space-y-2">
          <h2 className="text-4xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-indigo-200/60 font-medium">Please enter your details to login.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-500/20 border border-rose-500/30 text-rose-300 rounded-2xl text-sm font-bold flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest px-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-indigo-100 uppercase tracking-widest">Password</label>
              <Link to="#" className="text-xs font-bold text-indigo-400 hover:text-indigo-300">Forgot Password?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                <span>Login Now</span>
                <LogIn size={24} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/10 text-center flex flex-col items-center gap-4">
          <p className="text-indigo-100/50 font-medium">Don't have an account?</p>
          <Link to="/register" className="flex items-center gap-2 text-white font-black uppercase tracking-widest hover:text-indigo-400 transition-colors group">
            <UserPlus size={20} className="text-indigo-400" />
            <span>Create New Account</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
