"use client";
import React from "react";
import { apiRequest } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Branditem from "@/app/components/Branditem";
import Button from "@mui/material/Button";
import icon from "../../../../public/images/search.svg";
import ModalBrand from "@/utils/ ModalBrand";
import Image from "next/image";
import CustomSeparator from "@/app/components/Bradcrumbs";
import withAuth from "@/protected/withAuth";

const page = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState<any>();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [id, setId] = useState("");

  interface Brand {
    No: number;
    Image: string;
    Brand_Name: string;
    SubCategory_Name: string;
    Category_Name: string;
    Total_Count: number;
  }

  interface BrandResponse {
    Total_Count: number | undefined;
    result: Brand[];
  }

  //getbrands
  const getbrands = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_brands?pageNumber=${page}&pageLimit=5&search=${search}`,
      });
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

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
  }, []);

  const handleChange = (e: any) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
    setPage(1);
  };

  //getCategory
  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=1&pageLimit=10`,
      });

      const data = await res?.data?.data?.result;
      // console.log("data", await data);
      setCategory(data);
    } catch (error) {}
  };

  //getSubCategory
  const getAllSubCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_subcategories?pageNumber=1&pageLimit=10`,
      });
      const data = await res?.data?.data?.result;
      // console.log("subcate", data);
      setSubCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-black h-[calc(100vh-111px)]">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] my-[30px] ">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Brands</h2>
          <div className=" mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"brands"}
              className="flex"
            />
          </div>
        </div>

        <div className="searchfiled flex gap-3">
          <div className="border border-[#DADDE1] bg-white flex justify-center">
            <div className="flex items-center justify-center ml-3">
              <Image src={icon} alt="pp" width={18} height={15} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Brands.. "
                value={search}
                onChange={(e) => handleChange(e)}
                className="px-2 focus:outline-none  w-[244px] h-[45px]"
              />
            </div>
          </div>

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
              id={id}
            />
          )}
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className=" m-auto mt-3">
        <Branditem
          filteredbrand={brand}
          getbrands={getbrands}
          handleOpen={handleOpen}
          setId={setId}
        />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(brand?.Total_Count / 5))}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default withAuth(page);
