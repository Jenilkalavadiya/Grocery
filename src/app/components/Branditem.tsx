import { apiRequest } from "@/api/ApiCall";
import Greenswitch from "@/utils/Greenswitch";
import Image from "next/image";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import DeleteDialog from "@/utils/DeleteDialog";
import GreenSwitch from "@/utils/Greenswitch";
const Branditem = ({ filteredbrand, getbrands, handleOpen, setId }: any) => {
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
      url: `/delete_brand?id=${itemID}`,
    });

    getbrands();
    handleClose();
    console.log(res);
  };

  // CHANGE STATUS
  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({
        method: "post",
        url: `/status_change3`,
        data: { id, status: newStatus },
      });
      

      console.log("status", res);
      if (res?.status === 200) {
        toast.success(res?.data?.data?.MESSAGE);
      } else {
        toast.error("Status update failed");
      }
      getbrands();
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="overflow-x-auto shadow-2xl ">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-gray-300">
            <th className="px-4 py-3 w-[150px]">No.</th>
            <th className="px-6 py-3 text-left w-[205px]">Image</th>
            <th className="px-6 py-3 text-left w-[405px]">Name</th>
            <th className="px-4 py-3 text-left min-w-[300px]">Category</th>
            <th className="px-4 py-3 text-left min-w-[300px]">Sub Category</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredbrand ? (
            <>
              {filteredbrand?.result?.map((item: any) => (
                <tr
                  key={item.No}
                  className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
                >
                  <td className="px-4 py-3 text-sm border-b border-gray-200">
                    {item?.No}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 ">
                    <Image
                      src={item?.Image}
                      width={80}
                      height={40}
                      alt="category_image"
                      className="rounded-full object-contain"
                    />
                  </td>
                  <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                    {item?.Brand_Name}
                  </td>
                  <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                    {item?.Category_Name}
                  </td>
                  <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                    {item?.SubCategory_Name}
                  </td>
                  <td className="px-4 py-6 border-b border-gray-200 text-left">
                    <div
                      onClick={() => changeStatus(item?.No, item?.Status)}
                      className="inline-block cursor-pointer"
                    >
                      <GreenSwitch Status={item?.Status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                    <div className="flex gap-4 items-center">
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleOpen(), setId(item?.No);
                        }}
                      >
                        <CiEdit />
                      </span>
                      <span
                        className="text-2xl cursor-pointer"
                        onClick={() => {
                          handleClickOpen(), setItemID(item?.No);
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
              <tr className="">
                <td className="ml-3 mt-2  text-center ">No Data</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Branditem;
