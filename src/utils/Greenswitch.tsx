import React from "react";
import { green } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { alpha, styled, Theme } from "@mui/material/styles";

interface GreenSwitchProps {
  status: boolean | number;
}

function GreenSwitch({ status }: GreenSwitchProps) {
  const ToggleSwitch = styled(Switch)(({ theme }: { theme: Theme }) => ({
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
  // Convert numeric status to boolean while maintaining the same logic
  const isChecked = typeof status === "number" ? status === 1 : status;
  return <ToggleSwitch {...label} checked={isChecked} />;
}

export default GreenSwitch;
