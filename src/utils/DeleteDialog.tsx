import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

export default function DeleteDialog({
  open,
  handleClose,
  handleDelete,
}: DeleteDialogProps) {
  // const handleClose = (event, reason) => {
  //   if (reason !== "backdropClick") {
  //     setOpen(false);
  //   }
  // };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Adjust the alpha value (0.5 for 50% opacity)
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="w-[500px] font-bold text-5xl !"
          >
            Are you sure want to delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
