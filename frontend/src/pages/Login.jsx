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
    <div className="min-h-screen flex items-center justify-center p-6 bg-paper relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg glass-morphism p-12 rounded-[3.5rem] shadow-2xl border border-wood/10 relative z-10 !bg-white/80"
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-10 group">
          <BookOpen className="w-10 h-10 text-forest group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-black tracking-tighter text-wood uppercase">Study room booking</span>
        </Link>

        <div className="text-center mb-10 space-y-2">
          <h2 className="text-4xl font-black text-wood tracking-tight uppercase italic">Welcome Back</h2>
          <p className="text-wood/40 font-bold tracking-tight">Enter your credentials to enter the library.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-700 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.3em] px-1">Institutional Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/20 group-focus-within:text-forest transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-forest/10 text-lg py-4 !bg-white"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.3em]">Security Password</label>
              <Link to="#" className="text-[10px] font-black text-forest hover:underline uppercase tracking-widest">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/20 group-focus-within:text-forest transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-forest/10 text-lg py-4 !bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full glass-button !py-5 text-lg font-black uppercase tracking-[0.3em] shadow-xl hover:shadow-forest/20 flex items-center justify-center gap-4 transition-all"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-paper/20 border-t-paper rounded-full animate-spin" />
            ) : (
              <>
                <span>Enter Library</span>
                <LogIn size={24} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-wood/5 text-center flex flex-col items-center gap-4">
          <p className="text-wood/30 text-[10px] font-black uppercase tracking-widest">New to the network?</p>
          <Link to="/register" className="flex items-center gap-2 text-forest font-black uppercase tracking-[0.2em] text-xs hover:text-wood transition-colors group">
            <UserPlus size={18} />
            <span>Create Academic Account</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
