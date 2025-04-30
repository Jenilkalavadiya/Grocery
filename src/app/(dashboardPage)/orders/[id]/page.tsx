"use client";
import BottomOrder from "@/app/components/BottomOrder";
import CustomSeparator from "@/app/components/Bradcrumbs";
import OrderTable from "@/app/components/OrderTable";
import TopOrder from "@/app/components/TopOrder";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@mui/material";
import { apiRequest } from "@/api/ApiCall";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderTable, setOrderTable] = useState([]);
  const [total, setTotal] = useState([]);

  const pathname = usePathname();
  const { id } = useParams();

  const isOrderDetailsPage = pathname.startsWith("/orders/");

  const getOrderDetails = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_order_products_details?id=${id}`,
      });
      console.log("order", res);
      if (res?.data) {
        setOrderDetails(res?.data?.data?.getDataById);
        setOrderTable(res?.data?.data?.getData);
        setTotal(res?.data?.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

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

      <TopOrder orderDetails={orderDetails}  />
      <BottomOrder orderDetails={orderDetails} orderTable={orderTable} total={total}/>
    </div>
  );
};

export default OrderDetails;
