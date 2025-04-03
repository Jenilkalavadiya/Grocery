"use client";

import axios from "axios";

import { useEffect, useState } from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CategoryItem from "@/app/components/CategoryItem";

const Category = () => {
  const jwt = localStorage.getItem("loginjwt");
  const refresh = localStorage.getItem("refreshjwt");

  const [category, setCategory] = useState(null);
  console.log("category", category);

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEAPI}/getcategories`,
        {
          headers: {
            Authorizations: `${jwt}`,
            language: "en",

            refresh_token: refresh,
          },
        }
      );
      console.log("resCategory", res);
      const data = await res?.data?.data;
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between  p-3 items-center w-[100%]">
        <div>
          <h2 className="text-2xl ml-8 font-bold">Categories</h2>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled mr-8  flex gap-2">
          {/* <TextField
            id="outlined-suffix-shrink"
            label="Search Users"
            variant="outlined"
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
                      // height: "6px",
                      pointerEvents: "none",
                      [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                        opacity: 1,
                      },
                    }}
                  ></InputAdornment>
                ),
              },
            }}
          /> */}

        <input type="text" placeholder="Search Categories.. " className="px-2 h-10 rounded-md border-gray-200 focus:outline-none border " />


          <div className="w-[200px]">
            {/* <button className="bg-[#fcc827] font-bold    p-2 cursor-pointer  w-[100%] ">
              Add Category
            </button> */}
<button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}> Add Category</button>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="max-w-[1200px] m-auto mt-3">
        <CategoryItem category={category} />
      </div>

    {/* // PAGINATION ******* */}
            <div className="flex justify-end mt-6 mr-8 mb-8">
            <Stack spacing={2}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
            </div>
    </div>
  );
};

export default Category;
