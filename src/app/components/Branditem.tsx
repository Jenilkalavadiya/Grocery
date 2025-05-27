import { apiRequest } from "@/api/ApiCall";
import Image from "next/image";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import DeleteDialog from "@/utils/DeleteDialog";
import GreenSwitch from "@/utils/Greenswitch";
import TableLoading from "./TableLoading";

interface Brand {
  No: number;
  Image: string;
  Brand_Name: string;
  Category_Name: string;
  SubCategory_Name: string;
  Status: number;
  Total_Count?: number;
}

interface BrandResponse {
  Total_Count?: number;
  result: Brand[];
}

interface BranditemProps {
  filteredbrand: BrandResponse | null;
  getbrands: () => Promise<void>;
  handleOpen: () => void;
  setId: (id: number) => void;
}

const Branditem: React.FC<BranditemProps> = ({
  filteredbrand,
  getbrands,
  handleOpen,
  setId,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [itemID, setItemID] = useState<number | undefined>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await apiRequest({
        method: "delete",
        url: `/delete_brand?id=${itemID}`,
      });
      toast.success("Deleted SuccessFull");
      getbrands();
      handleClose();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete brand");
    }
  };

  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({
        method: "post",
        url: `/status_change3`,
        data: { id, status: newStatus },
      });

      if (res?.status === 200) {
        toast.success(res?.data?.data?.MESSAGE);
      } else {
        toast.error("Status update failed");
      }
      getbrands();
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="overflow-x-auto shadow-2xl ">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-b border-gray-300">
            <th className="px-4 py-3 ">No.</th>
            <th className="px-4 py-3 text-left ">Image</th>
            <th className="px-4 py-3 text-left ">Name</th>
            <th className="px-4 py-3 text-left ">Category</th>
            <th className="px-4 py-3 text-left ">Sub Category</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!filteredbrand ? (
            <tr>
              <td colSpan={8} className="py-6">
                <div className="flex justify-center items-center w-full">
                  <TableLoading />
                </div>
              </td>
            </tr>
          ) : filteredbrand?.result?.length === 0 ? (
            <tr>
              <td colSpan={8} className="py-6 text-center text-gray-500">
                No brands found.
              </td>
            </tr>
          ) : (
            filteredbrand.result.map((item: Brand) => (
              <tr
                key={item.No}
                className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
              >
                <td className="px-4 py-3 text-sm border-b border-gray-200">
                  {item.No}
                </td>
                <td className="px-4 py-3 border-b border-gray-200">
                  <Image
                    src={item.Image}
                    width={80}
                    height={40}
                    alt="category_image"
                    className="rounded-full object-contain"
                  />
                </td>
                <td className="px-4 py-3 text-md border-b border-gray-200 text-left">
                  {item.Brand_Name}
                </td>
                <td className="px-4 py-3 text-md border-b border-gray-200 text-left">
                  {item.Category_Name}
                </td>
                <td className="px-4 py-3 text-md border-b border-gray-200 text-left">
                  {item.SubCategory_Name}
                </td>
                <td className="px-4 py-6 border-b border-gray-200 text-left">
                  <div
                    onClick={() => changeStatus(item.No, item.Status)}
                    className="inline-block cursor-pointer"
                  >
                    <GreenSwitch status={item.Status} />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                  <div className="flex gap-4 items-center">
                    <span
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        handleOpen();
                        setId(item.No);
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Branditem;
