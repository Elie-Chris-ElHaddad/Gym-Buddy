
import React, { useEffect, useState } from "react";
import axios from "axios";
import ScheduleForm from "../components/ScheduleForm";
import ScheduleList from "../components/ScheduleList";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import "../Styles/Schedule.css";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
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

  // Fetch schedules from the database on component mount
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schedules");
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  // Fetch exercises based on bodyPart selection
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
          console.error("Error fetching exercises:", error);
          setExerciseOptionsList([]);
        }
      }
    };
    fetchExercises();
  }, [formData.bodyPart]);

  // Add new schedule to the database
  const addSchedule = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/schedules", formData);
      setSchedules([...schedules, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding schedule:", error);
    }
  };

  // Update a schedule in the database
  const updateSchedule = async () => {
    try {
      console.log(formData)
      const response = await axios.put(
        `http://localhost:5000/api/schedules/${formData._id}`,
        formData
      );
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === formData._id ? response.data : schedule
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  // Delete a schedule from the database
  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);
      setSchedules(schedules.filter((schedule) => schedule._id !== id));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({
      _id: null,
      title: "",
      date: "",
      time: "",
      bodyPart: "",
      exercises: [{ name: "", sets: "", reps: "" }]
    });
    setIsEditing(false);
  };

  // Handle exercise field updates
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

  const onShowMore = (id) => {
    setExpandedScheduleId(expandedScheduleId === id ? null : id);
  };

  const editSchedule = (schedule) => {
    setFormData(schedule);
    setIsEditing(true);
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
        expandedScheduleId={expandedScheduleId}
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

