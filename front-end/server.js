const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static(path.join(__dirname))); // Serve files from the current directory

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'payment.html')); // Correct path to payment.html
});

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'j.nishimwe@alustudent.com', // Your email
    pass: 'jtqt knnt uxdo qqbs', // Your app password
  },
});

// API endpoint to handle form submission
app.post('/submit-order', async (req, res) => {
  console.log('Received request:', req.body); // Debugging log

  const { order_type, contact_number, contact_email, orderId, ...orderDetails } = req.body;

  // Generate a unique order ID if not provided
  const generatedOrderId = orderId || generateOrderId(order_type);

  // Email content for client
  const clientMessage = `Your order (ID: ${generatedOrderId}) has been received at City West. For more information or any queries, feel free to reach out on this contact: +250 791 64602.`;

  // Email content for restaurant
  const restaurantMessage = `New Order (ID: ${generatedOrderId}): ${JSON.stringify(orderDetails)}\nContact: ${contact_number}, Email: ${contact_email}`;

  try {
    // Send email to client
    await transporter.sendMail({
      from: 'j.nishimwe@alustudent.com',
      to: contact_email,
      subject: 'Order Confirmation',
      text: clientMessage,
    });

    // Send email to restaurant
    await transporter.sendMail({
      from: 'j.nishimwe@alustudent.com',
      to: 'j.nishimwe@alustudent.com',
      subject: 'New Order Received',
      text: restaurantMessage,
    });

    console.log('Emails sent successfully'); // Debugging log
    res.status(200).json({ message: 'Order submitted successfully', orderId: generatedOrderId });
  } catch (error) {
    console.error('Error sending email:', error); // Debugging log
    res.status(500).json({ message: 'Failed to submit order', error: error.message });
  }
});

// Generate a unique order ID
function generateOrderId(orderType) {
  const prefix = orderType === 'room' ? 'R' : 'F';
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}`;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});