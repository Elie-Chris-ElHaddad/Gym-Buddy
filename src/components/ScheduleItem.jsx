// src/components/ScheduleItem.js
import React from "react";

function ScheduleItem({ schedule, onEdit, onDelete, onShowMore }) {
  return (
    <li className="schedule-item">
      <span>{schedule.title} - {schedule.date} at {schedule.time}</span>
      <button className="edit-btn" onClick={() => onEdit(schedule)}>Edit</button>
      <button className="delete-btn" onClick={() => onDelete(schedule.id)}>Delete</button>
      <button className="show-more-btn" onClick={() => onShowMore(schedule.id)}>test</button>    
      </li>
  );
}

export default ScheduleItem;
