"use client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Usersitem from "@/app/components/Usersitem";
import CustomSeparator from "@/app/components/Bradcrumbs";
import Image from "next/image";
import icon from "../../../../public/images/search.svg";
import withAuth from "@/protected/withAuth";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/_common/commonapi";

interface User {
  User_id: string;
  FullName: string;
  Mobile_no: string;
  Email: string;
  Status: number;
}

interface UserData {
  totalCount: number;
  result: User[];
}

function Users() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // const [user, setUser] = useState<UserData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedSearch = e.target.value.trim();
    setSearch(trimmedSearch);
    setPage(1);
  };

  const { data: user,refetch } = useQuery({
    queryKey: ["useGetUsers", { page, search }],
    queryFn: () => getUsers({ page, search }),
  });

  return (
    <div className="text-black h-[calc(100vh-111px)]">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] my-[30px]">
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
        <Usersitem user={user} refetch={refetch}  />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-6 mb-8">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(Number(user?.totalCount) / 5)}
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
}
export default withAuth(Users);
