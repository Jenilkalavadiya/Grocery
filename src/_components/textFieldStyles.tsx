import { IconButton, InputAdornment } from "@mui/material";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

// styles/textfieldStyles.js
export const textFieldStyles = {
    width: '100%',
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'gray', // Styling the label when the TextField is focused
    },
    '& .MuiInputBase-input:focus': {
      color: 'black', // Styling the input text when the TextField is focused
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: 'black', // Default state
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'black', // Hover state
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black', // Focused state
    },
  };
  
      

