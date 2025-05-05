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
import DataIcon from "../../../public/data.svg";

interface CategoryItem {
  No: number;
  Image: string;
  SubCategory_Name: string;
  Category_id: number;
  Category_Name: string;
  Status: number;
}

interface CategoryResponse {
  Total_Count: number;
  result: CategoryItem[];
}

interface CategoryItemProps {
  filteredCategories: CategoryResponse | null;
  getAllCategory: () => Promise<void>;
  handleOpen: () => void;
  setid: (id: number) => void;
}

const CategoryItem = ({
  filteredCategories,
  getAllCategory,
  handleOpen,
  setid,
}: CategoryItemProps) => {
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState<number | undefined>(undefined);
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
    } catch (err: unknown) {
      console.error("Status update error:", err);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="overflow-x-auto shadow-2xl mt-4">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-gray-300">
            <th className="px-4 py-3  flex justify-center gap-1.5">
              No.
              <Image src={DataIcon} alt="ab" width={12} />
            </th>
            <th className="px-4 py-3 text-left w-[205px]">Image</th>
            <th className="px-4 py-3 text-left min-w-[500px] flex gap-1.5">
              Category
              <Image src={DataIcon} alt="ab" width={12} />
            </th>

            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!filteredCategories ? (
            <tr>
              <td colSpan={5} className="py-6">
                <div className="flex justify-center items-center w-full">
                  <TableLoading />
                </div>
              </td>
            </tr>
          ) : filteredCategories?.result?.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-6 text-center text-gray-500">
                No categories found.
              </td>
            </tr>
          ) : (
            filteredCategories?.result?.map(
              (item: CategoryItem, index: number) => (
                <tr
                  key={item.No}
                  className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
                >
                  <td className="px-4 py-5 text-lg border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-4 py-5 border-b border-gray-200">
                    <Image
                      src={item.Image}
                      width={60}
                      height={60}
                      alt="category_image"
                    />
                  </td>
                  <td className="px-4 py-5 text-lg border-b border-gray-200 text-left">
                    {item?.Category_Name}
                  </td>
                  <td className="px-4 py-5 text-md border-b border-gray-200 text-left">
                    <div onClick={() => statusChange(item?.No, item?.Status)}>
                      <Greenswitch status={item?.Status} />
                    </div>
                  </td>
                  <td className="px-4 py-5 text-sm text-gray-700 border-b border-gray-200">
                    <div className="flex gap-4 items-center">
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleOpen();
                          setid(item.No);
                        }}
                      >
                        <CiEdit />
                      </span>
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleClickOpen();
                          setItemID(item.No);
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
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryItem;
