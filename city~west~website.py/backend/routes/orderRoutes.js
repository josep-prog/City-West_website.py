const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser } = require('../middlewares/auth');

// Route for creating a new food or drink order
router.post('/', authenticateUser, orderController.createOrder);

// Route for updating an existing order (e.g., change items or quantity)
router.put('/:orderId', authenticateUser, orderController.updateOrder);

// Route for retrieving all orders placed by a user
router.get('/', authenticateUser, orderController.getUserOrders);

// Route for retrieving a specific order by ID
router.get('/:orderId', authenticateUser, orderController.getOrderById);

// Route for canceling an order
router.delete('/:orderId', authenticateUser, orderController.cancelOrder);

// Route for retrieving all orders (admin access only)
router.get('/admin', authenticateUser, orderController.getAllOrders);

// Route for updating the status of an order (e.g., from 'pending' to 'completed')
router.put('/:orderId/status', authenticateUser, orderController.updateOrderStatus);

module.exports = router;