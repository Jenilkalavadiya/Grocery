"use client";

import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Greenswitch from "@/utils/Greenswitch";
import { apiRequest } from "@/api/ApiCall";
import DeleteDialog from "@/utils/DeleteDialog";
import { toast } from "react-toastify";
import TableLoading from "./TableLoading";

const CategoryItem = ({
  filteredCategories,
  getAllCategory,
  handleOpen,
  setid,
}: any) => {
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    const res = await apiRequest({
      method: "delete",
      url: `/deletecategory?id=${itemID}`,
    });
    getAllCategory();
    handleClose();
    console.log(res);
  };

  const statusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({
        method: "post",
        url: "/status_change1",
        data: { id, status: newStatus },
      });
      console.log("resssponse", res);
      if (res?.status === 200) {
        toast.success("Status updated");
        getAllCategory();
      } else {
        toast.error("Status update failed");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="overflow-x-auto shadow-2xl mt-10">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-gray-300">
            <th className="px-4 py-3 w-[150px]">No.</th>
            <th className="px-6 py-3 text-left w-[205px]">Image</th>
            <th className="px-4 py-3 text-left min-w-[500px]">Category</th>

            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories ? (
            <>
              {filteredCategories?.result?.map((item: any) => (
                <tr
                  key={item.No}
                  className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
                >
                  <td className="px-4 py-3 text-sm border-b border-gray-200">
                    {item?.No}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200">
                    <Image
                      src={item.Image}
                      width={60}
                      height={60}
                      alt="category_image"
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3 text-md border-b border-gray-200 text-left">
                    {item?.Category_Name}
                  </td>
                  <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                    <div onClick={() => statusChange(item?.No, item?.Status)}>
                      <Greenswitch status={item?.Status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    <div className="flex gap-4 items-center">
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleOpen(), setid(item.No);
                        }}
                      >
                        <CiEdit />
                      </span>
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleClickOpen(), setItemID(item.No);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </span>
                      {open && (
                        <DeleteDialog
                          open={open}
                          handleClose={handleClose}
                          handleDelete={handleDelete}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <>
              <tr>
                <td colSpan={8} className="py-6">
                  <div className="flex justify-center items-center w-full">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryItem;
