// import { IconButton, InputAdornment } from "@mui/material";
// import { IoMdEyeOff } from "react-icons/io";
// import { IoEye } from "react-icons/io5";

// styles/textfieldStyles.js
export const textFieldStyles = {
  width: "100%",

  "& .MuiInputLabel-root.Mui-focused": {
    color: "gray", // Styling the label when the TextField is focused
  },
  "& .MuiInputBase-input:focus": {
    color: "black", // Styling the input text when the TextField is focused
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: "black", // Default state
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderBottomColor: "black", // Hover state
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "black", // Focused state
  },
};

export const datePicker = {
  textField: {
    sx: {
      height: "60px", // Decrease the height of the text field

      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "gray", // Default border color
        },
        "&:hover fieldset": {
          borderColor: "gray", // Border color on hover
        },
        "&.Mui-focused fieldset": {
          borderColor: "gray", // Border color on focus (when selected)
        },
        // Reduce padding to fit the smaller height
        padding: "0 10px", // Adjust the padding as necessary
      },

      "& .MuiInputLabel-root.Mui-focused": {
        color: "black", // Styling the label when the TextField is focused
      },
      "& .MuiInputBase-input:focus": {
        color: "black", // Styling the input text when the TextField is focused
      },
    },
  },
};
