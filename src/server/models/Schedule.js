// models/Schedule.js

const mongoose = require('mongoose'); // Importing mongoose to create and manage the schema

// Defining the schema for a workout schedule
const scheduleSchema = new mongoose.Schema({
  // Title of the workout session, required field
  title: { type: String, required: true },
  
  // Date of the workout session in string format, required field
  date: { type: String, required: true },
  
  // Time of the workout session in string format, required field
  time: { type: String, required: true },
  
  // Optional field for specifying the primary body part targeted in the workout
  bodyPart: { type: String },
  
  // Array of exercises within this workout, each with name, sets, and reps
  exercises: [
    {
      name: { type: String }, // Name of the exercise
      sets: { type: Number },  // Number of sets for the exercise
      reps: { type: Number }   // Number of repetitions for each set
    }
  ]
});

// Exporting the Schedule model based on the schema
module.exports = mongoose.model('Schedule', scheduleSchema);
