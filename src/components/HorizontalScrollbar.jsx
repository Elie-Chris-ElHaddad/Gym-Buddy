import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import LeftArrowIcon from "../assets/assets/icons/left-arrow.png";
import RightArrowIcon from "../assets/assets/icons/right-arrow.png";
import BodyPart from "./BodyPart";
import ExerciseCard from './ExerciseCard';

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className="left-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className="right-arrow">
      <img src={LeftArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {
  return (
    <ScrollMenu RightArrow={RightArrow} LeftArrow={LeftArrow}>
      {data.map((item) => (
        <Box
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
          m="0 40px"
        >
          {isBodyParts ? <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />
          : <ExerciseCard exercise={item}/>
          }
        </Box>
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollbar;
