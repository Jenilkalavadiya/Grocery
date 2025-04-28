import GreenSwitch from "@/utils/Greenswitch";
import React from "react";
import { CiEdit } from "react-icons/ci";
import TableLoading from "./TableLoading";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";
import Link from "next/link";

const Usersitem = ({ user, getUsers }: any) => {
  // CHANGE STATUS
  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({
        method: "post",
        url: `/updateuserstatus`,
        data: { id, status: newStatus },
      });

      console.log("status", res);
      if (res?.status === 200) {
        toast.success(res?.data?.data?.message);
      } else {
        toast.error("Status update failed");
      }
      getUsers();
    } catch (err: any) {
      console.error("Status update error:", err);
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto shadow-2xl ">
        <table className="min-w-full bg-white rounded-2xl ">
          <thead className="bg-[#FAFAFA] text-[#202020]">
            <tr className="text-md border-b  font-bold border-gray-300">
              <th className="px-4 py-3 ">User ID</th>
              <th className="px-6 py-3  ">Name</th>
              <th className="px-6 py-3  ">Mobile Number</th>
              <th className="px-4 py-3 ">Email</th>

              <th className="px-4 py-3  ">Status</th>
            </tr>
          </thead>

          <tbody>
            {!user ? (
              // Show loading
              <tr>
                <td colSpan={8} className="py-6">
                  <div className="flex justify-center items-center w-full">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            ) : user?.result?.length === 0 ? (
              // Show "No users found"
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              // Show actual user rows
              user?.result?.map((item: any) => (
                <tr
                  key={item?.User_id}
                  className="hover:bg-gray-50 transition-all duration-300 text-center"
                >
                  <td className="px-4 py-6 border-b border-gray-200  ">
                    {item?.User_id}
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200  ">
                    <Link href={`/users/${item?.User_id}`}>
                      {item?.FullName}
                    </Link>
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200 ">
                    {item?.Mobile_no}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 ">
                    {item?.Email}
                  </td>
                  <td className="px-4 py-6 border-b border-gray-200  ">
                    <div
                      onClick={() => changeStatus(item?.User_id, item?.Status)}
                      className="inline-block cursor-pointer"
                    >
                      <GreenSwitch status={item?.Status} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usersitem;
