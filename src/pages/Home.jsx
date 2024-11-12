import React, { useState } from "react";  // Importing React and useState hook
import { Box } from "@mui/material";  // Importing MUI Box component for layout

import Exercises from "../components/Exercises";  // Importing the Exercises component to display exercises
import HeroBanner from "../components/HeroBanner";  // Importing the HeroBanner component for page header
import SearchExercises from "../components/SearchExercises";  // Importing the SearchExercises component for searching exercises

const Home = () => {
  // State to manage exercises data and body part selection
  const [exercises, setExercises] = useState([]);  // Store fetched exercises
  const [bodyPart, setBodyPart] = useState("all");  // Store selected body part, default is "all"

  return (
    <Box>
      {/* Render the HeroBanner component */}
      <HeroBanner />
      
      {/* Render the SearchExercises component, passing necessary props */}
      <SearchExercises
        setExercises={setExercises}  // Passing setExercises to update exercises state
        bodyPart={bodyPart}  // Passing the bodyPart state
        setBodyPart={setBodyPart}  // Passing setBodyPart to allow updates to bodyPart state
      />

      {/* Render the Exercises component, passing exercises data and body part selection */}
      <Exercises
        setExercises={setExercises}  // Passing setExercises to update exercises state (in case of further search or filter)
        bodyPart={bodyPart}  // Passing the selected bodyPart
        exercises={exercises}  // Passing the exercises data to display
      />
    </Box>
  );
};

export default Home;
