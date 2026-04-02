const express = require('express');
const router = express.Router();
const { getBookings, getMyBookings, createBooking, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getBookings);
router.get('/my', protect, getMyBookings);
router.post('/', protect, createBooking);
router.delete('/:id', protect, cancelBooking);

module.exports = router;
