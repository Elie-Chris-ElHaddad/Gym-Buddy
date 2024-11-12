import React, { useEffect, useState } from "react";  // Importing React and hooks
import axios from "axios";  // Importing Axios for API requests
import ScheduleForm from "../components/ScheduleForm";  // Importing the ScheduleForm component for creating and editing schedules
import ScheduleList from "../components/ScheduleList";  // Importing the ScheduleList component to display schedules
import { fetchData, exerciseOptions } from "../utils/fetchData";  // Importing utility functions for fetching exercise data
import "../Styles/Schedule.css";  // Importing styles for the Schedule page

function Schedule() {
  const [schedules, setSchedules] = useState([]);  // State for holding the list of schedules
  const [formData, setFormData] = useState({  // State for holding form data
    _id: null,
    title: "",
    date: "",
    time: "",
    bodyPart: "",
    exercises: [{ name: "", sets: "", reps: "" }]  // Initial exercise structure with default empty values
  });
  const [isEditing, setIsEditing] = useState(false);  // State to track if we're editing an existing schedule
  const [searchQuery, setSearchQuery] = useState("");  // State for search query input
  const [exerciseOptionsList, setExerciseOptionsList] = useState([]);  // State to hold the list of exercises based on selected body part
  const [expandedScheduleId, setExpandedScheduleId] = useState(null);  // State to control which schedule's details are expanded

  // Fetch schedules from the database when the component mounts
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schedules");  // Fetch schedules from the API
        setSchedules(response.data);  // Update state with the fetched schedules
      } catch (error) {
        console.error("Error fetching schedules:", error);  // Handle errors
      }
    };
    fetchSchedules();  // Fetch schedules
  }, []);  // Empty dependency array to run the effect only once on mount

  // Fetch exercises based on bodyPart selection whenever bodyPart changes
  useEffect(() => {
    const fetchExercises = async () => {
      if (formData.bodyPart) {
        try {
          const exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${formData.bodyPart}`,
            exerciseOptions
          );
          setExerciseOptionsList(Array.isArray(exercisesData) ? exercisesData : []);  // Update exercise list
        } catch (error) {
          console.error("Error fetching exercises:", error);  // Handle errors
          setExerciseOptionsList([]);  // Clear exercise options on error
        }
      }
    };
    fetchExercises();  // Fetch exercises based on selected body part
  }, [formData.bodyPart]);  // Trigger the effect whenever bodyPart changes

  // Add a new schedule to the database
  const addSchedule = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/schedules", formData);  // POST request to add a new schedule
      setSchedules([...schedules, response.data]);  // Add the new schedule to the existing list
      resetForm();  // Reset the form after adding
    } catch (error) {
      console.error("Error adding schedule:", error);  // Handle errors
    }
  };

  // Update an existing schedule in the database
  const updateSchedule = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/schedules/${formData._id}`,
        formData
      );  // PUT request to update the schedule
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === formData._id ? response.data : schedule  // Update the schedule in the list
        )
      );
      resetForm();  // Reset the form after updating
    } catch (error) {
      console.error("Error updating schedule:", error);  // Handle errors
    }
  };

  // Delete a schedule from the database
  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/schedules/${id}`);  // DELETE request to remove the schedule
      setSchedules(schedules.filter((schedule) => schedule._id !== id));  // Remove deleted schedule from the list
    } catch (error) {
      console.error("Error deleting schedule:", error);  // Handle errors
    }
  };

  // Reset the form data
  const resetForm = () => {
    setFormData({
      _id: null,
      title: "",
      date: "",
      time: "",
      bodyPart: "",
      exercises: [{ name: "", sets: "", reps: "" }]  // Reset to initial state
    });
    setIsEditing(false);  // Reset editing flag
  };

  // Handle changes in exercise fields (name, sets, reps)
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = formData.exercises.map((exercise, i) =>
      i === index ? { ...exercise, [field]: value } : exercise  // Update the specified exercise field
    );
    setFormData({ ...formData, exercises: updatedExercises });  // Update the formData state
  };

  // Add a new exercise field to the form
  const addExerciseField = () => {
    setFormData({
      ...formData,
      exercises: [...formData.exercises, { name: "", sets: "", reps: "" }]  // Add a new exercise to the list
    });
  };

  // Handle showing more or less details for a schedule
  const onShowMore = (id) => {
    setExpandedScheduleId(expandedScheduleId === id ? null : id);  // Toggle the expanded schedule
  };

  // Edit an existing schedule by setting the form data
  const editSchedule = (schedule) => {
    setFormData(schedule);  // Set the form data to the schedule to edit
    setIsEditing(true);  // Set editing mode to true
  };

  // Filter schedules by title based on the search query
  const filteredSchedules = schedules.filter((schedule) =>
    schedule.title.toLowerCase().includes(searchQuery.toLowerCase())  // Filter by title
  );

  return (
    <div className="schedule-container">
      <h1>Schedule</h1>
      {/* Search input for filtering schedules by title */}
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
        className="search-input"
      />

      {/* Schedule list component, passing filtered schedules */}
      <ScheduleList
        schedules={filteredSchedules}
        onEdit={editSchedule}  // Edit schedule handler
        onDelete={deleteSchedule}  // Delete schedule handler
        onShowMore={onShowMore}  // Show more schedule details handler
        expandedScheduleId={expandedScheduleId}  // ID of the expanded schedule
      />

      {/* Schedule form for adding/editing schedules */}
      <ScheduleForm
        formData={formData}
        isEditing={isEditing}
        onFormChange={(data) => setFormData(data)}  // Handle form data changes
        onSubmit={isEditing ? updateSchedule : addSchedule}  // Submit the form (add or update)
        addExerciseField={addExerciseField}  // Add exercise field handler
        handleExerciseChange={handleExerciseChange}  // Handle exercise field changes
        exerciseOptionsList={exerciseOptionsList}  // List of exercises for the selected body part
        setFormData={setFormData}  // Set form data directly
      />
    </div>
  );
}

export default Schedule;
