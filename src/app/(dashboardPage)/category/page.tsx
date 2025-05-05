"use client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CategoryItem from "@/app/components/CategoryItem";
import { apiRequest } from "@/api/ApiCall";
import Button from "@mui/material/Button";
import ModalCategory from "@/utils/ModalCategory";
import Image from "next/image";
import icon from "../../../../public/search.png";
import CustomSeparator from "@/app/components/Bradcrumbs";
import withAuth from "@/protected/withAuth";

interface CategoryItemData {
  No: number;
  Image: string;
  SubCategory_Name: string;
  Category_id: number;
  Category_Name: string;
  Status: number;
}

interface CategoryResponse {
  Total_Count: number;
  result: CategoryItemData[];
}

const Page = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryResponse | null>(null);
  const [page, setPage] = useState(1);
  const [itemID, setItemId] = useState<number| string>(0);
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setItemId("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
    setPage(1);
  };

  const getAllCategory = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getcategories?pageNumber=${page}&pageLimit=5&search=${search}`,
      });

      const data = await res?.data?.data;
      setCategory(data);
    } catch (error: unknown) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, [page, search]);

  return (
    <div className="text-black h-[calc(100vh-111px)]">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] my-[30px] ">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020] ">Categories</h2>
          <div className="mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"category"}
              className="flex"
            />
          </div>
        </div>
        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled flex gap-3">
          <div className="border border-[#DADDE1] bg-white flex justify-center">
            <div className="flex items-center justify-center ml-3">
              <Image src={icon} alt="pp" width={20} height={20} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Categories.. "
                value={search}
                onChange={handleChange}
                className="px-2 focus:outline-none  w-[244px] h-[45px]"
              />
            </div>
          </div>

          <Button
            className="!bg-[#FCC827] !text-black !font-extrabold h-[45px] p-1"
            onClick={handleOpen}
            // variant="outlined"
          >
            Add Category
          </Button>
          {open && (
            <ModalCategory
              open={open}
              handleClose={handleClose}
              getAllCategory={getAllCategory}
              itemID={itemID}
            />
          )}
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className=" m-auto ">
        <CategoryItem
          filteredCategories={category}
          getAllCategory={getAllCategory}
          handleOpen={handleOpen}
          setid={setItemId}
        />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end my-6 mr-8">
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

export default withAuth(Page);
