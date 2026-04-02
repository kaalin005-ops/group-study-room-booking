import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Wind, Users, CheckCircle, XCircle } from 'lucide-react';

const RoomCard = ({ room, onBook }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="glass-card p-6 flex flex-col justify-between group h-full"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
            {room.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            room.isAvailable ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
          }`}>
            {room.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.wifi && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-lg text-xs font-semibold border border-indigo-500/20">
              <Wifi size={14} /> WiFi
            </span>
          )}
          {room.ac && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-lg text-xs font-semibold border border-cyan-500/20">
              <Wind size={14} /> AC
            </span>
          )}
          <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-200 rounded-lg text-xs font-semibold border border-purple-500/20">
            <Users size={14} /> {room.capacity}
          </span>
        </div>

        <p className="text-indigo-100/60 text-sm leading-relaxed">
          {room.type} room designed for collaborative group study sessions.
        </p>
      </div>

      <button
        onClick={() => onBook(room)}
        disabled={!room.isAvailable}
        className={`mt-6 w-full glass-button !py-3 font-bold uppercase tracking-widest text-xs transition-all ${
          !room.isAvailable ? 'opacity-50 cursor-not-allowed !bg-white/5 grayscale' : 'hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]'
        }`}
      >
        {room.isAvailable ? 'Book Now' : 'Not Available'}
      </button>
    </motion.div>
  );
};

export default RoomCard;
