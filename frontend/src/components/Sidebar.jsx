import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Video, BookOpen, Settings, Users } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Physical Booking', icon: Calendar, path: '/room-booking' },
    { name: 'Virtual Session', icon: Video, path: '/virtual-room' },
    { name: 'My Bookings', icon: BookOpen, path: '/my-bookings' },
  ];

  return (
    <aside className="w-64 glass-morphism h-screen fixed top-0 left-0 pt-24 px-4 border-r-0 rounded-r-3xl">
      <div className="space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-indigo-500/30 text-white shadow-lg border border-white/20'
                  : 'text-indigo-100/70 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="font-semibold tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-8 left-4 right-4 p-6 glass-card border-indigo-400/20">
        <div className="flex items-center space-x-3 text-indigo-200">
          <Users className="w-5 h-5" />
          <span className="text-sm font-medium">Study Groups</span>
        </div>
        <p className="text-xs text-indigo-300/60 mt-2 leading-relaxed">
          Join active study sessions and boost your productivity together!
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
