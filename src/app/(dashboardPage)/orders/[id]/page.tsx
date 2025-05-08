"use client";
import BottomOrder from "@/app/components/BottomOrder";
import CustomSeparator from "@/app/components/Bradcrumbs";
import TopOrder from "@/app/components/TopOrder";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { Button } from "@mui/material";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

interface OrderDetailsData {
  order_no: string;
  order_type: number;
  payment_type: number;
  order_status: number;
  user: {
    firstname: string;
    lastname: string;
    mobile_no: string;
    email: string;
  };
  address: {
    address_line1: string;
    address_line2: string;
  };
}

interface OrderTableItem {
  order_product_Id: string;
  product_name: string;
  Variation: string;
  product_price: string;
  product_quantity: string;
  Total: string;
}

interface OrderTotal {
  total: string;
  shipping_charge: string;
  total_tax: string;
  Grand_Total: string;
}

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsData | null>(
    null
  );
  const [orderTable, setOrderTable] = useState<OrderTableItem[]>([]);
  const [total, setTotal] = useState<OrderTotal | null>(null);

  const pathname = usePathname();
  const { id } = useParams();

  const isOrderDetailsPage = pathname.startsWith("/orders/");

  const getOrderDetails = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_order_products_details?id=${id}`,
      });
      if (res?.data) {
        setOrderDetails(res?.data?.data?.getDataById);
        setOrderTable(res?.data?.data?.getData);
        setTotal(res?.data?.data);
      }
    } catch (error) {
           toast.error(error)
     
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  return (
    <div className="h-[calc(100vh-125px)]">
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

      <TopOrder orderDetails={orderDetails} />
      <BottomOrder
        orderDetails={orderDetails}
        orderTable={orderTable}
        total={total}
      />
    </div>
  );
};

export default OrderDetails;
