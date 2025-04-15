import React from "react";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";

function GreenSwitch({ status }: any) {
  const ToggleSwitch = styled(Switch)(({ theme }: any) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: green[600],
      "&:hover": {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: green[600],
    },
  }));

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  return <ToggleSwitch {...label} checked={status} />;
}

export default GreenSwitch;
