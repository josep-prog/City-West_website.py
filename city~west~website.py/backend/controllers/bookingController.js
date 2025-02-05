const Booking = require('../models/Booking'); // Assuming a Booking model exists
const User = require('../models/User'); // Assuming a User model exists
const { validationResult } = require('express-validator');

// Create a new booking
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, roomId, checkInDate, checkOutDate, guests, specialRequests } = req.body;

  try {
    // Check if room is available for the given dates
    const existingBooking = await Booking.findOne({
      roomId,
      checkInDate: { $lt: checkOutDate },
      checkOutDate: { $gt: checkInDate },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room is already booked for these dates' });
    }

    // Create the booking
    const newBooking = new Booking({
      userId,
      roomId,
      checkInDate,
      checkOutDate,
      guests,
      specialRequests,
      status: 'pending', // Initial status
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Booking successfully created',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during booking creation' });
  }
};

// Retrieve all bookings for a user
exports.getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ userId });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Retrieve a specific booking by booking ID
exports.getBookingById = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
};

// Update a booking (e.g., change check-in/check-out dates or guests)
exports.updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { checkInDate, checkOutDate, guests, specialRequests } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { checkInDate, checkOutDate, guests, specialRequests },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during booking update' });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const canceledBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: 'canceled' },
      { new: true }
    );

    if (!canceledBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking canceled successfully',
      booking: canceledBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during booking cancellation' });
  }
};

// Retrieve all bookings (admin access only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching all bookings' });
  }
};

// Update booking status (e.g., confirmed, checked-in, completed)
exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({
      message: 'Booking status updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during booking status update' });
  }
};