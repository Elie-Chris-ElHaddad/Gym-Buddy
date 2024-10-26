// src/components/Schedule.js
import React, { useState, useEffect } from "react";
import scheduleData from "../data/schedule.json";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({ id: null, title: "", date: "", time: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load initial data from JSON file
    setSchedules(scheduleData);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new schedule
  const addSchedule = () => {
    setSchedules([...schedules, { ...formData, id: schedules.length + 1 }]);
    setFormData({ id: null, title: "", date: "", time: "" });
  };

  // Delete a schedule
  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  // Edit an existing schedule
  const editSchedule = (schedule) => {
    setFormData(schedule);
    setIsEditing(true);
  };

  // Update an existing schedule
  const updateSchedule = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === formData.id ? formData : schedule
      )
    );
    setFormData({ id: null, title: "", date: "", time: "" });
    setIsEditing(false);
  };

  return (
    <div>
      <h1>Schedule</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            <span>{schedule.title} - {schedule.date} at {schedule.time}</span>
            <button onClick={() => editSchedule(schedule)}>Edit</button>
            <button onClick={() => deleteSchedule(schedule.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>{isEditing ? "Edit Schedule" : "Add Schedule"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <button onClick={isEditing ? updateSchedule : addSchedule}>
        {isEditing ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default Schedule;
