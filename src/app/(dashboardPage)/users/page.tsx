"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import CategoryItem from "@/app/components/CategoryItem";
import Usersitem from "@/app/components/Usersitem";
import { apiRequest } from "@/api/ApiCall";
import axios from "axios";
import CustomSeparator from "@/app/components/Bradcrumbs";
import Image from "next/image";
import icon from "../../../../public/images/search.svg";

export default function users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<any>();

  const handleChange = (e: any) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
    setPage(1);
  };

  // GET USER DETAILS
  const getUsers = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/getusers?pageNumber=${page}&pageLimit=5&search=${search}`,
      });

      const data = await res?.data?.data;
      setUser(data);
    } catch (error) {}
  };

  useEffect(() => {
    getUsers();
  }, [page, search]);

  return (
    <div className="text-black">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Users</h2>
          <div className=" mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"users"}
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
                placeholder="Search Users.. "
                value={search}
                onChange={(e) => handleChange(e)}
                className="px-2 focus:outline-none  w-[244px] h-[45px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}
      <div className=" m-auto mt-3">
        <Usersitem user={user} getUsers={getUsers} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(user?.Total_Count) / 5)}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
}
