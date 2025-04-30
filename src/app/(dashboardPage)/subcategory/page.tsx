"use client";
import React from "react";
import { apiRequest } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Subcategoryitem from "@/app/components/Subcategoryitem";
import Button from "@mui/material/Button";
import ModalSubCategory from "@/utils/ModalSubCategory";
import CustomSeparator from "@/app/components/Bradcrumbs";
import withAuth from "@/protected/withAuth";
function subcategory() {
  const [search, setSearch] = useState("");
  const [subcategory, setSubCategory] = useState<SubcategoryResponse>();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [page, setPage] = useState(1);
  const [itemID, setItemId] = useState("");

  interface SubcategoryItem {
    No: number;
    Image: string;
    SubCategory_Name: string;
    Category_id: number;
    Category_Name: string;
  }

  interface SubcategoryResponse {
    Total_Count: number;
    result: SubcategoryItem[];
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemId("");
  };

  //getCategory
  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=1&pageLimit=5`,
      });

      const data = await res?.data?.data?.result;
      console.log("data", data);
      setCategory(data);
    } catch (error) {}
  };

  //getSubCategory
  const getAllSubCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_subcategories?pageNumber=${page}&pageLimit=5&search=${search}`,
      });

      const data = await res?.data?.data;
      console.log("subcategory", res);
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
  }, [page, search]);
  console.log("subcategory", subcategory);
  return (
    <div className="text-black h-[calc(100vh-111px)]">
      <div className="flex justify-between items-center w-[100%] my-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Sub Categories</h2>
          <div className="mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"subcategory"}
              className="flex"
            />
          </div>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled flex gap-2">
          <input
            type="text"
            placeholder="Search Sub Categories.. "
            value={search}
            onChange={(e) => {
              setSearch(e.target.value), setPage(1);
            }}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border h-[45px]"
          />

          <div className="w-[166px]">
            <Button
              className="!bg-[#FCC827] !text-black !font-bold h-[45px] p-1"
              onClick={handleOpen}
            >
              Add SubCategory
            </Button>

            {open && (
              <ModalSubCategory
                open={open}
                handleClose={handleClose}
                category={category}
                subcategory={subcategory}
                getAllSubCategory={getAllSubCategory}
                itemID={itemID}
              />
            )}
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="m-auto ">
        <Subcategoryitem
          filteredSubCategories={subcategory}
          getAllSubCategory={getAllSubCategory}
          setid={setItemId}
          handleOpen={handleOpen}
        />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(subcategory?.Total_Count) / 5)}
            variant="outlined"
            shape="rounded"
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </div>
    </div>
  );
}

export default withAuth(subcategory);
