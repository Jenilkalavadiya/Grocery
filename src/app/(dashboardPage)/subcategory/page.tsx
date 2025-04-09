"use client";
import React from "react";
import { getFunction } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Subcategoryitem from "@/app/components/Subcategoryitem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
function subcategory() {
  const [search, setSearch] = useState("");
  const [subcategory, setSubCategory] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getAllSubCategory = async () => {
    try {
      const res = await getFunction(
        "/get_subcategories?pageNumber=1&pageLimit=10"
      );
      const data = await res?.data?.data;
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSubCategory();
  }, []);

  const filteredSubCategories = subcategory.filter((item: any) =>
    item.Category_Name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">
            Sub Categories
          </h2>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled mr-9 flex gap-2">
          <input
            type="text"
            placeholder="Search Sub Categories.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border h-[45px]"
          />

          <div className="w-[166px]">
            <Button
              className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
              onClick={handleClickOpen}
              // variant="outlined"
            >
              {" "}
              Add Sub Category
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Add Category"}
              </DialogTitle>
              <DialogContent suppressHydrationWarning>
                <span className="mt-10">Sub Category :</span>
                <br />

                <div className="flex flex-col gap-9 ">
                  <input
                    type="text"
                    className="w-[350px] bg-white text-black h-[50px] p-2"
                    placeholder="Sub Category."
                  />

                  <input
                    type="file"
                    className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[100px]"
                    placeholder="Upload image(250X250)"
                  />
                  <div className="flex justify-between">
                    <span>Status</span>
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600 dark:peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  <div className="flex">
                    <button className="w-[350px] bg-amber-300 p-3">Save</button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  autoFocus
                  className="btn !absolute right-0 top-0"
                >
                  X
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="max-w-[1400px] m-auto mt-3">
        <Subcategoryitem filteredSubCategories={filteredSubCategories} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
}

export default subcategory;
