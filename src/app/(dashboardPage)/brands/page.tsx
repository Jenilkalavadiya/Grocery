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
import { saveAs } from "file-saver";
import { unparse } from "papaparse";

interface Brand {
  No: number;
  Image: string;
  Brand_Name: string;
  SubCategory_Name: string;
  Category_Name: string;
  Total_Count: number;
  Status: number;
}

interface BrandResponse {
  totalCount: number | undefined;
  result: Brand[];
}

interface Category {
  No: number;
  Category_Name: string;
}

interface SubCategory {
  No: number;
  SubCategory_Name: string;
}

const BrandsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [brand, setBrand] = useState<BrandResponse | null>(null);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<Category[] | null>(null);
  const [subCategory, setSubCategory] = useState<SubCategory[] | null>(null);
  const [id, setId] = useState<string | number>(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId("");
  };

  //getbrands
  const getbrands = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_brands?pageNumber=${page}&pageLimit=5&search=${search}`,
      });
      const data = res?.data?.data;
      setBrand(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      getbrands();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search, page]);

  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      const data = res?.data?.data?.result;
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //getSubCategory
  const getAllSubCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_subcategories?pageNumber=1&pageLimit=10`,
      });
      const data = res?.data?.data?.result;
      setSubCategory(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleExport = () => {
    if (!brand?.result || brand.result.length === 0) return;

    const exportData = brand.result;

    const csv = unparse(exportData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "brands.csv");
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
                onChange={handleChange}
                className="px-2 focus:outline-none  w-[244px] h-[45px]"
              />
            </div>
          </div>

          <Button
            className="!bg-[#FCC827] !text-black !font-bold h-[45px] p-1"
            onClick={handleOpen}
          >
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
          <Button
            className="!bg-green-600 !text-black !font-bold h-[45px] p-1"
            onClick={handleExport}
          >
            Export
          </Button>
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
            count={Math.ceil(Number(brand?.totalCount) / 5)}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            hidePrevButton={!!search}
            hideNextButton={!!search}
          />
        </Stack>
      </div>
    </div>
  );
};

export default withAuth(BrandsPage);
