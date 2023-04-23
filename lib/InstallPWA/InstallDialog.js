import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import InstallDialogAction from "./InstallDialogAction";
import { EnforcerIcon } from "./Icons";

export default function InstallDialog(props) {
  return (
    <Dialog
      sx={{ "& .MuiPaper-root": { borderRadius: 8 } }}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle sx={{ py: 3, pt: 3, pb: 2 }} id="dialog-title">
        {props.title || "Install Web App"}
      </DialogTitle>
      <DialogContent sx={{ py: 3, pb: 3 }}>
        <Box display="flex" alignItems="flex-start">
          {!!props.logo && (
            <Box mr={1}>
              <EnforcerIcon sx={{ fontSize: 80 }} />
            </Box>
          )}
          {!!props.features && (
            <Box>
              <Typography variant="subtitle1">Key Features:</Typography>
              <Typography variant="body2" component="div">
                {props.features}
              </Typography>
            </Box>
          )}
        </Box>
        {!!props.description && (
          <>
            <Typography variant="subtitle1">Description:</Typography>
            <Typography variant="body2" component="div">
              {props.description}
            </Typography>
          </>
        )}
      </DialogContent>
      <InstallDialogAction
        platform={props.platform}
        onSubmit={props.onSubmit}
        onClose={props.onClose}
      />
    </Dialog>
  );
}
