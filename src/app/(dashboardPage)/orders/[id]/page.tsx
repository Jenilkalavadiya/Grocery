"use client";
import BottomOrder from "@/app/components/BottomOrder";
import CustomSeparator from "@/app/components/Bradcrumbs";
import OrderTable from "@/app/components/OrderTable";
import TopOrder from "@/app/components/TopOrder";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@mui/material";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const pathname = usePathname();

  const isOrderDetailsPage = pathname.startsWith("/orders/");

  return (
    <div>
      <div className="flex justify-between items-center w-[100%] mt-10">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Orders Details</h2>
          <div className=" mt-2">
            <CustomSeparator
              value1="dashboard"
              value2="orders"
              // Conditionally pass value3 only if on the userdetails page
              value3={isOrderDetailsPage ? "OrderDetails" : undefined}
              className="flex"
            />
          </div>
        </div>

        <div className="searchfiled flex gap-3 mr-3">
          <Button
            onClick={() => {
              window.print();
            }}
            className="!bg-[#FCC827] !text-black !font-bold  p-12 "
          >
            {" "}
            Print
          </Button>
          <Button className="!bg-black !text-white !font-bold  p-12 ">
            {" "}
            Action
          </Button>
        </div>
      </div>

      <TopOrder />
      <BottomOrder orderDetails={orderDetails} />
    </div>
  );
};

export default OrderDetails;
