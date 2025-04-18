"use client";   

import { Box, Button, Modal } from "@mui/material";

import MangeForm from "@/app/components/MangeForm";

interface ModalConfigurationProps {
  boxOpen: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export const ModalConfiguration = ({
  boxOpen,
  handleClose,
}: ModalConfigurationProps) => {
  return (
    <Modal
      open={boxOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={style}
        className="!flex !justify-center !border-none !items-center"
      >

        {/* FORM DATA *******  */}
        
        <MangeForm boxOpen={boxOpen} handleClose={handleClose} />
      </Box>
    </Modal>
  );
};
