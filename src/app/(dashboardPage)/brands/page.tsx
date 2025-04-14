"use client";
import React from "react";
import { _post, getFunction } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Branditem from "@/app/components/Branditem";
import Button from "@mui/material/Button";

import ModalBrand from "@/utils/ ModalBrand";
const page = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState([]);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  //getbrands
  const getbrands = async () => {
    try {
      const res = await getFunction(
        `/get_brands?pageNumber=${page}&pageLimit=10&search=${search}`
      );
      console.log("res", res);
      const data = await res?.data?.data;
      setBrand(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("page", page);
  useEffect(() => {
    getbrands();
  }, [search, page]);

  //getCategory
  const getAllCategory = async () => {
    try {
      const res = await getFunction(`/getcategories?pageNumber=1&pageLimit=10`);
      const data = await res?.data?.data?.result;
      console.log("data", await data);
      setCategory(data);
    } catch (error) {}
  };

  //getSubCategory
  const getAllSubCategory = async () => {
    try {
      const res = await getFunction(
        "/get_subcategories?pageNumber=1&pageLimit=10"
      );
      const data = await res?.data?.data?.result;
      console.log("subcate", data);
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
  }, []);

  const handleChange = (e: any) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
  };

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Brands</h2>
        </div>

        <div className="searchfiled mr-8 flex gap-2">
          <input
            type="text"
            placeholder="Search Brands.. "
            value={search}
            onChange={(e) => handleChange(e)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[130px]">
            <Button
              className="!bg-[#FCC827] !text-black !font-bold h-[45px] p-1"
              onClick={handleOpen}
              // variant="outlined"
            >
              {" "}
              Add Brand
            </Button>

            {open && (
              <ModalBrand
                open={open}
                handleClose={handleClose}
                category={category}
                subCategory={subCategory}
                getbrands={getbrands}
              />
            )}
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="max-w-[1400px] m-auto mt-3">
        <Branditem filteredbrand={brand} getbrands={getbrands} />
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
