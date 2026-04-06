import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Calendar, Video, Clock, MapPin, Trash2, ExternalLink, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

const MyBookings = () => {
  const { myBookings, fetchMyBookings, cancelBooking, loading: bookingLoading } = useBooking();

  useEffect(() => {
    console.log('MyBookings component mounted');
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
      case 'confirmed': return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20 shadow-sm';
      case 'cancelled': return 'bg-rose-500/10 text-rose-700 border-rose-500/20 shadow-sm';
      default: return 'bg-amber-500/10 text-amber-700 border-amber-500/20 shadow-sm';
    }
  };

  const getCardStyle = (type, index) => {
    const styles = [
      'border-forest/10 hover:border-forest/30',
      'border-wood/10 hover:border-wood/30',
      'border-gold/10 hover:border-gold/30',
    ];
    return styles[index % styles.length];
  };

  const getIconStyle = (type) => {
    return type === 'virtual' 
      ? 'text-rose-700 bg-rose-500/10 border-rose-500/20' 
      : 'text-forest bg-forest/10 border-forest/20';
  };

  if (bookingLoading && (!myBookings || myBookings.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-forest/10 border-t-forest rounded-full animate-spin" />
          <p className="text-forest font-black tracking-widest animate-pulse uppercase text-[10px]">Retrieving Schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-forest/5 rounded-3xl border border-forest/10 shadow-sm">
                <Calendar className="text-forest w-10 h-10" />
              </div>
              <div>
                <h1 className="text-6xl font-black text-wood tracking-tighter uppercase leading-none">
                  My <span className="text-forest">Schedule</span>
                </h1>
                <p className="text-wood/30 font-bold text-sm tracking-[0.2em] mt-2 uppercase">Your Academic Journey, Organized.</p>
              </div>
            </div>
          </motion.div>

          {Array.isArray(myBookings) && myBookings.length > 0 ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              {myBookings.map((booking, idx) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className={`glass-card p-10 flex flex-col md:flex-row gap-8 group border !bg-white transition-all duration-500 ${getCardStyle(booking.bookingType, idx)}`}
                >
                  {/* Left: Type Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center border transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 ${getIconStyle(booking.bookingType)}`}>
                      {booking.bookingType === 'virtual' ? <Video size={48} /> : <MapPin size={48} />}
                    </div>
                  </div>

                  {/* Center: Details */}
                  <div className="flex-grow space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-wood tracking-tighter group-hover:text-forest transition-colors">
                          {booking.roomId?.name || 'Study Space'}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${booking.bookingType === 'virtual' ? 'bg-rose-500' : 'bg-forest'}`} />
                          <p className="text-wood/40 font-black uppercase tracking-[0.3em] text-[10px]">
                            {booking.bookingType} Session
                          </p>
                        </div>
                      </div>
                      <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2 p-4 bg-paper rounded-3xl border border-wood/5 group-hover:border-wood/10 transition-colors">
                        <Calendar size={18} className="text-forest" />
                        <span className="text-sm font-black text-wood">{booking.startTime ? new Date(booking.startTime).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) : 'No Date'}</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 bg-paper rounded-3xl border border-wood/5 group-hover:border-wood/10 transition-colors">
                        <Clock size={18} className="text-forest" />
                        <span className="text-sm font-black text-wood">
                          {booking.startTime ? new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'No Time'}
                        </span>
                      </div>
                    </div>

                    {booking.bookingType === 'virtual' && booking.status === 'confirmed' && (
                      <motion.a
                        whileHover={{ x: 10 }}
                        href={booking.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-700 font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl transition-all group/link"
                      >
                        <ExternalLink size={16} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Join Meeting</span>
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </motion.a>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex md:flex-col justify-end gap-4 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-wood/5 md:pl-8">
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="p-5 bg-rose-500/5 text-rose-700 rounded-[1.5rem] hover:bg-rose-500/10 border border-rose-500/10 transition-all group/btn"
                        title="Cancel Booking"
                      >
                        <Trash2 size={28} className="group-hover/btn:scale-110 group-hover/btn:-rotate-12 transition-transform" />
                      </button>
                    )}
                    <div className="p-5 bg-wood/5 text-wood/30 rounded-[1.5rem] border border-wood/10 hover:text-forest transition-all group/info">
                      <ShieldCheck size={28} className="group-hover/info:scale-110 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-40 text-center flex flex-col items-center gap-10 border-wood/5 !bg-white shadow-xl"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-forest/5 blur-[60px] rounded-full" />
                <div className="relative p-12 bg-paper rounded-full border border-wood/10 shadow-inner">
                  <AlertCircle size={100} className="text-forest/40" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl font-black text-wood tracking-tighter uppercase italic">No Active Sessions</h3>
                <p className="text-wood/30 font-bold text-xl max-w-md mx-auto leading-relaxed">Your schedule is currently clear. Time to discover new study spaces!</p>
              </div>
              <div className="flex gap-8 pt-6">
                <button className="glass-button !py-5 !px-12 text-sm font-black uppercase tracking-[0.3em] shadow-xl hover:scale-105 transition-all active:scale-95">
                  Discover Rooms
                </button>
                <button className="bg-paper border border-wood/10 !py-5 !px-12 rounded-2xl text-sm font-black uppercase tracking-[0.3em] text-wood/50 hover:bg-white hover:text-wood transition-all active:scale-95">
                  New Session
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyBookings;
