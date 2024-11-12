import React from "react";

function ScheduleForm({
  formData,               // Form data containing schedule details like title, date, time, and exercises
  isEditing,              // Flag indicating if the form is for editing an existing schedule
  onFormChange,           // Callback to update the form data when an input changes
  onSubmit,               // Callback to handle form submission (add or update)
  addExerciseField,       // Function to add a new exercise field dynamically
  handleExerciseChange,   // Function to update the details (sets/reps) of each exercise
  exerciseOptionsList,    // List of available exercise options to populate the select dropdown
  setFormData             // Function to directly update the form data
}) {
  // Body parts to populate the "bodyPart" select field
  const bodyParts = ["chest", "back", "arms", "shoulders", "legs", "abs"];

  return (
    <div className="schedule-form">
      {/* Heading depending on whether the form is for adding or editing */}
      <h2>{isEditing ? "Edit Schedule" : "Add Schedule"}</h2>

      {/* Title input */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
      />

      {/* Date input */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => onFormChange({ ...formData, date: e.target.value })}
      />

      {/* Time input */}
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={(e) => onFormChange({ ...formData, time: e.target.value })}
      />

      {/* Body Part select input */}
      <select
        name="bodyPart"
        value={formData.bodyPart}
        onChange={(e) => setFormData({ ...formData, bodyPart: e.target.value })}
      >
        <option value="">Select Body Part</option>
        {/* Render options for body parts */}
        {bodyParts.map((part) => (
          <option key={part} value={part}>
            {part.charAt(0).toUpperCase() + part.slice(1)}  {/* Capitalize the first letter of each part */}
          </option>
        ))}
      </select>

      {/* Render the list of exercises */}
      {formData.exercises.map((exercise, index) => (
        <div key={index} className="exercise-form">
          {/* Select input for exercise */}
          <select
            value={exercise.name}
            onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
          >
            <option value="">Select Exercise</option>
            {/* Map over exercise options and create a dropdown */}
            {exerciseOptionsList.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
          
          {/* Input fields for sets and reps */}
          <div>
            <input
              type="number"
              placeholder="Sets"
              value={exercise.sets}
              onChange={(e) => handleExerciseChange(index, "sets", e.target.value)}
            />
            <input
              type="number"
              placeholder="Reps"
              value={exercise.reps}
              onChange={(e) => handleExerciseChange(index, "reps", e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* Button to add more exercise fields */}
      <button onClick={addExerciseField}>Add Exercise</button>

      {/* Submit button (Add or Update based on isEditing flag) */}
      <button onClick={onSubmit}>{isEditing ? "Update" : "Add"}</button>
    </div>
  );
}

export default ScheduleForm;
