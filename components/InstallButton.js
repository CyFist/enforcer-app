import * as React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useReactPWAInstall } from "lib/InstallPWA/Index";
import appLogo from "../public/icons/icon-192x192.png";

const InstallBtn = (props) => {
  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const handleClick = () => {
    if (supported() && !isInstalled()) {
      pwaInstall({
        title: "Install Enforcer App",
        logo: appLogo,
        features: (
          <ul>
            <li>Boldface & Quiz Weather & many more to come...</li>
            <li>oh and it also works offline</li>
          </ul>
        ),
        //description: 'Our very own Enforcer App. '
      })
        .then(() =>
          console.log(
            "App installed successfully or instructions for install shown"
          )
        )
        .catch(() => console.log("User opted out from installing"));
    }
  };

  return (
    <>
      {supported() && !isInstalled() && (
        <Button variant="contained" onClick={handleClick} {...props}>
          <Typography>Install</Typography>
        </Button>
      )}
    </>
  );
};

export default InstallBtn;
