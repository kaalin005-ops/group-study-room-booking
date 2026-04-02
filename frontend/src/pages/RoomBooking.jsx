import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import BookingModal from '../components/BookingModal';
import { Calendar, Filter, Grid, List, Search, Wifi, Wind, Users } from 'lucide-react';

const RoomBooking = () => {
  const { rooms, fetchRooms, createBooking } = useBooking();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleBook = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filter === 'All' || room.type === filter;
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { label: 'All Rooms', icon: Grid, value: 'All' },
    { label: 'WiFi Rooms', icon: Wifi, value: 'WiFi' },
    { label: 'No WiFi', icon: Users, value: 'No WiFi' },
    { label: 'WiFi + AC', icon: Wind, value: 'WiFi + AC' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                <Calendar className="text-indigo-400 w-12 h-12" />
                Physical <span className="text-indigo-400">Booking</span>
              </h1>
              <p className="text-indigo-200/50 font-medium text-lg italic">Find and reserve the perfect study spot on campus.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Quick search room..." 
                  className="glass-input pl-12 w-64 focus:ring-4 focus:ring-indigo-500/10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex glass-morphism rounded-xl p-1 border-white/5">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                      filter === opt.value 
                        ? 'bg-indigo-500/30 text-white shadow-lg border border-white/10' 
                        : 'text-indigo-100/40 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <opt.icon size={16} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Rooms Grid */}
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room, idx) => (
                <motion.div
                  key={room._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <RoomCard room={room} onBook={handleBook} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-20 text-center flex flex-col items-center gap-4 opacity-50 border-white/5">
              <div className="p-6 bg-white/5 rounded-full border border-white/10">
                <Search size={48} className="text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">No rooms found</h3>
              <p className="text-indigo-100/40 font-medium max-w-xs">We couldn't find any rooms matching your criteria. Try adjusting your filters.</p>
              <button onClick={() => {setFilter('All'); setSearchQuery('');}} className="glass-button !py-3 !px-8 text-xs font-black uppercase tracking-widest mt-4">Reset Filters</button>
            </div>
          )}
        </div>
      </main>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
        onConfirm={createBooking}
      />
    </div>
  );
};

export default RoomBooking;
