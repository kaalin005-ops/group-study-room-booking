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
    <div className="min-h-screen flex items-center justify-center p-6 bg-paper relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-0">
        <div className="absolute -top-32 -right-32 w-[30rem] h-[30rem] bg-forest/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[30rem] h-[30rem] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg glass-morphism p-12 rounded-[3.5rem] shadow-2xl border border-wood/10 relative z-10 !bg-white/80"
      >
        <Link to="/" className="flex items-center gap-3 justify-center mb-8 group">
          <BookOpen className="w-10 h-10 text-forest group-hover:scale-110 transition-transform" />
          <span className="text-3xl font-black tracking-tighter text-wood uppercase">Study room booking</span>
        </Link>

        <div className="text-center mb-8 space-y-2">
          <h2 className="text-4xl font-black text-wood tracking-tight uppercase italic leading-none">Create Account</h2>
          <p className="text-wood/40 font-bold tracking-tight">Join the network of modern scholars.</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-700 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3"
          >
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.3em] px-1">Full Academic Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/20 group-focus-within:text-forest transition-colors" size={20} />
              <input
                type="text"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-forest/10 text-lg py-4 !bg-white"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.3em] px-1">Institutional Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/20 group-focus-within:text-forest transition-colors" size={20} />
              <input
                type="email"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-forest/10 text-lg py-4 !bg-white"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.3em] px-1">Security Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/20 group-focus-within:text-forest transition-colors" size={20} />
              <input
                type="password"
                required
                className="w-full glass-input pl-12 focus:ring-4 focus:ring-forest/10 text-lg py-4 !bg-white"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                <span>Register Now</span>
                <UserPlus size={24} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-wood/5 text-center flex flex-col items-center gap-4">
          <p className="text-wood/30 text-[10px] font-black uppercase tracking-widest">Already a member?</p>
          <Link to="/login" className="flex items-center gap-2 text-forest font-black uppercase tracking-[0.2em] text-xs hover:text-wood transition-colors group">
            <ArrowLeft size={18} />
            <span>Return to Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
