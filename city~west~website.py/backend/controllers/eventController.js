const Event = require('../models/Event'); // Assuming an Event model exists
const { validationResult } = require('express-validator');

// Create a new event
exports.createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, description, eventDate, location, image, isPrivate } = req.body;

  try {
    // Create a new event
    const newEvent = new Event({
      title,
      description,
      eventDate,
      location,
      image,
      isPrivate, // Whether the event is private or public
      status: 'upcoming', // Event status is 'upcoming' when created
    });

    await newEvent.save();

    res.status(201).json({
      message: 'Event successfully created',
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during event creation' });
  }
};

// Retrieve all events (public and private)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching events' });
  }
};

// Retrieve upcoming events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ eventDate: { $gte: new Date() }, status: 'upcoming' });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No upcoming events found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching upcoming events' });
  }
};

// Retrieve past events
exports.getPastEvents = async (req, res) => {
  try {
    const events = await Event.find({ eventDate: { $lt: new Date() }, status: 'completed' });

    if (!events || events.length === 0) {
      return res.status(404).json({ message: 'No past events found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching past events' });
  }
};

// Retrieve a specific event by event ID
exports.getEventById = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching event' });
  }
};

// Update event details (e.g., change date, description, or status)
exports.updateEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, description, eventDate, location, image, isPrivate } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { title, description, eventDate, location, image, isPrivate },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during event update' });
  }
};

// Update event status (e.g., from 'upcoming' to 'completed' or 'canceled')
exports.updateEventStatus = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      { status },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event status updated successfully',
      event: updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during event status update' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({
      message: 'Event deleted successfully',
      event: deletedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during event deletion' });
  }
};