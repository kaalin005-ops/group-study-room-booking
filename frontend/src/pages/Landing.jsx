import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Video, Shield, Clock, Users, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] } }
  };

  const features = [
    { icon: Calendar, title: "Real-time Booking", desc: "Instantly reserve study rooms with live availability updates." },
    { icon: Video, title: "Virtual Sessions", desc: "Create and join study groups remotely with Google Meet integration." },
    { icon: Users, title: "Collaborative Study", desc: "Boost productivity by studying together in dedicated spaces." },
    { icon: Shield, title: "Secure System", desc: "JWT-protected authentication for students and administrators." }
  ];

  const roomTypes = [
    { name: "WiFi Rooms", count: 5, capacity: "4-6", icon: "🌐" },
    { name: "No WiFi Rooms", count: 6, capacity: "4", icon: "🤫" },
    { name: "WiFi + AC Rooms", count: 3, capacity: "6-8", icon: "❄️" }
  ];

  return (
    <div className="min-h-screen bg-paper overflow-hidden text-wood">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-forest/5 blur-[120px] rounded-full -z-10"
        />
        
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 max-w-4xl">
          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter text-wood leading-[0.9]">
            Focus. Collaborate. <span className="text-forest">Excel.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-wood/60 font-bold max-w-2xl mx-auto leading-relaxed italic">
            The premium study room booking experience for modern scholars.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-6 justify-center pt-4">
            <Link to="/register" className="glass-button !py-5 !px-12 text-lg font-black uppercase tracking-widest shadow-2xl hover:shadow-forest/30 flex items-center gap-3">
              Start Studying <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to="/login" className="bg-wood/5 border border-wood/10 text-wood !py-5 !px-12 rounded-xl text-lg font-black uppercase tracking-widest hover:bg-wood/10 transition-all">
              Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 group border-wood/5 hover:border-gold/30 !bg-white"
            >
              <div className="w-14 h-14 bg-forest/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-forest/10">
                <feature.icon className="w-7 h-7 text-forest" />
              </div>
              <h3 className="text-xl font-black text-wood mb-3 tracking-tight uppercase">{feature.title}</h3>
              <p className="text-wood/50 leading-relaxed text-sm font-bold">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Room Types Showcase */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-forest/5 rounded-[4rem] border border-forest/10 mb-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-wood tracking-tight uppercase">Curated Spaces</h2>
          <p className="text-wood/40 font-bold italic">Designed for every type of study session.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roomTypes.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-10 flex flex-col items-center text-center space-y-4 group hover:!bg-white border-wood/5"
            >
              <span className="text-5xl mb-2 group-hover:scale-110 transition-transform drop-shadow-md">{room.icon}</span>
              <h3 className="text-2xl font-black text-wood tracking-tight uppercase">{room.name}</h3>
              <div className="space-y-1">
                <p className="text-forest font-black uppercase tracking-widest text-[10px]">{room.count} Available Now</p>
                <p className="text-wood/30 text-xs font-black uppercase tracking-widest">Seats {room.capacity}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 text-center space-y-8 bg-wood text-paper">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter uppercase">Join the Study Network</h2>
        <Link to="/register" className="inline-flex glass-button !bg-gold !text-wood !py-6 !px-16 text-xl font-black uppercase tracking-[0.2em] shadow-2xl hover:!bg-white transition-all">
          Register Now
        </Link>
        <p className="text-paper/20 text-[10px] font-black uppercase tracking-[0.4em] pt-8">The Modern Study Room Booking System</p>
      </section>
    </div>
  );
};

export default Landing;
