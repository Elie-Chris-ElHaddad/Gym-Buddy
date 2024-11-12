import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

/**
 * Component to display exercise videos for a specific exercise.
 * @param {Object} props - Component props.
 * @param {Array} props.exerciseVideos - Array of exercise video objects.
 * @param {string} props.name - Name of the exercise to display.
 * @returns {JSX.Element} The rendered ExerciseVideos component.
 */
const ExerciseVideos = ({ exerciseVideos, name }) => {

  // Log the exercise videos array to console (for debugging)
  console.log(exerciseVideos);

  // Show loading message if exerciseVideos array is empty
  if (!exerciseVideos.length) return 'Loading...';

  return (
    <Box sx={{ marginTop: { lg: '200px', xs: '20px' } }} p="20px">
      
      {/* Section title with exercise name highlighted */}
      <Typography variant="h4" mb="33px">
        Watch <span style={{ color: "#ff2625", textTransform: "capitalize" }}>{name}</span> exercises videos
      </Typography>
      
      {/* Container to wrap and display each video in a grid layout */}
      <Stack 
        justifyContent="flex-start" 
        flexWrap="wrap" 
        alignItems="center"
        sx={{ flexDirection: { lg: "row" }, gap: { lg: '110px', xs: '0' } }}
      >
        {/* Loop through the exercise videos array and render a link to each video */}
        {exerciseVideos?.slice(0, 6).map((item, index) => (
          <a 
            key={index} 
            className="exercise-video" 
            href={`https://www.youtube.com/watch?v=${item.video.videoId}`} 
            target="_blank" 
            rel="noreferrer"
          >
            {/* Display thumbnail for each video */}
            <img src={item.video.thumbnails[0].url} alt={item.video.title} />
            
            {/* Box containing video title and channel name */}
            <Box>
              <Typography variant="h4" color="#000">
                {item.video.title}
              </Typography>
              <Typography variant="h5" color="#000">
                {item.video.channelName}
              </Typography>
            </Box>
          </a>
        ))}
      </Stack>
    </Box>
  );
};

export default ExerciseVideos;
