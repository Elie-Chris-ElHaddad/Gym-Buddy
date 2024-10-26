import { Button, Stack, Typography } from '@mui/material';
import React from 'react';
import BodyPartImage from '../assets/assets/icons/body-part.png';
import EquipmentImage from '../assets/assets/icons/equipment.png';
import TargetImage from '../assets/assets/icons/target.png';
import ExerciseDetail from '../pages/ExerciseDetail';

export const Detail = ({exerciseDetail}) => {
    const {bodyPart, gifUrl,name,target,equipment} = exerciseDetail;
    const extraDetail = [
        {
            icon : BodyPartImage,
            name:bodyPart,
        },
        {
            icon : TargetImage,
            name:target,
        },
        {
            icon : EquipmentImage,
            name:equipment,
        }
    ]
  return (
    <Stack gap="60px" sx={{flexDirection:{lg:'row'},p:'20px',alignItems:'center'}}>
        <img src={gifUrl} alt={name} loading="lazy" className='detail-image'/>
        <Stack sx={{gap:{lg:'35px',xs:'20px'}}}>
            <Typography variant="h3">{name}</Typography>
            <Typography variant="h6">{name}{' '} exercises help you build a strong core. 
                They are one of the best ways to target your {target}, 
                which can improve your posture and stability. Strengthening your {""}
                {target} will not only boost your mood but also increase your energy 
                levels, helping you feel more active throughout the day.</Typography>
        
        {extraDetail.map((item)=>(
            <Stack key={item.name} direction="row" gap="24px" alignItems="center">
                <Button sx={{background:"#fff2db", borderRadius:'50%',width:'100px',height:'100px'}}><img src={item.icon} alt={bodyPart} style={{width:'50px',height:"50px"}}/></Button>
                <Typography textTransform=" capitalize" variant="h5">{item.name}</Typography>
            </Stack>
        ))}
        </Stack>
    </Stack>
  )
}
export default Detail;