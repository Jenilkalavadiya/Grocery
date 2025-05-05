"use client";
import { apiRequest } from "@/api/ApiCall";
import DeleteDialog from "@/utils/DeleteDialog";
import GreenSwitch from "@/utils/Greenswitch";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "react-toastify";
import TableLoading from "./TableLoading";

interface Coupon {
  No: number;
  Coupon_Name: string;
  Min_Purchase: number;
  Discount_Price: number;
  Coupon_Code: string;
  Date: string;
  Status: number;
}

interface CouponResponse {
  Total_Count: number;
  result: Coupon[];
}

interface GetCouponProps {
  coupon: CouponResponse | null;
  getCoupon: () => void;
  handleOpen: () => void;
  setId: (id: number) => void;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const GetCoupon = ({
  coupon,
  getCoupon,
  handleOpen,
  setId,
}: GetCouponProps) => {
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState<number>();

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
      url: `/delete_coupon?id=${itemID}`,
    });
    toast.success("Deleted SuccessFull");
    getCoupon();
    console.log(res);
    setOpen(false);
  };

  //CHANGE STATUS
  const changeStatus = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    try {
      const res = await apiRequest({
        method: "post",
        url: `/status_change4`,
        data: { id, status: newStatus },
      });

      if (res?.status === 200) {
        toast.success("Coupon status updated");
        getCoupon();
      } else {
        toast.error("Status update failed");
      }
    } catch (err: unknown) {
      console.error("Status update error:", err);
      toast.error((err as ApiError)?.response?.data?.message);
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
              {coupon?.result?.map((item: Coupon) => (
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
                      <GreenSwitch status={item?.Status} />
                    </div>
                  </td>

                  <td className="px-4 py-6 text-sm text-gray-700 border-b border-gray-200 text-center">
                    <div className="flex gap-6 justify-center items-center">
                      <span className="text-xl cursor-pointer">
                        <CiEdit
                          onClick={() => {
                            handleOpen();
                            setId(item?.No);
                          }}
                        />
                      </span>
                      <span
                        className="text-xl cursor-pointer "
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

export default GetCoupon;
