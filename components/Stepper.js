import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Step from '@mui/material/Step';
//import LinearProgress from '@mui/material/LinearProgress';
//import Typography from '@mui/material/Typography';
//import SvgIcon from '@mui/material/SvgIcon';
//import { useTheme } from '@mui/material/styles';
//import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import map from 'lodash/map';
import isNaN from 'lodash/isNaN';

export default function CustomStepper({ Total, leftover }) {
  const activeStep = isNaN(Total.length - leftover.length) ? 0 : Total.length - leftover.length;
  //const progress = (activeStep / Total.length) * 100;
  //const theme = useTheme();

  /*function LinearProgressWithLabel(props) {
    return (
      <>
        <Box sx={{ position: 'relative', alignItems: 'center' }} mb={5} mx={2}>
          <Box
            sx={{
              position: 'absolute',
              top: -5.5,
              left: 0,
              width: '95%',
              heigth: '100%'
            }}
          >
            <LinearProgress variant="determinate" {...props} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: -12.5,
              left: '95%',
              width: '95%',
              heigth: '100%'
            }}
          >
            <Typography width="5%" variant="body2" textAlign="right">
              {activeStep}/{Total.length}
            </Typography>
          </Box>
          <Box sx={{ height: 0 }} bgcolor="rgba(255,255,255,1)">
            <Box
              sx={{
                display: 'flex',
                height: 0,
                textAlign: 'center',
                alignItems: 'center',
                transform: `translateX( ${props.value - 98}%);`,
                transition: theme.transitions.create(['translateX'], {
                  duration: theme.transitions.duration.complex
                })
              }}
            >
              <Box width="100%"></Box>
              <Box minWidth={60} pr={0}>
                <SvgIcon
                  sx={{
                    fontSize: 60,
                    transform: 'rotate(90deg)',
                    color: 'primary.main',
                    stroke: 'white',
                    strokeWidth: '0.2',
                    w: 25,
                    h: 25
                  }}
                  viewBox="-2 -3 25 25"
                >
                  <path d="M10.1,18.34H7l0-.21c-.08-.54,0-.87.11-1L7.19,17l.2,0,2.35-.33c-.16-.82-.42-2.9-.42-3.14s0-2.71,0-3.51H8c-.12,1.34-.41,1.36-.55,1.37h0c-.19,0-.46,0-.6-1.55L.27,9.52l0-.25c.06-.73.31-.9.45-.93l6-.48a3.65,3.65,0,0,1,.3-2,.45.45,0,0,1,.32-.16h0a.39.39,0,0,1,.3.12A3.67,3.67,0,0,1,8,7.77l1.26-.07c0-.71,0-2.92,0-4.48A3.84,3.84,0,0,1,10.1.4a.4.4,0,0,1,.28-.16h.23A.4.4,0,0,1,10.9.4a3.84,3.84,0,0,1,.87,2.81c0,1.55,0,3.77,0,4.48L13,7.77a3.67,3.67,0,0,1,.29-1.94.38.38,0,0,1,.28-.12.46.46,0,0,1,.34.16,3.66,3.66,0,0,1,.3,2l6,.48c.18,0,.43.21.49.94l0,.25-6.53.3c-.14,1.55-.42,1.55-.59,1.55s-.45,0-.57-1.37H11.74c0,.8,0,3.27,0,3.51s-.26,2.32-.42,3.14l2.38.34h.11l.13.13c.15.18.19.51.11,1l0,.21H10.9l-.4,1Z" />
                </SvgIcon>
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    );
  }*/

  //<LinearProgressWithLabel variant="determinate" value={progress} />
  return (
    <Box display="flex">
      <Stepper
        sx={{
          '& .Mui-completed': {}
        }}
        activeStep={activeStep}
        connector={<></>}
        alternativeLabel
      >
        {map(Total, (value, key) => {
          return (
            <Step
              key={key}
              sx={{
                '& .MuiSvgIcon-root': {} //TODO change svgicon color
              }}
            >
              <StepLabel></StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
