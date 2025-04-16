"use client";
import { _delete, _post } from "@/api/ApiCall";
import DeleteDialog from "@/utils/DeleteDialog";
import GreenSwitch from "@/utils/Greenswitch";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";

const GetCoupon = ({ coupon, getCoupon }: any) => {
  const router = useRouter();
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
    const res = await _delete(`/delete_coupon?id=${itemID}`);
    getCoupon();
    console.log(res);
    setOpen(false);
  };

  //CHANGE STATUS
  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await _post(`/status_change4`, {
        id,
        status: newStatus,
      });

      if (res?.status === 200) {
        toast.success("Coupon status updated");
        getCoupon();
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
            <th className="px-6 py-4 text-left">No</th>
            <th className="px-4 py-4 text-left">Coupon Name</th>
            <th className="px-4 py-4 text-left">Min Purchase</th>
            <th className="px-6 py-4 text-left">Discount Price</th>
            <th className="px-6 py-4 text-left">Coupon Code</th>
            <th className="px-6 py-4 text-left">Date</th>
            <th className="px-4 py-4 text-center">Status</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupon ? (
            <>
              {coupon?.result?.map((item: any) => (
                <tr
                  key={item?.No}
                  className="hover:bg-gray-50 transition-all duration-300 text-center"
                >
                  <td className="px-4 py-6 border-b border-gray-200 text-left">
                    {item?.No}
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Coupon_Code}
                  </td>
                  <td className="px-4 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Min_Purchase}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Discount_Price}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Coupon_Code}
                  </td>
                  <td className="px-6 py-6 text-sm border-b border-gray-200 text-left">
                    {item?.Date}
                  </td>
                  <td className="px-4 py-6 border-b border-gray-200 text-center">
                    <div
                      onClick={() => changeStatus(item?.No, item?.Status)}
                      className="inline-block cursor-pointer"
                    >
                      <GreenSwitch Status={item?.Status} />
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

export default GetCoupon;
