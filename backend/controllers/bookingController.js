const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
const getBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate('userId', 'name email')
    .populate('roomId', 'name type capacity');
  res.status(200).json(bookings);
};

// @desc    Get my bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.id })
    .populate('roomId', 'name type capacity');
  res.status(200).json(bookings);
};

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { roomId, startTime, endTime, bookingType, meetLink } = req.body;

  if (!roomId || !startTime || !endTime) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Check if room exists
  const room = await Room.findById(roomId);
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  // Server validation for double booking
  const overlappingBooking = await Booking.findOne({
    roomId,
    status: 'confirmed',
    $or: [
      {
        startTime: { $lt: new Date(endTime) },
        endTime: { $gt: new Date(startTime) }
      }
    ]
  });

  if (overlappingBooking) {
    return res.status(400).json({ message: 'Room is already booked for this time slot' });
  }

  const booking = await Booking.create({
    userId: req.user.id,
    roomId,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    bookingType,
    meetLink,
    participants: [req.user.id]
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate('roomId', 'name type capacity');

  res.status(201).json(populatedBooking);
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Check if user is authorized to cancel
  if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ message: 'User not authorized' });
  }

  booking.status = 'cancelled';
  await booking.save();

  res.status(200).json({ id: req.params.id, status: 'cancelled' });
};

module.exports = {
  getBookings,
  getMyBookings,
  createBooking,
  cancelBooking
};
