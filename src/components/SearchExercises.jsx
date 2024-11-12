import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";  // Import HorizontalScrollbar component
import { exerciseOptions, fetchData } from "../utils/fetchData";  // Import fetchData and exerciseOptions

// SearchExercises component receives setExercises, bodyPart, and setBodyPart as props
const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  
  // State variables to manage search input and body parts data
  const [search, setSearch] = useState("");  
  const [bodyParts, setBodyParts] = useState([]); 

  // useEffect hook to fetch body parts when the component mounts
  useEffect(() => {
    const fetchExercisesData = async () => {
      // Fetch body parts data from the API
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      // Update body parts state by prepending 'all' to the list of body parts
      setBodyParts(['all', ...bodyPartsData]);
    }

    // Call the function to fetch body parts
    fetchExercisesData();
  }, []); // Empty dependency array means it will run once on mount
  
  // handleSearch function filters exercises based on the search input
  const handleSearch = async () => {
    if (search) {
      // Fetch exercises data from the API
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises", 
        exerciseOptions
      );

      // Filter exercises based on the search input for name, target, equipment, and body part
      const searchedExercises = exercisesData.filter(
        (exercise) =>
          (exercise.name && exercise.name.toLowerCase().includes(search)) ||
          (exercise.target && exercise.target.toLowerCase().includes(search)) ||
          (exercise.equipment && exercise.equipment.toLowerCase().includes(search)) ||
          (exercise.bodyPart && exercise.bodyPart.toLowerCase().includes(search))
      );

      // Clear the search field and update the exercises state with filtered results
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      {/* Title section */}
      <Typography
        fontWeight={700}
        fontSize="40px"
        sx={{ lg: "44px", xs: "30px" }}
        mb="50px"
        mt="190px"
        textAlign="center"
      >
        Our Wide List <br />
        Of Exercises
      </Typography>
      
      {/* Search input box */}
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "white",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}  // Bind the input value to the search state
          onChange={(e) => setSearch(e.target.value.toLowerCase())}  // Update the search state on change
          placeholder="Search Exercises"
          type="text"
        />
        
        {/* Search button */}
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}  // Trigger handleSearch when clicked
        >
          search
        </Button>
      </Box>
      
      {/* HorizontalScrollbar to display the list of body parts */}
      <Box sx={{position: 'relative', width:'100%', p:'20px'}}>
        <HorizontalScrollbar 
          data={bodyParts}  // Pass body parts data to HorizontalScrollbar
          bodyPart={bodyPart} 
          setBodyPart={setBodyPart} 
          isBodyParts  // Set flag to true for body parts selection
        />
      </Box>
    </Stack>
  );
};

export default SearchExercises;
