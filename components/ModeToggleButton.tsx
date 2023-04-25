import React, { ReactElement } from "react";
import { useRecoilState } from "recoil";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";

import { useColorScheme } from "@mui/material/styles";

function DynamicIcon({ mode }: DynamicIconProps): ReactElement {
  if (mode === "dark") return <LightModeOutlinedIcon fontSize="large" />;
  return <BedtimeOutlinedIcon fontSize="large" />;
}

function ModeToggleButton(): ReactElement {
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Button
      sx={{
        mt: "-1px",
        ml: "-1px",
        px: 2,
        py: 1.5,
      }}
      disableRipple
      variant="outlined"
      style={{ textTransform: "none" }}
      color="inherit"
      size="medium"
      onClick={toggleMode}
      startIcon={<DynamicIcon mode={mode} />}
    >
      <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
        Switch to {mode === "dark" ? "light" : "dark"} mode
      </Typography>
    </Button>
  );
}

export default ModeToggleButton;
