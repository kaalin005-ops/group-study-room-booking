import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Video, Globe, CheckCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, room, onConfirm }) => {
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    duration: 1,
    bookingType: 'physical',
    meetLink: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(`${formData.date}T${formData.startTime}`);
    const end = new Date(start.getTime() + formData.duration * 60 * 60 * 1000);
    
    try {
      await onConfirm({
        roomId: room._id,
        startTime: start,
        endTime: end,
        bookingType: formData.bookingType,
        meetLink: formData.meetLink
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-morphism p-8 rounded-3xl overflow-hidden shadow-2xl border border-white/30"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-4"
              >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-indigo-200/70">Your study session has been scheduled.</p>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 text-indigo-200/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    Book {room?.name}
                  </h2>
                  <p className="text-indigo-200/60 mt-1">
                    Select your preferred time slot and session type.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-indigo-100 flex items-center gap-2">
                        <Calendar size={14} /> Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full glass-input focus:ring-2 focus:ring-indigo-500/50"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-indigo-100 flex items-center gap-2">
                        <Clock size={14} /> Start Time
                      </label>
                      <input
                        type="time"
                        required
                        className="w-full glass-input focus:ring-2 focus:ring-indigo-500/50"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-indigo-100">Duration (Hours)</label>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setFormData({ ...formData, duration: h })}
                          className={`flex-1 py-3 rounded-xl border transition-all ${
                            formData.duration === h
                              ? 'bg-indigo-500/40 border-indigo-400 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                          }`}
                        >
                          {h}h
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-indigo-100">Session Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, bookingType: 'physical' })}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          formData.bookingType === 'physical'
                            ? 'bg-indigo-500/40 border-indigo-400 text-white'
                            : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                        }`}
                      >
                        <Globe size={20} />
                        <span className="text-sm font-bold">Physical</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, bookingType: 'virtual' })}
                        className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                          formData.bookingType === 'virtual'
                            ? 'bg-indigo-500/40 border-indigo-400 text-white'
                            : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                        }`}
                      >
                        <Video size={20} />
                        <span className="text-sm font-bold">Virtual</span>
                      </button>
                    </div>
                  </div>

                  {formData.bookingType === 'virtual' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-semibold text-indigo-100">Meet Link</label>
                      <input
                        type="url"
                        placeholder="https://meet.google.com/..."
                        required
                        className="w-full glass-input focus:ring-2 focus:ring-indigo-500/50"
                        value={formData.meetLink}
                        onChange={(e) => setFormData({ ...formData, meetLink: e.target.value })}
                      />
                    </motion.div>
                  )}

                  <button type="submit" className="w-full glass-button !py-4 text-lg font-bold uppercase tracking-widest shadow-xl hover:shadow-indigo-500/20">
                    Confirm Booking
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
