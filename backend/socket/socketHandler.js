const socketHandler = (io) => {
  let activeUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Track active users
    socket.on('activeUsers', (userData) => {
      if (userData && userData._id) {
        activeUsers.set(socket.id, userData);
        io.emit('activeUsers', Array.from(activeUsers.values()));
      }
    });

    // Room booked event
    socket.on('roomBooked', (data) => {
      console.log('Room booked event:', data);
      io.emit('roomUpdated', { type: 'booked', data });
    });

    // Join virtual session
    socket.on('joinSession', (data) => {
      const { sessionId, user } = data;
      socket.join(sessionId);
      console.log(`User ${user.name} joined session ${sessionId}`);
      io.to(sessionId).emit('userJoined', user);
    });

    // Leave virtual session
    socket.on('leaveSession', (data) => {
      const { sessionId, user } = data;
      socket.leave(sessionId);
      console.log(`User ${user.name} left session ${sessionId}`);
      io.to(sessionId).emit('userLeft', user);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      activeUsers.delete(socket.id);
      io.emit('activeUsers', Array.from(activeUsers.values()));
    });
  });
};

module.exports = socketHandler;
