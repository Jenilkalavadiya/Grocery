"use client";

import axios from "axios";

import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CategoryItem from "@/app/components/CategoryItem";

const Category = () => {
  const [search, setSearch] = useState("");
  const jwt = localStorage.getItem("loginjwt");
  const refresh = localStorage.getItem("refreshjwt");

  const [category, setCategory] = useState(null);
  // console.log("category", category);

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEAPI}/getcategories`,
        {
          headers: {
            Authorizations: `${jwt}`,
            language: "en",

            refresh_token: refresh,
          },
        }
      );
      console.log("resCategory", res);
      const data = await res?.data?.data;
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">
            Categories
          </h2>
        </div>

        {/* SEARCH USERS INPUT ***************** */}

        <div className="searchfiled mr-8  flex gap-2">
          <input
            type="text"
            placeholder="Search Categories.. "
            value={search}
            onChange={(e) => handleChange(e)}
            className="px-2 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />

          <div className="w-[130px]">
            <button
              className="bg-[#FCC827] text-black font-semibold h-[45px] p-2.5"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              {" "}
              Add Category
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white w-[450px] !px-[50px]">
                <h1 className="font-bold text-3xl text-center">Add products</h1>
                <h2 className="mt-10">
                  Category :
                </h2>
                <br />

                <div className="flex flex-col gap-9 ">
                  <input
                    type="text"
                    className="w-[350px] bg-white text-black h-[50px] p-2"
                    placeholder="Category."
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
        <CategoryItem category={category} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
      </div>
    </div>
  );
};

export default Category;
