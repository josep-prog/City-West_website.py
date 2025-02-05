const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { authenticateUser, checkAdmin } = require('../middlewares/auth');

// Route for creating a new event
router.post('/', authenticateUser, checkAdmin, eventController.createEvent);

// Route for updating an existing event (e.g., change event details, date, time)
router.put('/:eventId', authenticateUser, checkAdmin, eventController.updateEvent);

// Route for retrieving all events (public view)
router.get('/', eventController.getAllEvents);

// Route for retrieving a specific event by ID
router.get('/:eventId', eventController.getEventById);

// Route for booking a spot at an event (e.g., RSVP, reserve a ticket)
router.post('/:eventId/booking', authenticateUser, eventController.bookEvent);

// Route for retrieving all bookings for a specific event
router.get('/:eventId/bookings', authenticateUser, checkAdmin, eventController.getEventBookings);

// Route for canceling a booking for an event
router.delete('/:eventId/booking/:bookingId', authenticateUser, eventController.cancelEventBooking);

// Route for deleting an event (admin only)
router.delete('/:eventId', authenticateUser, checkAdmin, eventController.deleteEvent);

module.exports = router;