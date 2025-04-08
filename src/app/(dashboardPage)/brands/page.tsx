"use client";
import React from "react";

import { _post, getFunction } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Branditem from "@/app/components/Branditem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GreenSwitch from "@/utils/Greenswitch";
const page = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState(null);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getbrands = async () => {
    try {
      const res = await getFunction(
        `/get_brands?pageNumber=${page}&pageLimit=4`
      );
      console.log("res", res);
      const data = await res?.data?.data;
      setBrand(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddBrand = async () => {
    try {
      const res = await _post("/add_brand");
      console.log("res", res);
    } catch (error) {}
  };

  console.log("page", page);
  useEffect(() => {
    getbrands();
  }, [page]);
  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">Brands</h2>
        </div>

        <div className="searchfiled mr-8 flex gap-2">
          <input
            type="text"
            placeholder="Search Brands.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[130px]">
            <Button
              className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
              onClick={handleClickOpen}
              // variant="outlined"
            >
              {" "}
              Add Brand
            </Button>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Add Brand"}</DialogTitle>
              <DialogContent suppressHydrationWarning>
                <span className="mt-10">Brand Name:</span>
                <br />

                <div className="flex flex-col gap-6 ">
                  <input
                    type="text"
                    className="w-[350px] bg-white text-black h-[50px] p-2"
                    placeholder="Brand name"
                  />

                  <span>Category</span>
                  <select name="" id="">
                    <option value="">Vegetables</option>
                    <option value="">Fruits</option>
                    <option value="">Personal Care</option>
                    <option value="">Beverages</option>
                    <option value="">Bread</option>
                  </select>
                  <span>Sub Category</span>
                  <select name="" id="">
                    <option value="">Soap</option>
                    <option value="">Facewash</option>
                    <option value="">Masala</option>
                    <option value="">Shampoo</option>
                    <option value="">Fresh Vegetables</option>
                  </select>

                  <input
                    type="file"
                    className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[100px]"
                    placeholder="Upload image"
                  />
                  <div className="flex justify-between">
                    <span>Status</span>
                    <GreenSwitch />
                  </div>
                  <div className="flex">
                    <button
                      className="w-[350px] bg-amber-300 p-3"
                      onClick={handleAddBrand}
                    >
                      Save
                    </button>
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
        <Branditem brand={brand} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={10}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </div>
    </div>
  );
};

export default page;
