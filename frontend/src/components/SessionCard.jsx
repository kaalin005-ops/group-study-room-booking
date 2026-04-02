import React from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, Users, ExternalLink } from 'lucide-react';

const SessionCard = ({ session }) => {
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);
  const isActive = new Date() >= startTime && new Date() <= endTime;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 flex flex-col justify-between border-indigo-400/20"
    >
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${isActive ? 'bg-indigo-500/30 text-indigo-300' : 'bg-white/5 text-white/30'} border border-white/10`}>
              <Video size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">Virtual Session</h3>
              <p className="text-indigo-200/50 text-xs font-medium uppercase tracking-wider">{session.roomId.name}</p>
            </div>
          </div>
          {isActive && (
            <span className="flex items-center gap-1.5 px-2 py-1 bg-rose-500/20 text-rose-300 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse border border-rose-500/30">
              Live
            </span>
          )}
        </div>

        <div className="space-y-3 py-2">
          <div className="flex items-center gap-2 text-indigo-100/70 text-sm">
            <Calendar size={16} className="text-indigo-400" />
            <span>{startTime.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-100/70 text-sm">
            <Clock size={16} className="text-indigo-400" />
            <span>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-100/70 text-sm">
            <Users size={16} className="text-indigo-400" />
            <span>{session.participants.length} Participants</span>
          </div>
        </div>
      </div>

      <a
        href={session.meetLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-6 w-full glass-button !py-3 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs ${
          !isActive ? 'opacity-50 grayscale pointer-events-none' : 'hover:shadow-indigo-500/20'
        }`}
      >
        <span>Join Session</span>
        <ExternalLink size={14} />
      </a>
    </motion.div>
  );
};

export default SessionCard;
