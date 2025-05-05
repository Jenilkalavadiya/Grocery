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
  return <ToggleSwitch {...label} checked={Boolean(status)} />;
}

export default GreenSwitch;
