import { Box, Typography } from "@mui/material"; // Importing Box and Typography components from MUI for layout and text styling
import React, { useContext } from "react"; // Importing React and useContext hook
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"; // Importing scroll menu components for horizontal scroll functionality
import LeftArrowIcon from "../assets/assets/icons/left-arrow.png"; // Importing left arrow icon for scrolling
import RightArrowIcon from "../assets/assets/icons/right-arrow.png"; // Importing right arrow icon for scrolling
import BodyPart from "./BodyPart"; // Importing BodyPart component to display individual body part items
import ExerciseCard from './ExerciseCard'; // Importing ExerciseCard component to display individual exercises

/**
 * Component for the right arrow button, which scrolls the menu to the right.
 * Uses the scrollNext method from VisibilityContext to perform the scroll action.
 */
const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => {
      console.log("Scroll Next triggered");
      scrollNext();
    }} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

/**
 * Component for the left arrow button, which scrolls the menu to the left.
 * Uses the scrollPrev method from VisibilityContext to perform the scroll action.
 */

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
     
    return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};


/**
 * HorizontalScrollbar component for displaying items in a horizontally scrollable container.
 * Includes dynamic content based on the props `data`, `bodyPart`, and `isBodyParts`.
 * 
 * @param {Array} data - Array of items to display in the scrollable menu.
 * @param {string} bodyPart - Selected body part, if applicable.
 * @param {function} setBodyPart - Function to update the selected body part.
 * @param {boolean} isBodyParts - Determines if items are body parts or exercises.
 * 
 * @returns {JSX.Element} - Rendered horizontal scroll menu with either BodyPart or ExerciseCard components.
 */
const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {
  return (
    <div className="scroll-container">
    <ScrollMenu RightArrow={RightArrow} LeftArrow={LeftArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {bodyPart ? <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
          : <ExerciseCard exercise={item}/>}
        </Box>
      ))}
    </ScrollMenu>
  </div>
  );
};


export default HorizontalScrollbar; // Exports the component for use in other parts of the app
