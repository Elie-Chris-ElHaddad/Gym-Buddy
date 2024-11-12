import { Box } from '@mui/material';  // Import MUI Box component
import React, { useEffect, useState } from 'react';  // Import React hooks
import { useParams } from 'react-router-dom';  // Import useParams for extracting route parameters
import Detail from '../components/Detail';  // Import Detail component to display exercise details
import ExerciseVideos from '../components/ExerciseVideos';  // Import ExerciseVideos component to show video results
import SimilarExercises from '../components/SimilarExercises';  // Import SimilarExercises component to display similar exercises
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';  // Import utility functions for fetching data

const ExerciseDetail = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});  // State to store exercise details
  const [exerciseVideos, setExerciseVideos] = useState([]);  // State to store related exercise videos
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);  // State to store exercises targeting the same muscle group
  const [equipmentExercises, setEquipmentExercises] = useState([]);  // State to store exercises using the same equipment
  const { id } = useParams();  // Extract exercise ID from URL parameters
  
  useEffect(() => {
    // Function to fetch exercise data
    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';  // Base URL for Exercise DB API
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';  // Base URL for YouTube API

      // Fetch exercise details
      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);  // Store exercise details

      // Fetch YouTube videos related to the exercise
      const exerciseVideoData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideos(exerciseVideoData.contents);  // Store exercise videos

      // Fetch exercises targeting the same muscle group
      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);  // Store target muscle exercises

      // Fetch exercises using the same equipment
      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);  // Store equipment exercises
    };

    fetchExercisesData();  // Call the fetch function

  }, [id]);  // Dependency on exercise ID to fetch new data when the ID changes

  return (
    <Box>
      {/* Render Detail component with exercise details */}
      <Detail exerciseDetail={exerciseDetail} />
      
      {/* Render ExerciseVideos component with fetched videos and exercise name */}
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
      
      {/* Render SimilarExercises component with exercises targeting the same muscle and using the same equipment */}
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
  );
};

export default ExerciseDetail;
