import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Component for displaying an exercise card, which includes an image, body part, target, and exercise name.
 * @param {Object} props - Component props.
 * @param {Object} props.exercise - The exercise data including id, gifUrl, name, bodyPart, and target.
 * @returns {JSX.Element} The rendered ExerciseCard component.
 */
const ExerciseCard = ({ exercise }) => {
  return (
    // Link to navigate to the detailed exercise page using the exercise ID
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      
      {/* Display exercise GIF */}
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
      
      {/* Display buttons for body part and target */}
      <Stack direction="row">
        
        {/* Button for body part */}
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: "#ffa9a9",
            textDecoration: 'none',
            fontSize: '14px',
            borderRadius: '20px',
            textTransform: 'capitalize'
          }}
        >
          {exercise.bodyPart}
        </Button>
        
        {/* Button for target */}
        <Button
          sx={{
            ml: '21px',
            color: '#fff',
            background: "#fcc757",
            fontSize: '14px',
            borderRadius: '20px',
            textDecoration: 'none',
            textTransform: 'capitalize'
          }}
        >
          {exercise.target}
        </Button>
      </Stack>
      
      {/* Display exercise name */}
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        mt="11px"
        pb="10px"
        textTransform="capital"
        fontSize="22px"
        sx={{ textDecoration: 'none' }}
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
