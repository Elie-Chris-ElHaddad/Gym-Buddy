import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import BodyPartImage from '../assets/assets/icons/body-part.png';
import EquipmentImage from '../assets/assets/icons/equipment.png';
import TargetImage from '../assets/assets/icons/target.png';

/**
 * Component for displaying detailed information about a specific exercise.
 * @param {Object} props - Component props.
 * @param {Object} props.exerciseDetail - The details of the exercise, including body part, gif URL, name, target, and equipment.
 */
export const Detail = ({ exerciseDetail }) => {
  // Destructure exercise details
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  // Additional detail information with corresponding icons
  const extraDetail = [
    { icon: BodyPartImage, name: bodyPart },
    { icon: TargetImage, name: target },
    { icon: EquipmentImage, name: equipment }
  ];

  return (
    <Stack
      gap="60px"
      sx={{
        flexDirection: { lg: 'row' }, // Layout changes for large screens
        p: '20px',
        alignItems: 'center'
      }}
    >
      {/* Display exercise GIF */}
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image" />

      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        {/* Exercise name */}
        <Typography variant="h3">{name}</Typography>

        {/* Exercise description */}
        <Typography variant="h6">
          {name} exercises help you build a strong core. They are one of the best ways to target your {target}, 
          which can improve your posture and stability. Strengthening your {target} will not only boost your mood but 
          also increase your energy levels, helping you feel more active throughout the day.
        </Typography>

        {/* Render additional exercise details (body part, target, and equipment) */}
        {extraDetail.map((item) => (
          <Stack key={item.name} direction="row" gap="24px" alignItems="center">
            {/* Icon button for each detail */}
            <Button
              sx={{
                background: "#fff2db",
                borderRadius: '50%',
                width: '100px',
                height: '100px'
              }}
            >
              <img src={item.icon} alt={bodyPart} style={{ width: '50px', height: '50px' }} />
            </Button>
            {/* Detail name (body part, target, equipment) */}
            <Typography textTransform="capitalize" variant="h5">{item.name}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Detail;
