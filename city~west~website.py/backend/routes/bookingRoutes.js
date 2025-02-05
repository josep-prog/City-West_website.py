const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateUser } = require('../middlewares/auth');

// Route for creating a room booking
router.post('/room', authenticateUser, bookingController.createRoomBooking);

// Route for updating room booking details (e.g., changing date, duration)
router.put('/room/:bookingId', authenticateUser, bookingController.updateRoomBooking);

// Route for retrieving all room bookings (for staff)
router.get('/room', authenticateUser, bookingController.getAllRoomBookings);

// Route for retrieving a specific room booking by ID
router.get('/room/:bookingId', authenticateUser, bookingController.getRoomBookingById);

// Route for canceling a room booking
router.delete('/room/:bookingId', authenticateUser, bookingController.cancelRoomBooking);

// Route for food ordering related to room booking
router.post('/food', authenticateUser, bookingController.createFoodOrder);

// Route for updating an existing food order
router.put('/food/:orderId', authenticateUser, bookingController.updateFoodOrder);

// Route for retrieving food orders made by a user
router.get('/food', authenticateUser, bookingController.getFoodOrders);

// Route for retrieving food orders for a particular room booking
router.get('/food/room/:bookingId', authenticateUser, bookingController.getFoodOrdersByRoom);

// Route for canceling a food order
router.delete('/food/:orderId', authenticateUser, bookingController.cancelFoodOrder);

module.exports = router;