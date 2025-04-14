"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import CategoryItem from "@/app/components/CategoryItem";
import Usersitem from "@/app/components/Usersitem";
import { getFunction } from "@/api/ApiCall";
import axios from "axios";

export default function users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState();
  const getUsers = async () => {
    try {
      const res = await axios.get(
        "http://192.168.2.179/groceryusers/getusers?page=1&limit=10"
      );

      const data = await res?.data?.data;
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [page]);

  // const filteredCategories = user.filter((item: any) =>
  //   item.Category_Name.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Users</h2>
        </div>

        <div className="searchfiled mr-8 flex gap-2">
          <input
            type="text"
            placeholder="Search Users.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 border-[#DADDE1] bg-white focus:outline-none border w-[244px] h-[45px]"
          />
        </div>
      </div>

      {/* USERS TABLE************  */}
      <div className="max-w-[1400px] m-auto mt-3">
        <Usersitem />
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
