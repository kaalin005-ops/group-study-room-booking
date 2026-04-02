const Room = require('../models/Room');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  const rooms = await Room.find();
  res.status(200).json(rooms);
};

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
  const { name, capacity, wifi, ac, type } = req.body;

  if (!name || !capacity || !type) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  const room = await Room.create({
    name,
    capacity,
    wifi,
    ac,
    type
  });

  res.status(201).json(room);
};

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  const updatedRoom = await Room.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedRoom);
};

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  await room.deleteOne();

  res.status(200).json({ id: req.params.id });
};

module.exports = {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom
};
