"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import CategoryItem from "@/app/components/CategoryItem";

export default function users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between p-4 items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl ml-8 font-bold !text-[#202020]">
            Categories
          </h2>
        </div>

        <div className="searchfiled mr-8 flex gap-2">
          <input
            type="text"
            placeholder="Search Categories.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />
        </div>
      </div>

      {/* USERS TABLE************  */}
      <div className="max-w-[1400px] m-auto mt-3">
        {/* <CategoryItem /> */}
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
}
