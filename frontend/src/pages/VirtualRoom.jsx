import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { useSocket } from '../context/SocketContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SessionCard from '../components/SessionCard';
import { Video, Users, Plus, X, Link as LinkIcon, Calendar, Clock, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

const VirtualRoom = () => {
  const { rooms, myBookings, fetchRooms, fetchMyBookings, createBooking } = useBooking();
  const { socket, activeUsers } = useSocket();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomName: 'Virtual Room',
    date: '',
    startTime: '',
    duration: 1,
    meetLink: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchMyBookings();
  }, []);

  const virtualSessions = myBookings.filter(b => b.bookingType === 'virtual' && b.status === 'confirmed');

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(start.getTime() + formData.duration * 60 * 60 * 1000);
    
    // Find virtual room ID
    const virtualRoom = rooms.find(r => r.name === 'Virtual Study Space');
    
    try {
      await createBooking({
        roomId: virtualRoom ? virtualRoom._id : "65f1234567890abcdef00001", 
        startTime: start,
        endTime: end,
        bookingType: 'virtual',
        meetLink: formData.meetLink
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
        fetchMyBookings();
      }, 2000);
    } catch (err) {
      alert('Failed to create virtual session. Please check details.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                <Video className="text-rose-400 w-12 h-12" />
                Virtual <span className="text-rose-400">Sessions</span>
              </h1>
              <p className="text-indigo-200/50 font-medium text-lg italic">Host and join study groups from anywhere in the world.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="glass-button !py-4 !px-8 flex items-center gap-3 text-lg font-black uppercase tracking-widest shadow-xl hover:shadow-indigo-500/20"
            >
              <Plus size={24} />
              <span>Create Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: Active Sessions List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Active Study Groups</h2>
                <div className="px-3 py-1 bg-rose-500/20 text-rose-300 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-500/30">
                  {virtualSessions.length} Live
                </div>
              </div>
              
              {virtualSessions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {virtualSessions.map((session, idx) => (
                    <motion.div
                      key={session._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <SessionCard session={session} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="glass-card p-24 text-center flex flex-col items-center gap-6 border-white/5 opacity-40">
                  <div className="p-8 bg-white/5 rounded-full border border-white/10">
                    <Video size={64} className="text-indigo-400/50" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">No active virtual rooms</h3>
                    <p className="text-indigo-100/40 font-medium max-w-sm">Be the first to start a virtual study group and invite your peers!</p>
                  </div>
                  <button onClick={() => setIsModalOpen(true)} className="text-indigo-400 text-sm font-black uppercase tracking-widest hover:text-indigo-300">Create New Session +</button>
                </div>
              )}
            </div>

            {/* Right: Active Users Panel */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Users className="text-indigo-400" />
                Active Peers
              </h2>
              <div className="glass-morphism rounded-[2rem] p-8 border-white/5 h-[600px] flex flex-col">
                <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                  {activeUsers.length > 0 ? (
                    activeUsers.map((u, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center justify-between p-4 glass-card border-white/5 group hover:bg-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-black text-white text-xl shadow-lg border border-white/20">
                            {u.name[0]}
                          </div>
                          <div>
                            <p className="text-white font-bold tracking-tight">{u.name}</p>
                            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{u.role}</p>
                          </div>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                      </motion.div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-30">
                      <Users size={48} className="text-white" />
                      <p className="text-indigo-100/60 font-medium italic">No other users online</p>
                    </div>
                  )}
                </div>
                <div className="mt-auto pt-8 border-t border-white/10 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100/30">Real-time status updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Virtual Session Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-2xl glass-morphism p-10 rounded-[3rem] shadow-2xl border border-white/30"
            >
              {isSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border-2 border-emerald-500/30">
                    <CheckCircle className="w-14 h-14 text-emerald-400" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-4xl font-black text-white tracking-tighter">Session Ready!</h3>
                    <p className="text-indigo-200/70 text-lg font-medium">Redirecting you to the dashboard...</p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <X size={24} />
                  </button>

                  <div className="mb-10 flex items-center gap-6">
                    <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center border border-rose-500/30 text-rose-400 shadow-lg">
                      <Video size={32} />
                    </div>
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tighter">Start Study Session</h2>
                      <p className="text-indigo-200/50 font-medium italic text-lg">Create a virtual room for your team.</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreateSession} className="space-y-8">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                          <Calendar size={14} className="text-indigo-400" /> Session Date
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full glass-input focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                          <Clock size={14} className="text-indigo-400" /> Start Time
                        </label>
                        <input
                          type="time"
                          required
                          className="w-full glass-input focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Meeting Link (Google Meet / Zoom)</label>
                      <div className="relative group">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input
                          type="url"
                          placeholder="https://meet.google.com/abc-defg-hij"
                          required
                          className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/20 text-lg py-4"
                          value={formData.meetLink}
                          onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Session Duration</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((h) => (
                          <button
                            key={h}
                            type="button"
                            onClick={() => setFormData({ ...formData, duration: h })}
                            className={`py-5 rounded-2xl border-2 transition-all font-black text-lg ${
                              formData.duration === h
                                ? 'bg-indigo-500/40 border-indigo-400 text-white shadow-xl scale-[1.02]'
                                : 'bg-white/5 border-white/10 text-indigo-100/50 hover:bg-white/10 hover:border-white/20'
                            }`}
                          >
                            {h} Hour{h > 1 ? 's' : ''}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button type="submit" className="w-full glass-button !py-6 text-xl font-black uppercase tracking-[0.3em] shadow-2xl hover:shadow-indigo-500/30 flex items-center justify-center gap-4 transition-all">
                      <span>Launch Session</span>
                      <ArrowRight size={24} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VirtualRoom;
