import React from "react";
import "../Styles/Schedule.css";  // Import custom styling for the schedule list

// ScheduleList component receives schedules, onEdit, onDelete, onShowMore, and expandedScheduleId as props
function ScheduleList({ schedules, onEdit, onDelete, onShowMore, expandedScheduleId }) {
  return (
    <div className="schedule-list">
      {/* Map over the schedules and display each schedule's title, date, and time */}
      {schedules.map((schedule) => (
        <div key={schedule.title} className="schedule-item">
          
          {/* Schedule title */}
          <h3>{schedule.title}</h3>
          
          {/* Display the date and time for the schedule */}
          <p>{schedule.date} at {schedule.time}</p>

          {/* Button to toggle between "Show More" and "Show Less" */}
          <button className="show-more-btn" onClick={() => onShowMore(schedule.id)}>
            {/* Toggle button text depending on whether the schedule is expanded or not */}
            {expandedScheduleId === schedule.id ? 'Show Less' : 'Show More'}
          </button>

          {/* Show more details if this schedule is expanded */}
          {expandedScheduleId === schedule.id && (
            <div className="schedule-details">
              {/* Display body part */}
              <p>Body Part: {schedule.bodyPart}</p>
              
              {/* Display exercises in the schedule */}
              <h4>Exercises</h4>
              <ul>
                {/* List each exercise, including the number of sets and reps */}
                {schedule.exercises.map((exercise) => (
                  <li key={exercise.name}>
                    {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Edit button */}
          <button className="edit-btn" onClick={() => onEdit(schedule)}>
            Edit
          </button>

          {/* Delete button */}
          <button className="delete-btn" onClick={() => onDelete(schedule._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ScheduleList;
