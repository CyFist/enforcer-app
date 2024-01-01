import * as React from "react";

import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

import {
  useRecoilState,
  useSetRecoilState,
  useResetRecoilState,
  useRecoilValue,
} from "recoil";
import { query_LMAtom, searchBar_LMAtom } from "../state/queryState";
import { ModalAtom, ModalTitleAtom, ModalUserAtom } from "../state/modalState";
import { RecordsAtom } from "../state/recordsState";
import _ from "lodash";

export default function SearchBar() {
  const setQuery = useSetRecoilState(query_LMAtom);
  const [value, setValue] = useRecoilState(searchBar_LMAtom);
  const resetValue = useResetRecoilState(searchBar_LMAtom);
  const resetQuery = useResetRecoilState(query_LMAtom);
  const setOpenModal = useSetRecoilState(ModalAtom);
  const setModalTitle = useSetRecoilState(ModalTitleAtom);
  const resetModalValue = useResetRecoilState(ModalUserAtom);

  const uRecords = useRecoilValue(RecordsAtom);

  const handleOpen = (titletext) => {
    setModalTitle(titletext);
    setOpenModal(true);
    resetModalValue([]);
  };

  const hangleChange = (event, newValue) => {
    const CapValue = newValue.map((value) => value.toUpperCase());
    setValue(CapValue);
    setQuery(CapValue);
  };

  return (
    <Autocomplete
      multiple
      disableClearable
      id="tags-filled"
      sx={{ flex: 1 }}
      //options={uRecords}
      //options={uRecords.map((option) => option.User)}
      freeSolo
      forcePopupIcon={false}
      open={false}
      value={value}
      onChange={hangleChange}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            variant="outlined"
            label={option.length === 1 ? `Starts with "${option}"` : option}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search user"
            sx={{
              "& .MuiOutlinedInput-root": {
                py: 0.25,
                mb: 1.5,
                display: "flex",
                alignItems: "center",
                width: "auto",
                borderRadius: 8,
                borderStyle: "none",
                bgcolor: "background.paper",
                "& fieldset": {
                  borderStyle: "none",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <IconButton
                    disableRipple
                    p={1}
                    aria-label="search"
                    disabled={_.isEmpty(value)}
                    onClick={() => {
                      resetQuery();
                      resetValue();
                    }}
                  >
                    {_.isEmpty(value) ? <SearchIcon /> : <ClearIcon />}
                  </IconButton>
                  <Divider
                    sx={{ height: 28, m: 0.5, bgcolor: "text.primary" }}
                    orientation="vertical"
                  />
                  <IconButton
                    disableRipple
                    p={1}
                    aria-label="addUser"
                    onClick={() => {
                      handleOpen("Add");
                    }}
                  >
                    <PersonAddOutlinedIcon />
                  </IconButton>
                  <IconButton
                    disableRipple
                    p={1}
                    aria-label="removeUser"
                    onClick={() => {
                      handleOpen("Remove");
                    }}
                  >
                    <PersonRemoveAlt1OutlinedIcon />
                  </IconButton>
                </>
              ),
            }}
            inputProps={{
              ...params.inputProps,
              style: { textTransform: "uppercase" },
            }}
          />
        );
      }}
    />
  );
}
