const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: function() {
            return !this.food;
        }
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: function() {
            return !this.room;
        }
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    checkInDate: {
        type: Date
    },
    checkOutDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;