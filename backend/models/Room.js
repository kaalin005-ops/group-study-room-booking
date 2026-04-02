const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a room name'],
    unique: true
  },
  capacity: {
    type: Number,
    required: [true, 'Please add capacity']
  },
  wifi: {
    type: Boolean,
    default: false
  },
  ac: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    enum: ['WiFi', 'No WiFi', 'WiFi + AC'],
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', roomSchema);
