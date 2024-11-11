import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import HorizontalScrollbar from "./HorizontalScrollbar";

import { exerciseOptions, fetchData } from "../utils/fetchData";

const SearchExercises = ( {setExercises,
  bodyPart,setBodyPart}) => {
  
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () =>{
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all' , ...bodyPartsData]);

    }

    fetchExercisesData();
  }, [])
  
  
  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          // exercise.name.toLowerCase().includes(search) ||
          // exercise.target.toLowerCase().includes(search) ||
          // exercise.equipement.toLowerCase().includes(search) ||
          // exercise.bodyPart.toLowerCase().includes(search)
          (exercise.name && exercise.name.toLowerCase().includes(search)) ||
      (exercise.target && exercise.target.toLowerCase().includes(search)) ||
      (exercise.equipment && exercise.equipment.toLowerCase().includes(search)) ||
      (exercise.bodyPart && exercise.bodyPart.toLowerCase().includes(search))
      );
      setSearch("");
      setExercises(searchedExercises);
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
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
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "white",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          type="text"
        />
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
          onClick={handleSearch}
        >
          search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width:'100%', p:'20px'}}>
          <HorizontalScrollbar data={bodyParts}
          bodyPart={bodyPart} setBodyPart={setBodyPart} isBodyParts/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
