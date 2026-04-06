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
    <aside className="w-64 glass-morphism h-screen fixed top-0 left-0 pt-24 px-4 border-r border-wood/5 rounded-r-[2.5rem] !bg-white/80">
      <div className="space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-forest text-white shadow-xl shadow-forest/20'
                  : 'text-wood/60 hover:bg-wood/5 hover:text-wood font-semibold'
              }`
            }
          >
            <item.icon className="w-6 h-6" />
            <span className="font-bold tracking-tight">{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-8 left-4 right-4 p-6 glass-card !bg-forest/5 border-forest/10">
        <div className="flex items-center space-x-3 text-forest">
          <Users className="w-5 h-5" />
          <span className="text-sm font-black uppercase tracking-widest">Study Network</span>
        </div>
        <p className="text-xs text-wood/60 mt-3 leading-relaxed font-medium">
          Connect with peers and book the perfect quiet spot for your next session.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
