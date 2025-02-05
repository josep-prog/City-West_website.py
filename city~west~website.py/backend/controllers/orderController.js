const Order = require('../models/Order'); // Assuming an Order model exists
const { validationResult } = require('express-validator');
const { sendOrderNotification } = require('../utils/notification'); // Assuming you have a notification utility

// Create a new order
exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerId, items, totalAmount, deliveryAddress, paymentStatus, specialRequest } = req.body;

  try {
    const newOrder = new Order({
      customerId,
      items,
      totalAmount,
      deliveryAddress,
      paymentStatus,
      specialRequest,
      status: 'pending', // Order is initially pending
    });

    await newOrder.save();

    // Send notification to kitchen or staff
    sendOrderNotification(customerId, newOrder);

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during order creation' });
  }
};

// Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

// Retrieve orders by customer ID
exports.getOrdersByCustomer = async (req, res) => {
  const { customerId } = req.params;

  try {
    const orders = await Order.find({ customerId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this customer' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching customer orders' });
  }
};

// Retrieve orders by status (e.g., pending, completed, canceled)
exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: `No orders found with status ${status}` });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching orders by status' });
  }
};

// Retrieve a specific order by order ID
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching the order' });
  }
};

// Update order status (e.g., from 'pending' to 'completed' or 'canceled')
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send notification if the order is completed or canceled
    if (status === 'completed' || status === 'canceled') {
      sendOrderNotification(updatedOrder.customerId, updatedOrder);
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during order status update' });
  }
};

// Update order details (e.g., special requests or address)
exports.updateOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  const { specialRequest, deliveryAddress } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { specialRequest, deliveryAddress },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order details updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during order details update' });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order: deletedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during order deletion' });
  }
};