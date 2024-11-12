import React from 'react';
import { Box, Stack, Typography } from '@mui/material';  // Importing MUI components
import HorizontalScrollbar from './HorizontalScrollbar';  // Import custom HorizontalScrollbar component
import Loader from './Loader';  // Import Loader component

// SimilarExercises component receives targetMuscleExercises and equipmentExercises as props
const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: '100px', xs: '0' } }}>
      {/* Title for exercises targeting the same muscle group */}
      <Typography variant="h3" mb={5}>Exercises that target the same muscle group</Typography>
      
      {/* HorizontalScrollbar for exercises targeting the same muscle group */}
      <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
        {/* Show HorizontalScrollbar if exercises are available, otherwise show Loader */}
        {targetMuscleExercises.length ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Loader />}
      </Stack>
      
      {/* Title for exercises using the same equipment */}
      <Typography variant="h3" mb={5}>Exercises that use the same equipment</Typography>
      
      {/* HorizontalScrollbar for exercises using the same equipment */}
      <Stack direction="row" sx={{ p: '2', position: 'relative' }}>
        {/* Show HorizontalScrollbar if exercises are available, otherwise show Loader */}
        {equipmentExercises.length ? <HorizontalScrollbar data={equipmentExercises} /> : <Loader />}
      </Stack>
    </Box>
  );
};

export default SimilarExercises;
