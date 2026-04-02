import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { ShieldAlert, Plus, Edit2, Trash2, Wifi, Wind, Users, CheckCircle, XCircle, Grid, Filter, Search } from 'lucide-react';

const AdminRooms = () => {
  const { rooms, fetchRooms } = useBooking();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 4,
    type: 'WiFi',
    wifi: true,
    ac: false
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-morphism p-12 rounded-[3rem] border-rose-500/20 shadow-2xl space-y-8 max-w-lg">
          <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-rose-500/30">
            <ShieldAlert size={48} className="text-rose-400" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Access Denied</h1>
            <p className="text-indigo-200/50 font-medium text-lg italic">You do not have administrator privileges to access this area.</p>
          </div>
          <button onClick={() => window.history.back()} className="glass-button !py-4 !px-12 text-sm font-black uppercase tracking-widest shadow-xl hover:shadow-indigo-500/20">
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        await API.put(`/rooms/${editingRoom._id}`, formData);
      } else {
        await API.post('/rooms', formData);
      }
      setIsModalOpen(false);
      setEditingRoom(null);
      fetchRooms();
    } catch (err) {
      alert('Action failed. Check details.');
    }
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      capacity: room.capacity,
      type: room.type,
      wifi: room.wifi,
      ac: room.ac
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await API.delete(`/rooms/${id}`);
      fetchRooms();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Sidebar />

      <main className="pl-72 pt-28 pr-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-4">
                <Grid className="text-indigo-400 w-12 h-12" />
                Room <span className="text-indigo-400">Management</span>
              </h1>
              <p className="text-indigo-200/50 font-medium text-lg italic">Admin console to manage physical study spaces and availability.</p>
            </div>
            <button
              onClick={() => { setEditingRoom(null); setFormData({ name: '', capacity: 4, type: 'WiFi', wifi: true, ac: false }); setIsModalOpen(true); }}
              className="glass-button !py-4 !px-10 flex items-center gap-3 text-lg font-black uppercase tracking-widest shadow-2xl hover:shadow-indigo-500/30"
            >
              <Plus size={24} />
              <span>Add New Room</span>
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 bg-white/5 backdrop-blur-3xl rounded-[2rem] p-6 border border-white/10">
            <div className="relative flex-grow max-w-md group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400/50 group-focus-within:text-indigo-400" size={20} />
              <input type="text" placeholder="Filter by room name..." className="w-full glass-input pl-12 focus:ring-4 focus:ring-indigo-500/10 py-3" />
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-indigo-100/50 hover:bg-white/10 hover:text-white transition-all">
                <Filter size={16} /> Filter
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-indigo-100/50 hover:bg-white/10 hover:text-white transition-all">
                Export Data
              </button>
            </div>
          </div>

          {/* Rooms Table */}
          <div className="glass-morphism rounded-[3rem] overflow-hidden border-white/5 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="p-8 text-xs font-black text-indigo-100/30 uppercase tracking-[0.3em]">Room Details</th>
                  <th className="p-8 text-xs font-black text-indigo-100/30 uppercase tracking-[0.3em]">Type & Features</th>
                  <th className="p-8 text-xs font-black text-indigo-100/30 uppercase tracking-[0.3em]">Capacity</th>
                  <th className="p-8 text-xs font-black text-indigo-100/30 uppercase tracking-[0.3em]">Status</th>
                  <th className="p-8 text-xs font-black text-indigo-100/30 uppercase tracking-[0.3em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room, idx) => (
                  <motion.tr
                    key={room._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-8">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-400 font-black text-2xl group-hover:scale-110 transition-transform shadow-lg">
                          {room.name.slice(-2)}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xl font-black text-white tracking-tight">{room.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-100/30">ID: {room._id.slice(-8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-indigo-100/70">{room.type}</span>
                        {room.wifi && <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 shadow-lg"><Wifi size={16} /></div>}
                        {room.ac && <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30 shadow-lg"><Wind size={16} /></div>}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex items-center gap-3 text-white font-black text-lg">
                        <Users size={20} className="text-indigo-400" />
                        {room.capacity} Students
                      </div>
                    </td>
                    <td className="p-8">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                        room.isAvailable ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                      }`}>
                        {room.isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                        {room.isAvailable ? 'Operational' : 'Reserved'}
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => handleEdit(room)} className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl hover:bg-indigo-500/20 border border-indigo-500/20 transition-all shadow-lg hover:shadow-indigo-500/10">
                          <Edit2 size={20} />
                        </button>
                        <button onClick={() => handleDelete(room._id)} className="p-4 bg-rose-500/10 text-rose-400 rounded-2xl hover:bg-rose-500/20 border border-rose-500/20 transition-all shadow-lg hover:shadow-rose-500/10">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Room Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative w-full max-w-xl glass-morphism p-12 rounded-[3rem] shadow-2xl border border-white/30">
            <h2 className="text-4xl font-black text-white tracking-tighter mb-10 uppercase">{editingRoom ? 'Update Room' : 'New Study Room'}</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Room Name</label>
                <input type="text" required className="w-full glass-input text-lg py-4 focus:ring-4 focus:ring-indigo-500/20" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Room AC5" />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Capacity</label>
                  <input type="number" required className="w-full glass-input text-lg py-4 focus:ring-4 focus:ring-indigo-500/20" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })} min="1" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black text-indigo-100 uppercase tracking-[0.2em] px-1">Room Category</label>
                  <select className="w-full glass-input text-lg py-4 focus:ring-4 focus:ring-indigo-500/20 appearance-none bg-indigo-900/50" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                    <option value="WiFi">WiFi Room</option>
                    <option value="No WiFi">No WiFi Room</option>
                    <option value="WiFi + AC">WiFi + AC Room</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-8 bg-white/5 p-6 rounded-2xl border border-white/10">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="hidden" checked={formData.wifi} onChange={(e) => setFormData({ ...formData, wifi: e.target.checked })} />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.wifi ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'border-white/20'}`}>
                    {formData.wifi && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-indigo-100/70 group-hover:text-white">WiFi Available</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="hidden" checked={formData.ac} onChange={(e) => setFormData({ ...formData, ac: e.target.checked })} />
                  <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.ac ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]' : 'border-white/20'}`}>
                    {formData.ac && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest text-indigo-100/70 group-hover:text-white">Air Conditioning</span>
                </label>
              </div>
              <button type="submit" className="w-full glass-button !py-6 text-xl font-black uppercase tracking-[0.3em] shadow-2xl hover:shadow-indigo-500/30">
                {editingRoom ? 'Save Changes' : 'Initialize Room'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRooms;
