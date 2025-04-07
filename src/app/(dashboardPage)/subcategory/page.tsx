"use client";
import React from "react";
import { getFunction } from "@/api/ApiCall";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Subcategoryitem from "@/app/components/Subcategoryitem";
function subcategory() {
  const [search, setSearch] = useState("");
  const [subcategory, setSubCategory] = useState(null);

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
            <button
              className="bg-[#FCC827] text-black font-semibold h-[45px] p-2.5"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_1"
                ) as HTMLDialogElement;
                if (modal) {
                  modal.showModal();
                }
              }}
            >
              {" "}
              Add Sub Category
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white w-[450px] !px-[50px]">
                <h1 className="font-bold text-3xl text-center">
                  Add Sub Category
                </h1>
                <h2 className="mt-10">Sub Category :</h2>
                <br />

                <div className="flex flex-col gap-9 ">
                  <input
                    type="text"
                    className="w-[350px] bg-white text-black h-[50px] p-2"
                    placeholder="Category"
                  />

                  <input
                    type="file"
                    className="w-[350px] mt-3 bg-[#FAFAFA] text-black h-[100px]"
                    placeholder="Upload image"
                  />
                  <div className="flex justify-between">
                    <p>Status</p>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="toggle bg-gray-500 checked:bg-green-500 checked:text-white-800 checked:border-green-500 "
                    />
                  </div>
                  <div className="flex">
                    <button className="w-[350px] bg-amber-300 p-3">Save</button>
                  </div>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn absolute right-0 top-0">X</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}

      <div className="max-w-[1400px] m-auto mt-3">
        <Subcategoryitem subcategory={subcategory} />
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
