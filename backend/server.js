const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const socketHandler = require('./socket/socketHandler');
const Room = require('./models/Room');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/rooms', require('./routes/roomRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Socket.io
socketHandler(io);

// Error Handler
app.use(errorHandler);

// Seed Data Function
const seedRooms = async () => {
  try {
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
      const rooms = [
        // WiFi Rooms (5)
        { name: 'Room W1', capacity: 4, wifi: true, ac: false, type: 'WiFi' },
        { name: 'Room W2', capacity: 4, wifi: true, ac: false, type: 'WiFi' },
        { name: 'Room W3', capacity: 5, wifi: true, ac: false, type: 'WiFi' },
        { name: 'Room W4', capacity: 5, wifi: true, ac: false, type: 'WiFi' },
        { name: 'Room W5', capacity: 6, wifi: true, ac: false, type: 'WiFi' },
        // No WiFi Rooms (6)
        { name: 'Room NW1', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        { name: 'Room NW2', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        { name: 'Room NW3', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        { name: 'Room NW4', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        { name: 'Room NW5', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        { name: 'Room NW6', capacity: 4, wifi: false, ac: false, type: 'No WiFi' },
        // WiFi + AC Rooms (3)
        { name: 'Room AC1', capacity: 6, wifi: true, ac: true, type: 'WiFi + AC' },
        { name: 'Room AC2', capacity: 7, wifi: true, ac: true, type: 'WiFi + AC' },
        { name: 'Room AC3', capacity: 8, wifi: true, ac: true, type: 'WiFi + AC' },
        // Virtual Room (1)
        { name: 'Virtual Study Space', capacity: 100, wifi: true, ac: true, type: 'WiFi + AC', isAvailable: true },
      ];
      await Room.insertMany(rooms);
      console.log('Initial room data seeded!');
    }
  } catch (error) {
    console.error('Error seeding rooms:', error);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedRooms();
});
