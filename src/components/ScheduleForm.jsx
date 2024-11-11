// // src/components/ScheduleForm.js
// import React from "react";

// function ScheduleForm({ formData, isEditing, onFormChange, onSubmit }) {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onFormChange({ ...formData, [name]: value });
//   };

//   return (
//     <div className="schedule-form">
//       <h2>{isEditing ? "Edit Schedule" : "Add Schedule"}</h2>
//       <input
//         type="text"
//         name="title"
//         placeholder="Title"
//         value={formData.title}
//         onChange={handleChange}
//       />
//       <input
//         type="date"
//         name="date"
//         value={formData.date}
//         onChange={handleChange}
//       />
//       <input
//         type="time"
//         name="time"
//         value={formData.time}
//         onChange={handleChange}
//       />
//       <button onClick={onSubmit}>
//         {isEditing ? "Update" : "Add"}
//       </button>
//     </div>
//   );
// }

// export default ScheduleForm;
import React from "react";

function ScheduleForm({
  formData,
  isEditing,
  onFormChange,
  onSubmit,
  addExerciseField,
  handleExerciseChange,
  exerciseOptionsList,
  setFormData
}) {
  const bodyParts = ["chest", "back", "arms", "shoulders", "legs", "abs"];

  return (
    <div className="schedule-form">
      <h2>{isEditing ? "Edit Schedule" : "Add Schedule"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={(e) => onFormChange({ ...formData, date: e.target.value })}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={(e) => onFormChange({ ...formData, time: e.target.value })}
      />

      <select
        name="bodyPart"
        value={formData.bodyPart}
        onChange={(e) => setFormData({ ...formData, bodyPart: e.target.value })}
      >
        <option value="">Select Body Part</option>
        {bodyParts.map((part) => (
          <option key={part} value={part}>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </option>
        ))}
      </select>

      {formData.exercises.map((exercise, index) => (
        <div key={index} className="exercise-form">
          <select
            value={exercise.name}
            onChange={(e) => handleExerciseChange(index, "name", e.target.value)}
          >
            <option value="">Select Exercise</option>
            {exerciseOptionsList.map((option) => (
              <option key={option.id} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
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

      <button onClick={addExerciseField}>Add Exercise</button>
      <button onClick={onSubmit}>{isEditing ? "Update" : "Add"}</button>
    </div>
  );
}

export default ScheduleForm;
