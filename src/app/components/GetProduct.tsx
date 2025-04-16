"use client";

import { apiRequest } from "@/api/ApiCall";
import DeleteDialog from "@/utils/DeleteDialog";
import GreenSwitch from "@/utils/Greenswitch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const GetProduct = ({ product, getProduct }: any) => {
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // DELETE PRODUCT
  const handleDelete = async () => {
    const res = await apiRequest({
      method: "delete",
      url: `/deleteproduct?id=${itemID}`,
    });
    getProduct();
    console.log(res);
    setOpen(false);
  };
  const router = useRouter();

  //CHANGE STATUS
  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({method:"post",url:`/status_change`,data:{id,
        stock_status: newStatus,}})
      

      if (res?.status === 200) {
        toast.success("Stock status updated");
        getProduct();
      } else {
        toast.error("Status update failed");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Error updating status");
    }
  };

  return (
    <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
      <table className="min-w-full bg-white rounded-2xl">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-sm font-semibold text-left border-b border-gray-300">
            <th className="px-6 py-4 text-left">Image</th>
            <th className="px-4 py-4 text-left">Product Name</th>
            <th className="px-4 py-4 text-left">Category</th>
            <th className="px-6 py-4 text-left">Description</th>
            <th className="px-6 py-4 text-left">Variation</th>
            <th className="px-6 py-4 text-right">Price</th>
            <th className="px-4 py-4 text-center">Stock</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {product ? (
            <>
              {product?.map((item: any) => (
                <tr
                  key={item?.Id}
                  className="hover:bg-gray-50 transition-all duration-300 text-center"
                >
                  <td className="px-4 py-6 border-b border-gray-200 text-left">
                    <Image
                      src={item.Image}
                      width={60}
                      height={40}
                      alt="product_image"
                      className="rounded-md object-contain"
                    />
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Product_Name}
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Category_Name}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Description}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Variation}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-right">
                    ${item?.Price}
                  </td>
                  <td className="px-4 py-6 border-b border-gray-200 text-center">
                    <div
                      onClick={() => changeStatus(item?.Id, item?.Stock_Status)}
                      className="inline-block cursor-pointer"
                    >
                      <GreenSwitch status={item?.Stock_Status} />
                    </div>
                  </td>

                  <td className="px-4 py-6 text-sm text-gray-700 border-b border-gray-200 text-center">
                    <div className="flex gap-6 justify-center items-center">
                      <span className="text-xl cursor-pointer">
                        <CiEdit
                          onClick={() =>
                            router.push(`/products/addProduct?id=${item?.Id}`)
                          }
                        />
                      </span>
                      <span
                        className="text-xl cursor-pointer "
                        onClick={() => {
                          handleClickOpen(), setItemID(item.Id);
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
              <tr className="w-full">
                <td className="ml-3  mt-2 text-center">No Data</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GetProduct;
