"use client";

import { inputBaseClasses } from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { textFieldStyles } from "@/_components/textFieldStyles";

import { useDemoRouter } from "@toolpad/core/internal";
import { useState } from "react";

export default function users() {
  const [search, setSearch] = useState("");
  const NAVIGATION = [
    { segment: "", title: "Dashboard" },
    { segment: "users" },
  ];
  const router = useDemoRouter("/users");

  // const theme = useTheme();
  console.log("object", search);

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-5 items-center w-[100%]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">Users</h2>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled mr-4 ">
          <TextField
            id="outlined-suffix-shrink"
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              ...textFieldStyles,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "black",
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

      {/* USERS TABLE************  */}
      <div className="max-w-[1400px] m-auto mt-3">
        {/* <CategoryItem category={category} /> */}
      </div>
    </div>
  );
}
