import React from "react";
import "../Styles/Schedule.css";

function ScheduleList({ schedules, onEdit, onDelete, onShowMore, expandedScheduleId }) {
  return (
    <div className="schedule-list">
      {schedules.map((schedule) => (
        <div key={schedule.title} className="schedule-item">
          <h3>{schedule.title}</h3>
          <p>{schedule.date} at {schedule.time}</p>

          <button className="show-more-btn" onClick={() => onShowMore(schedule.id)}>
            {expandedScheduleId === schedule.id ? 'Show Less' : 'Show More'}
          </button>

          {expandedScheduleId === schedule.id && (
            <div className="schedule-details">
              <p>Body Part: {schedule.bodyPart}</p>
              <h4>Exercises</h4>
              <ul>
                {schedule.exercises.map((exercise) => (
                  <li key={exercise.name}>
                    {exercise.name} - {exercise.sets} sets, {exercise.reps} reps
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button className="edit-btn" onClick={() => onEdit(schedule)}>Edit</button>
          <button className="delete-btn" onClick={() => onDelete(schedule._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ScheduleList;
