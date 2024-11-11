import React, { useEffect, useState } from "react";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleList from "../components/ScheduleList";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import scheduleData from "../data/schedule.json";
import "../Styles/Schedule.css";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    date: "",
    time: "",
    bodyPart: "",
    exercises: [{ name: "", sets: "", reps: "" }]
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [exerciseOptionsList, setExerciseOptionsList] = useState([]);
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);

  useEffect(() => {
    const storedSchedules = JSON.parse(localStorage.getItem("schedules"));
    if (storedSchedules && storedSchedules.length > 0) {
      setSchedules(storedSchedules);
    } else {
      setSchedules(scheduleData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }, [schedules]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (formData.bodyPart) {
        try {
          const exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${formData.bodyPart}`,
            exerciseOptions
          );
          setExerciseOptionsList(Array.isArray(exercisesData) ? exercisesData : []);
        } catch (error) {
          console.error('Error fetching exercises:', error);
          setExerciseOptionsList([]);
        }
      }
    };
    fetchExercises();
  }, [formData.bodyPart]);

  const addSchedule = () => {
    setSchedules([...schedules, { ...formData, id: schedules.length + 1 }]);
    resetForm();
  };

  const onShowMore = (id) => {
    setExpandedScheduleId(expandedScheduleId === id ? null : id);
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const editSchedule = (schedule) => {
    setFormData(schedule);
    setIsEditing(true);
  };

  const updateSchedule = () => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === formData.id ? formData : schedule
      )
    );
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      date: "",
      time: "",
      bodyPart: "",
      exercises: [{ name: "", sets: "", reps: "" }]
    });
    setIsEditing(false);
  };

  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = formData.exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const addExerciseField = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: "", sets: "", reps: "" }]
    });
  };

  const filteredSchedules = schedules.filter((schedule) =>
    schedule.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="schedule-container">
      <h1>Schedule</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ScheduleList
        schedules={filteredSchedules}
        onEdit={editSchedule}
        onDelete={deleteSchedule}
        onShowMore={onShowMore}
        expandedScheduleId={expandedScheduleId} // Pass expandedScheduleId here
      />

      <ScheduleForm
        formData={formData}
        isEditing={isEditing}
        onFormChange={(data) => setFormData(data)}
        onSubmit={isEditing ? updateSchedule : addSchedule}
        addExerciseField={addExerciseField}
        handleExerciseChange={handleExerciseChange}
        exerciseOptionsList={exerciseOptionsList}
        setFormData={setFormData}
      />
    </div>
  );
}

export default Schedule;
