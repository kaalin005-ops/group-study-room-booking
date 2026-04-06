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
            className="relative w-full max-w-lg glass-morphism p-10 rounded-[3rem] overflow-hidden shadow-2xl border border-wood/10 !bg-white"
          >
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <div className="w-24 h-24 bg-forest/10 rounded-full flex items-center justify-center border border-forest/20">
                  <CheckCircle className="w-14 h-14 text-forest" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-3xl font-black text-wood uppercase italic">Spot Reserved</h3>
                  <p className="text-wood/40 font-bold">Your academic session is scheduled.</p>
                </div>
              </motion.div>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 text-wood/20 hover:text-wood transition-colors p-2 hover:bg-wood/5 rounded-full"
                >
                  <X size={20} />
                </button>

                <div className="mb-8">
                  <h2 className="text-4xl font-black text-wood tracking-tighter uppercase italic leading-none">
                    Book {room?.name}
                  </h2>
                  <p className="text-wood/40 font-bold mt-2">
                    Select your preferred study parameters.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Calendar size={12} className="text-forest" /> Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full glass-input focus:ring-4 focus:ring-forest/10 !bg-paper"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                        <Clock size={12} className="text-forest" /> Start
                      </label>
                      <input
                        type="time"
                        required
                        className="w-full glass-input focus:ring-4 focus:ring-forest/10 !bg-paper"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-wood/40 uppercase tracking-[0.2em] px-1">Session Duration</label>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((h) => (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setFormData({ ...formData, duration: h })}
                          className={`flex-1 py-4 rounded-2xl border-2 transition-all font-black text-xs ${
                            formData.duration === h
                              ? 'bg-forest border-forest text-white shadow-lg scale-[1.02]'
                              : 'bg-paper border-wood/5 text-wood/40 hover:border-wood/20'
                          }`}
                        >
                          {h} HR{h > 1 ? 'S' : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="w-full glass-button !py-5 text-lg font-black uppercase tracking-[0.3em] shadow-xl hover:shadow-forest/30 mt-4 transition-all">
                    Confirm Reservation
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
