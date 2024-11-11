// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  bodyPart: { type: String },
  exercises: [
    {
      name: { type: String },
      sets: { type: Number },
      reps: { type: Number }
    }
  ]
});

module.exports = mongoose.model('Schedule', scheduleSchema);
