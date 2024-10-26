import { Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import Icon from "../assets/assets/icons/gym.png";

const BodyPart = ({item, setBodyPart, bodyPart}) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      sx={{
          borderTop: bodyPart===item ? `4px solid ${red[500]}` : "",
          backgroundColor: "#fff",
          borderBottomLeftRadius: "20px",
          width:"270px",
          height:"280px",
          cursor: "pointer",
          gap:"47px"}}
    >
      <img
        src={Icon}
        alt="dumbell"
        style={{ width: "100px", height: "100px" }}
        onClick={() => {
          setBodyPart(item);
          window.scrollTo({top:1800 ,left:100,behavior:'smooth'});
        }}
      />
      <Typography fontSize="24px" fontWeight="bold" color="#3A1212" textTransform="capitalize">{item}</Typography>
    </Stack>
  );
};

export default BodyPart;
