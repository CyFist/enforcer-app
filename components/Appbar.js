"use client";

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
import { EnforcerIcon } from "lib/InstallPWA/Icons";

import ModeToggleButton from "./ModeToggleButton.tsx";

import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import Link from "next/link";
import { useRouter } from "next/router";

const pages = [
  { page: "Home", path: "/", icon: <HomeOutlinedIcon /> },
  { page: "Overview", path: "/Overview", icon: <AppsIcon /> },
  /*{ page: "Boldface", path: "/Boldface", icon: <FlightLandOutlinedIcon /> },*/
  { page: "Quiz", path: "/Quiz", icon: <QuizOutlinedIcon /> },
  {
    page: "Settings (in development)",
    path: "/Settings",
    icon: <SettingsOutlinedIcon />,
  },
];

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function CusomAppBar(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
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
                  selected={activeRoute(obj.path, router.pathname)}
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
    <ElevationScroll {...props}>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{ bgcolor: "background.default", backdropFilter: "blur(8px)" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{
              color: "inherit",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={toggleDrawer}
            disableRipple
          >
            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Drawer
            sx={{
              "& .MuiPaper-root": {
                p: "env(safe-area-inset-top) 0 0 env(safe-area-inset-left)",
                bgcolor: "background.appbar",
                backdropFilter: "blur(3px)",
              },
              "& .MuiBackdrop-root": {
                bgcolor: "rgba(0,0,0,0.5)",
              },
              //bgcolor: 'rgba(0,0,0,0.5)'
              //backdropFilter: 'blur(1px)'
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
    </ElevationScroll>
  );
}
