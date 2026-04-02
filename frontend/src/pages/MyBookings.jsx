import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Calendar, Video, Clock, MapPin, Trash2, ExternalLink, ShieldCheck, AlertCircle } from 'lucide-react';

const MyBookings = () => {
  const { myBookings, fetchMyBookings, cancelBooking } = useBooking();

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await cancelBooking(id);
      } catch (err) {
        alert('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'cancelled': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
              <Calendar className="text-purple-400 w-12 h-12" />
              My <span className="text-purple-400">Bookings</span>
            </h1>
            <p className="text-indigo-200/50 font-medium text-lg italic">Manage your scheduled study sessions and physical room reservations.</p>
          </div>

          {myBookings.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {myBookings.map((booking, idx) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass-card p-8 flex flex-col md:flex-row gap-8 group border-white/5 hover:bg-white/10"
                >
                  {/* Left: Type Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border-2 shadow-2xl ${
                      booking.bookingType === 'virtual' ? 'bg-rose-500/20 border-rose-500/30 text-rose-400' : 'bg-indigo-500/20 border-indigo-500/30 text-indigo-400'
                    }`}>
                      {booking.bookingType === 'virtual' ? <Video size={40} /> : <MapPin size={40} />}
                    </div>
                  </div>

                  {/* Center: Details */}
                  <div className="flex-grow space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-black text-white tracking-tight">{booking.roomId?.name || 'Study Room'}</h3>
                        <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em]">{booking.bookingType} Session</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex items-center gap-3 text-indigo-100/70">
                        <Calendar size={18} className="text-indigo-400" />
                        <span className="text-sm font-bold">{new Date(booking.startTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-3 text-indigo-100/70">
                        <Clock size={18} className="text-indigo-400" />
                        <span className="text-sm font-bold">
                          {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {booking.bookingType === 'virtual' && booking.status === 'confirmed' && (
                      <a
                        href={booking.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-rose-400 hover:text-rose-300 font-black uppercase tracking-widest text-xs transition-all group"
                      >
                        <ExternalLink size={16} />
                        <span>Join Meeting Room</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex md:flex-col justify-end gap-3 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6">
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500/20 border border-rose-500/20 transition-all shadow-lg hover:shadow-rose-500/10 group"
                        title="Cancel Booking"
                      >
                        <Trash2 size={24} className="group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    <div className="p-4 bg-white/5 text-indigo-100/30 rounded-2xl border border-white/10">
                      <ShieldCheck size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-32 text-center flex flex-col items-center gap-8 border-white/5 opacity-40">
              <div className="p-10 bg-white/5 rounded-full border border-white/10 shadow-2xl">
                <AlertCircle size={80} className="text-indigo-400/50" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black text-white tracking-tighter uppercase">No Bookings Found</h3>
                <p className="text-indigo-100/40 font-medium text-lg max-w-sm mx-auto">You haven't made any reservations yet. Start by booking a physical room or creating a virtual session.</p>
              </div>
              <div className="flex gap-6">
                <button className="text-indigo-400 font-black uppercase tracking-widest text-sm hover:underline hover:scale-105 transition-all">Go to Rooms</button>
                <button className="text-rose-400 font-black uppercase tracking-widest text-sm hover:underline hover:scale-105 transition-all">Start Virtual Session</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
