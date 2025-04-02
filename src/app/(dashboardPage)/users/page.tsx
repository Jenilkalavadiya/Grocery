"use client";

import { filledInputClasses } from "@mui/material/FilledInput";
import { inputBaseClasses } from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { textFieldStyles } from "@/_components/textFieldStyles";
// import { PageContainer } from "@toolpad/core/PageContainer";
// import { AppProvider } from "@toolpad/core/AppProvider";
import { useDemoRouter } from "@toolpad/core/internal";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function users() {
  const NAVIGATION = [
    { segment: "", title: "Dashboard" },
    { segment: "users" },
  ];
  const router = useDemoRouter("/users");

  const theme = useTheme();

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between  p-3 items-center w-[100%]">
        <div>
          <h2 className="text-2xl ml-4 font-bold">Users</h2>
        </div>

        <div className="searchfiled mr-4 ">
          <TextField
            id="outlined-suffix-shrink"
            label="Search Users"
            variant="outlined"
            sx={{
              ...textFieldStyles,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black"
                },
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      opacity: 0,
                      pointerEvents: "none",
                      [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                        opacity: 1,
                      },
                    }}
                  ></InputAdornment>
                ),
              },
            }}
          />
        </div>
      </div>

      
    </div>
  );
}
