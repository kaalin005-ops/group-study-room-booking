import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Wind, Users, CheckCircle, XCircle } from 'lucide-react';

const RoomCard = ({ room, onBook }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="glass-card p-6 flex flex-col justify-between group h-full !bg-white border-wood/10"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-black text-wood group-hover:text-forest transition-colors tracking-tight">
            {room.name}
          </h3>
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
            room.isAvailable 
              ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' 
              : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
          }`}>
            {room.isAvailable ? 'Ready' : 'In Use'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {room.wifi && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-forest/5 text-forest rounded-lg text-[10px] font-black uppercase tracking-widest border border-forest/10">
              <Wifi size={14} /> WiFi
            </span>
          )}
          {room.ac && (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-500/5 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
              <Wind size={14} /> AC
            </span>
          )}
          <span className="flex items-center gap-1.5 px-3 py-1 bg-wood/5 text-wood rounded-lg text-[10px] font-black uppercase tracking-widest border border-wood/10">
            <Users size={14} /> {room.capacity} Max
          </span>
        </div>

        <p className="text-wood/60 text-sm leading-relaxed font-medium italic">
          Ideal for {room.type.toLowerCase()} group sessions and focused collaboration.
        </p>
      </div>

      <button
        onClick={() => onBook(room)}
        disabled={!room.isAvailable}
        className={`mt-6 w-full glass-button !py-3.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
          !room.isAvailable ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'
        }`}
      >
        {room.isAvailable ? 'Reserve Spot' : 'Unavailable'}
      </button>
    </motion.div>
  );
};

export default RoomCard;
