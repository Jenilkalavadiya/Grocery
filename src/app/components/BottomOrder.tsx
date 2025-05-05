import Image from "next/image";
import OrderTable from "./OrderTable";

interface OrderDetails {
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

interface BottomOrderProps {
  orderDetails: OrderDetails | null;
  orderTable: OrderTableItem[];
  total: OrderTotal | null;
}

const BottomOrder = ({ orderDetails, orderTable, total }: BottomOrderProps) => {
  return (
    <div className=" flex gap-4 w-full ">
      {/* BOTTOM LEFT */}
      <div className="w-[300px] p-5 mt-4 shadow-md h-[250px] border-gray-200 border">
        <div className="flex gap-2 items-center">
          <Image
            src="/user.png"
            alt="user Photo"
            width={100}
            height={100}
            className="rounded-full p-4"
          />
          <p className="font-bold text-lg">
            {orderDetails?.user?.firstname}
            {orderDetails?.user?.lastname}
          </p>
        </div>

        <div className="flex gap-4 mb-3 items-center">
          <Image
            src="/images/phoneicon.png"
            alt="mobile"
            width={18}
            height={18}
            className=""
          />
          <p className="">{orderDetails?.user?.mobile_no}</p>
        </div>
        <div className="flex gap-4 mb-3 items-center">
          <Image
            src="/images/mailicon.png"
            alt="email"
            width={18}
            height={18}
            className=""
          />
          <p className="">{orderDetails?.user?.email}</p>
        </div>

        <div className="flex gap-4 mt-2 items-center">
          <Image
            src="/images/locationicon.png"
            alt="address"
            width={18}
            height={18}
            className=""
          />
          <p className=" ">
            {orderDetails?.address?.address_line1}
            {orderDetails?.address?.address_line2}
          </p>
        </div>
      </div>

      {/* BOTTOM RIGHT TABLE DATA */}
      <div className="shadow-md border-gray-200 border  w-[1000px] mt-[-55px] p-5 flex ">
        {/* Order Table */}
        <OrderTable orderTable={orderTable} total={total} />
      </div>
    </div>
  );
};

export default BottomOrder;
