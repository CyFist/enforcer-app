"use client";

import Button from "@mui/material/Button";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import FlightLandOutlinedIcon from "@mui/icons-material/FlightLandOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { EnforcerIcon } from "./icons";

import ModeToggleButton from "./ModeToggleButton.tsx";

import PropTypes from "prop-types";

import Link from "next/link";
import { usePathname } from "next/navigation";

const pages = [
  { page: "Home", path: "/", icon: <HomeOutlinedIcon /> },
  { page: "Overview", path: "/Overview", icon: <AppsIcon /> },
  { page: "Boldface", path: "/Boldface", icon: <FlightLandOutlinedIcon /> },
  { page: "Quiz", path: "/Quiz", icon: <QuizOutlinedIcon /> },
  {
    page: "Settings (in development)",
    path: "/Settings",
    icon: <SettingsOutlinedIcon />,
  },
  { page: "Test", path: "/Test", icon: <HomeOutlinedIcon /> },
  { page: "Test2", path: "/Test2", icon: <HomeOutlinedIcon /> },
];

export default function TopBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const pathname = usePathname();
  const activeRoute = (routeName, currentRoute) => {
    return routeName === currentRoute ? true : false;
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const DrawItems = () => {
    return (
      <Box
        width={300}
        height={1}
        px={1}
        display="flex"
        flexWrap="wrap"
        alignContent="space-between"
        role="presentation"
      >
        <Box width={1}>
          <IconButton
            sx={{
              color: "inherit",
              mt: 1,
              ml: 1,
              "&:hover": {
                backgroundColor: "action.hover",
                transform: "scale(1.1)",
              },
            }}
            onClick={toggleDrawer}
            disableRipple
          >
            <MenuOpenIcon />
          </IconButton>
          <List sx={{ px: 0, pt: 0 }}>
            {pages.map((obj, index) => (
              <ListItem key={obj.page} disablePadding>
                <ListItemButton
                  component={Link}
                  href={obj.path}
                  selected={activeRoute(obj.path, pathname)}
                  onClick={toggleDrawer}
                  disableRipple
                  disableTouchRipple
                  sx={{
                    "&.Mui-selected": {
                      "&:hover": { backgroundColor: "primary.dark" },
                      backgroundColor: "primary.main",
                    },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    {obj.icon}
                  </ListItemIcon>
                  <ListItemText primary={obj.page} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          display="flex"
          width={1}
          height={80}
        >
          <ModeToggleButton />
        </Box>
      </Box>
    );
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      sx={{ bgcolor: "background.appbar", backdropFilter: "blur(8px)" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{
            "&:hover": { transform: "scale(1.1)" },
          }}
          onClick={toggleDrawer}
          disableRipple
        >
          {<MenuIcon />}
        </IconButton>
        <Drawer
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "background.appbar",
              backdropFilter: "blur(3px)",
            },
            "& .MuiBackdrop-root": {
              bgcolor: "rgba(0,0,0,0.5)",
            },
          }}
          anchor={"left"}
          open={isOpen}
          onClose={toggleDrawer}
        >
          <DrawItems />
        </Drawer>
        <EnforcerIcon sx={{ ml: 2, fontSize: 40 }} />
        <Typography
          variant="h5"
          component="div"
          sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}
        >
          Enforcer App
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
