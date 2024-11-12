import { Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import Icon from "../assets/assets/icons/gym.png";

/**
 * Component for displaying a selectable body part card.
 * @param {Object} props - Component props.
 * @param {string} props.item - The name of the body part to display.
 * @param {function} props.setBodyPart - Function to set the selected body part.
 * @param {string} props.bodyPart - Currently selected body part.
 */
const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className="bodyPart-card"
      // Define the style for the body part card based on whether it is selected
      sx={{
        borderTop: bodyPart === item ? `4px solid ${red[500]}` : "",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px"
      }}
    >
      {/* Image representing the body part, with an onClick handler */}
      <img
        src={Icon}
        alt="dumbbell"
        style={{ width: "100px", height: "100px" }}
        onClick={() => {
          setBodyPart(item);
          window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
        }}
      />
      {/* Display the name of the body part */}
      <Typography
        fontSize="24px"
        fontWeight="bold"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
