import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import map from "lodash/map";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  SelectedQn_LMSelector,
  SelectedOption_LMSelector,
} from "../state/quiz_LMState";

export const OptionsGroup = () => {
  const { shuffleOptions, answer } = useRecoilValue(SelectedQn_LMSelector);
  const [selected, setSelected] = useRecoilState(SelectedOption_LMSelector);
  const opts = map(shuffleOptions, (value, key) => {
    return (
      <ToggleButton
        disableRipple
        sx={{
          "&.Mui-selected": {
            bgcolor: "primary.main",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          },
        }}
        style={{ textTransform: "none" }}
        key={key}
        value={key}
        aria-label={key}
      >
        <Typography variant="subtitle2" display="block">
          {value}
        </Typography>
      </ToggleButton>
    );
  });

  return (
    <ToggleButtonGroup
      sx={{
        display: "grid",
        gridTemplateRows: "auto auto auto auto",
        gridTemplateColumns: "auto",
        gridGap: "10px",

        "& .MuiToggleButtonGroup-grouped": {
          border: "1px solid !important",
          borderRadius: 24,
          "&:not(:last-of-type)": {
            borderRadius: 24,
          },
          "&:not(:first-of-type)": {
            borderRadius: 24,
          },
        },
      }}
      fullWidth
      orientation="vertical"
      value={selected.options}
      exclusive={answer.length === 1 ? true : false}
      onChange={(event, options) => {
        setSelected(options);
      }}
    >
      {opts}
    </ToggleButtonGroup>
  );
};
