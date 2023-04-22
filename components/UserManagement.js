import * as React from "react";
import _ from "lodash";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Autocomplete from "@mui/material/Autocomplete";

import { useRecoilValue, useRecoilState } from "recoil";
import { RecordsAtom, SortedRecordSelector } from "../state/recordsState";
import { ModalAtom, ModalTitleAtom, ModalUserAtom } from "../state/modalState";

import { restdbPost, restdbDelete } from "../utils/api_client";
import { mongoPost } from "../utils/mongoHelper";
import { useRouter } from "next/router";

const TxtField = (props) => {
  const userRecords = useRecoilValue(SortedRecordSelector);
  const value = useRecoilValue(ModalUserAtom);
  const modalTitle = useRecoilValue(ModalTitleAtom);

  return (
    <Autocomplete
      sx={{ my: 2 }}
      multiple
      id="tags-filled"
      options={userRecords.map((option) => option.user)}
      {...props}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          inputProps={{
            ...params.inputProps,
            style: { textTransform: "uppercase" },
          }}
          placeholder={_.isEmpty(value) ? `${modalTitle} user` : "another user"}
        />
      )}
    />
  );
};

const UserManagement = () => {
  const userRecords = useRecoilValue(RecordsAtom);
  const [openModal, setOpenModal] = useRecoilState(ModalAtom);
  const modalTitle = useRecoilValue(ModalTitleAtom);
  const [value, setValue] = useRecoilState(ModalUserAtom);
  const fullScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const [btnDisabled, setbtnDisabled] = React.useState(true);
  const router = useRouter();

  ///TODO track virtua keyboard state to adjust modal

  const AddonChange = (ev, newValue) => {
    const CapValue = newValue.map((value) => value.toUpperCase());
    const filterBasedonValue = _.compact(
      _.chain(userRecords).keyBy("user").at(CapValue).value()
    );

    const finalValue = _.isEmpty(filterBasedonValue)
      ? CapValue
      : _.dropRight(CapValue);
    setValue(finalValue);

    if (_.isEmpty(finalValue)) {
      setbtnDisabled(true);
    } else {
      setbtnDisabled(false);
    }
  };

  const RemoveonChange = (event, newValue) => {
    setValue(newValue);
    if (_.isEmpty(newValue)) {
      setbtnDisabled(true);
    } else {
      setbtnDisabled(false);
    }
  };

  const HandleOnclick = (value) => () => {
    mongoPost(modalTitle === "Remove" ? "/deleteRecord" : "/addRecords", value);
    setOpenModal(false);
    setValue([]);
  };

  return (
    <Dialog
      sx={{ "& .MuiPaper-root": { borderRadius: 8 } }}
      fullScreen={fullScreen}
      open={openModal}
      onClose={() => {
        setOpenModal(false);
        setValue([]);
      }}
    >
      <DialogTitle sx={{ py: 3, pt: 3, pb: 2 }} id="dialog-title" variant="h6">
        {modalTitle} User
      </DialogTitle>
      <DialogContent sx={{ py: 3, pb: 3 }}>
        <DialogContentText>
          {modalTitle === "Remove"
            ? "Type to filter for easy selection. Select user from dropdown to add to remove list. Multiple users may be selected."
            : "Type user and press enter. Multiple users may be added. "}
        </DialogContentText>
        {modalTitle === "Remove" ? (
          <TxtField onChange={RemoveonChange} filterSelectedOptions />
        ) : (
          <TxtField
            onChange={AddonChange}
            freeSolo
            value={value}
            open={false}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3, pt: 0 }}>
        <Button
          sx={{ color: "primary.main" }}
          onClick={() => setOpenModal(false)}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={HandleOnclick(value)}
          disabled={btnDisabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserManagement;
