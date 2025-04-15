"use client";
import React from "react";
import { getFunction } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Subcategoryitem from "@/app/components/Subcategoryitem";
import Button from "@mui/material/Button";
import ModalSubCategory from "@/utils/ModalSubCategory";
function subcategory() {
  const [search, setSearch] = useState("");
  const [subcategory, setSubCategory] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [category, setCategory] = useState(null);

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
      const data = await res?.data?.data;
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

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Sub Categories</h2>
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
              className="!bg-[#FCC827] !text-black !font-bold h-[45px] p-1"
              onClick={handleOpen}
              // variant="outlined"
            >
              {" "}
              Add SubCategory
            </Button>

            {open && (
              <ModalSubCategory
                open={open}
                handleClose={handleClose}
                category={category}
                subcategory={subcategory}
                getAllSubCategory={getAllSubCategory}
              />
            )}
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="p-10 m-auto ">
        <Subcategoryitem
          filteredSubCategories={subcategory}
          getAllSubCategory={getAllSubCategory}
        />
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
