"use client";
import { apiRequest } from "@/api/ApiCall";
import CustomSeparator from "@/app/components/Bradcrumbs";
import OrderItems from "@/app/components/OrderItems";
import withAuth from "@/protected/withAuth";
import { Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface OrderItem {
  Order_no: string;
  Order_id: string;
  Date: string;
  Firstname: string;
  Lastname: string;
  Total_Amount: string;
  Payment_type: number;
  Status: number;
}

interface OrderData {
  result: OrderItem[];
}

const Order = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<OrderData | null>(null);

  const getOrderList = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_orders`,
      });
      setOrder(res?.data?.data);
    } catch (error) {
      toast.error(error)
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="text-black h-[calc(100vh-111px)]">
      {/* SERCH INPUT  */}
      <div className="flex justify-between items-center w-[100%] my-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">Orders</h2>
          <div className=" mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"orders"}
              className="flex"
            />
          </div>
        </div>
      </div>

      {/* USERS TABLE************  */}
      <div className=" m-auto mt-3">
        <OrderItems order={order} />
      </div>

      {/* // PAGINATION ******* */}
      <div className="flex justify-end mt-6 mr-8 mb-8">
        <Stack spacing={2}>
          <Pagination
            //  count={Math.ceil(Number(user?.Total_Count) / 5)}
            page={page}
            onChange={(e, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default withAuth(Order);
