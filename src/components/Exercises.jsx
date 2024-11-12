import { Box, Stack, Typography } from '@mui/material/';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import ExerciseCard from './ExerciseCard';
import { exerciseOptions, fetchData } from '../utils/fetchData';

/**
 * Component to display and paginate a list of exercises based on the selected body part.
 * @param {Object} props - Component props.
 * @param {Array} props.exercises - Array of exercise objects to display.
 * @param {Function} props.setExercises - Function to update exercises data.
 * @param {string} props.bodyPart - Selected body part to filter exercises by.
 * @returns {JSX.Element} The rendered Exercises component.
 */
const Exercises = ({ exercises, setExercises, bodyPart }) => {
  
  // State to handle current page in pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Number of exercises to display per page
  const exercisesPerPage = 9;
  
  // Calculate the indexes for slicing exercises based on pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  // Slice the exercises array for current page view
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  /**
   * Handles page change in pagination, updating current page and scrolling to the top.
   * @param {object} e - The event object.
   * @param {number} value - The selected page number.
   */
  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  // Fetches exercises data based on selected body part
  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      
      // Fetch all exercises or filter by body part
      if (bodyPart === 'all') {
        exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
      
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  return (
    // Main container for exercises with padding and margin
    <Box id="exercises" sx={{ mt: { lg: '110px' } }} mt="50px" p="20px">
      
      {/* Title for exercise section */}
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      
      {/* Container for displaying exercises in a responsive grid */}
      <Stack direction="row" sx={{ gap: { lg: '110px', xs: '50px' } }} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </Stack>
      
      {/* Pagination component to navigate between pages */}
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / 9)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
