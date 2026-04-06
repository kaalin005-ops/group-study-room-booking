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
    <div className="min-h-screen bg-paper">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-wood tracking-tighter flex items-center gap-4 uppercase">
                <Calendar className="text-forest w-12 h-12" />
                Physical <span className="text-forest">Booking</span>
              </h1>
              <p className="text-wood/40 font-bold text-lg italic">Find and reserve the perfect study spot on campus.</p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-wood/30 group-focus-within:text-forest transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Quick search room..." 
                  className="glass-input pl-12 w-64 focus:ring-4 focus:ring-forest/10 shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex bg-white rounded-xl p-1 border border-wood/5 shadow-sm">
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setFilter(opt.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      filter === opt.value 
                        ? 'bg-forest text-white shadow-md' 
                        : 'text-wood/40 hover:text-forest hover:bg-wood/5'
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <RoomCard room={room} onBook={handleBook} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="glass-card p-20 text-center flex flex-col items-center gap-4 !bg-white border-wood/10 shadow-xl">
              <div className="p-8 bg-paper rounded-full border border-wood/10 shadow-inner">
                <Search size={48} className="text-forest/30" />
              </div>
              <h3 className="text-2xl font-black text-wood tracking-tight uppercase italic">No spaces found</h3>
              <p className="text-wood/40 font-bold max-w-xs">Try adjusting your filters to find an available study room.</p>
              <button onClick={() => {setFilter('All'); setSearchQuery('');}} className="glass-button !py-3 !px-8 text-[10px] font-black uppercase tracking-widest mt-4">Reset Search</button>
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
