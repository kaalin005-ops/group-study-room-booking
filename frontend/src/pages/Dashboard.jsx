import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useSocket } from '../context/SocketContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';
import SessionCard from '../components/SessionCard';
import BookingModal from '../components/BookingModal';
import { LayoutDashboard, Users, Calendar, Video, Clock, TrendingUp, Search } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { rooms, myBookings, fetchRooms, fetchMyBookings, createBooking } = useBooking();
  const { activeUsers } = useSocket();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchMyBookings();
  }, []);

  const handleBook = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const activeSessions = myBookings.filter(b => b.bookingType === 'virtual' && b.status === 'confirmed');
  const recentBookings = [...myBookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 3);

  const stats = [
    { label: 'Active Users', value: activeUsers.length, icon: Users, color: 'text-emerald-400' },
    { label: 'Total Rooms', value: rooms.length, icon: LayoutDashboard, color: 'text-indigo-400' },
    { label: 'My Bookings', value: myBookings.length, icon: Calendar, color: 'text-purple-400' },
    { label: 'Live Sessions', value: activeSessions.length, icon: Video, color: 'text-rose-400' },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tighter">
                Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{user?.name}</span>
              </h1>
              <p className="text-indigo-200/50 font-medium text-lg italic">Ready to make today's study session productive?</p>
            </div>
            <div className="flex gap-4">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search rooms..." 
                  className="glass-input pl-12 w-64 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex items-center justify-between border-white/5"
              >
                <div>
                  <p className="text-indigo-100/40 text-xs font-black uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Rooms */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                  <TrendingUp className="text-indigo-400" />
                  Available Rooms
                </h2>
                <button onClick={fetchRooms} className="text-indigo-400 text-sm font-bold hover:underline">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rooms.slice(0, 4).map((room) => (
                  <RoomCard key={room._id} room={room} onBook={handleBook} />
                ))}
              </div>
            </div>

            {/* Right Column: Sessions & Recent */}
            <div className="space-y-10">
              {/* Active Sessions */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <Video className="text-rose-400" />
                  Live Sessions
                </h2>
                {activeSessions.length > 0 ? (
                  <div className="space-y-4">
                    {activeSessions.map(session => (
                      <SessionCard key={session._id} session={session} />
                    ))}
                  </div>
                ) : (
                  <div className="glass-card p-8 text-center space-y-3 opacity-60">
                    <p className="text-indigo-100/60 font-medium">No active virtual sessions</p>
                    <button className="text-indigo-400 text-xs font-black uppercase tracking-widest hover:text-indigo-300">Start Session +</button>
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                  <Clock className="text-indigo-400" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking._id} className="glass-card p-4 flex items-center gap-4 border-white/5 hover:bg-white/10">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/20 text-indigo-300">
                        {booking.bookingType === 'virtual' ? <Video size={20} /> : <Calendar size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{booking.roomId?.name || 'Study Room'}</p>
                        <p className="text-[10px] font-medium text-indigo-100/40 uppercase tracking-widest">
                          {new Date(booking.startTime).toLocaleDateString()} • {new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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

export default Dashboard;
