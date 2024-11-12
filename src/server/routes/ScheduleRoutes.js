// routes/scheduleRoutes.js

const express = require('express'); // Importing Express framework
const router = express.Router(); // Creating an Express router instance
const Schedule = require('../models/Schedule'); // Importing the Schedule model

// Create a new schedule
router.post('/', async (req, res) => {
  try {
    const newSchedule = new Schedule(req.body); // Creating a new Schedule instance with request data
    const savedSchedule = await newSchedule.save(); // Saving the schedule to the database
    res.status(201).json(savedSchedule); // Responding with the saved schedule
  } catch (err) {
    res.status(400).json({ message: err.message }); // Sending error message for validation or other issues
  }
});

// Get all schedules
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find(); // Retrieving all schedules from the database
    res.json(schedules); // Responding with the list of schedules
  } catch (err) {
    res.status(500).json({ message: err.message }); // Sending error message for server issues
  }
});

// Get a specific schedule by ID
router.get('/:id', async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id); // Finding schedule by ID
    if (!schedule) return res.status(404).json({ message: "Schedule not found" }); // Respond if no schedule is found
    res.json(schedule); // Responding with the found schedule
  } catch (err) {
    res.status(500).json({ message: err.message }); // Sending error message for server issues
  }
});

// Update a schedule
router.put('/:id', async (req, res) => {
  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      req.params.id, // Schedule ID from the request parameters
      req.body,      // Updated data from the request body
      { new: true, runValidators: true } // Options to return the updated document and validate
    );
    if (!updatedSchedule) return res.status(404).json({ message: "Schedule not found" }); // Respond if no schedule is found
    res.json(updatedSchedule); // Responding with the updated schedule
  } catch (err) {
    res.status(400).json({ message: err.message }); // Sending error message for validation or other issues
  }
});

// Delete a schedule
router.delete('/:id', async (req, res) => {
  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(req.params.id); // Deleting schedule by ID
    if (!deletedSchedule) return res.status(404).json({ message: "Schedule not found" }); // Respond if no schedule is found
    res.json({ message: "Schedule deleted" }); // Confirmation message for deletion
  } catch (err) {
    res.status(500).json({ message: err.message }); // Sending error message for server issues
  }
});

module.exports = router; // Exporting the router to be used in other parts of the application
