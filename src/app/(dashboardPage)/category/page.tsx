"use client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CategoryItem from "@/app/components/CategoryItem";
import { getFunction } from "@/api/ApiCall";
import Button from "@mui/material/Button";
import ModalCategory from "@/utils/ModalCategory";

const page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(1);

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const getAllCategory = async () => {
    try {
      const res = await getFunction(
        `/getcategories?pageNumber=${page}&pageLimit=5`
      );

      const data = await res?.data?.data;
      setCategory(data);
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategory();
  }, [page]);

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Categories</h2>
        </div>

        <div className="searchfiled flex gap-2">
          <input
            type="text"
            placeholder="Search Categories.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[150px]">
            <Button
              className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
              onClick={handleOpen}
              // variant="outlined"
            >
              {" "}
              Add Category
            </Button>
            {open && (
              <ModalCategory
                open={open}
                handleClose={handleClose}
                getAllCategory={getAllCategory}
              />
            )}
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="p- m-auto mt-3">
        <CategoryItem
          filteredCategories={category}
          getAllCategory={getAllCategory}
          handleOpen={handleOpen}
        />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(category?.Total_Count) / 5)}
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
