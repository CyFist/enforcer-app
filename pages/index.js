import * as React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Inter } from "next/font/google";
import InstallBtn from "components/InstallButton";

const inter = Inter({ subsets: ["latin"] });

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(200, 200, 200, 0)",
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(200, 200, 200, 1)",
  },
};

const AnimatedIcon = () => (
  <Box
    component={motion.svg}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 131 100"
    sx={{
      pr: 3,
      width: "60vmin",
      overflow: "visible",
      stroke: "rgba(200, 200, 200, 1)",
      strokeWidth: 0.3,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    }}
  >
    <motion.path
      d="M22 0C19 5.5 18.3 14.5.1 14.6V33.1L16.9 32.8V100H37.9V81.3Q87.7 44.9 87.8 29.2C90.8 12.3 63.7 8.7 60.6 27.3L41.4 19.8C45.3 7.5 56.5 2 62.6 0ZM88.9 0H131V100H110V81.3H65.1Q109 51.5 108.6 33.2H93.449V14.7C99.349 14.9 103.449 13.5 106.049 12.1Q98.949 1.9 88.649 0Z"
      variants={icon}
      initial="hidden"
      animate="visible"
      transition={{
        default: {
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        },
        fill: {
          duration: 4,
          repeat: Infinity,
          repeatDelay: 3,
          ease: [1, 0, 0.8, 1],
        },
      }}
    />
  </Box>
);

export default function Home() {
  return (
    <>
      <main>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              overflow: "hidden",
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: 8, //'30px'
            }}
          >
            <Typography
              variant="h4"
              width={"40vmin"}
              sx={{ alignSelf: "flex-end", pl: 3, color: "white" }}
            >
              Best things inside...
              <InstallBtn sx={{ mr: 2 }} />
            </Typography>
            <AnimatedIcon />
          </Box>
        </Container>
      </main>
    </>
  );
}
