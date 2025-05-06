"use client";

import { apiRequest } from "@/api/ApiCall";
import CustomSeparator from "@/app/components/Bradcrumbs";
import TableLoading from "@/app/components/TableLoading";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Address {
  address_line1: string;
  address_line2: string;
}

interface Order {
  order_no: string;
  created_date: string;
  grand_total: string;
  payment_type: number;
  order_status: number;
}

interface UserDetails {
  firstname: string;
  lastname: string;
  mobile_no: string;
  email: string;
  is_active: number;
  address: Address[];
  order: Order[];
}

const Page = () => {
  const { id } = useParams();

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const pathname = usePathname();

  const isUserDetailsPage = pathname.startsWith("/users/");

  const getUserDetails = async () => {
    try {
      const res = await apiRequest({
        method: "get",
        url: `/get_user_details?id=${id}`,
      });
      console.log("order", res);
      if (res?.data) {
        setUserDetails(res?.data?.data?.result[0]);
        setOrders(res?.data?.data?.result[0]?.order || []);
      }
    } catch (error: unknown) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [id]);

  console.log("User Details:", userDetails);
  console.log("Orders:", orders);

  return (
    <div className="h-[calc(100vh-109px)]">
      <div className="flex  mt-5 flex-row justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020] mt-5 ">
            Users Details
          </h2>
          <div className=" mt-2">
            <CustomSeparator
              value1={"dashboard"}
              value2={"users"}
              value3={isUserDetailsPage ? "UserDetails" : undefined}
              className="flex"
            />
          </div>
        </div>
      </div>

      {/* Show loader if no userDetails yet */}
      {!userDetails ? (
        <TableLoading />
      ) : (
        <>
          <div className="flex flex-row items-center justify-between shadow-md bg-white my-5">
            <div>
              <Image
                src="/user.png"
                alt="user Photo"
                width={180}
                height={180}
                className="rounded-full p-4 "
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-black font-bold text-2xl md:mr-60 lg:mr-130 mb-3">
                {userDetails?.firstname} {userDetails?.lastname}
              </h1>
              <div className="flex flex-row items-center">
                <Image
                  src="/images/phoneicon.png"
                  alt="mobile"
                  width={18}
                  height={18}
                  className="mb-1"
                />
                <p className="ml-2 mb-2">{userDetails?.mobile_no}</p>
                <Image
                  src="/images/mailicon.png"
                  alt="email"
                  width={18}
                  height={18}
                  className="ml-4"
                />
                <p className="ml-2 mb-2">{userDetails?.email}</p>
              </div>
              <div className="flex flex-row items-center">
                <Image
                  src="/images/locationicon.png"
                  alt="address"
                  width={18}
                  height={18}
                  className="mb-1"
                />
                <p className="ml-2 mb-2">
                  {userDetails?.address?.map(
                    (address: Address, index: number) => (
                      <span key={index}>
                        {address?.address_line1}, {address?.address_line2}{" "}
                      </span>
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-row mr-15 ml-25 mb-20">
              <p className="text-gray-400 font-bold">
                Total Order:{" "}
                <span className="text-black font-bold">{orders?.length}</span>
              </p>
              <p className="text-gray-400 ml-7 font-bold">
                Status:{" "}
                <span className="text-black font-bold">
                  {userDetails?.is_active === 0 ? "Inactive" : "Active"}
                </span>
              </p>
            </div>
          </div>

          <div>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
              <thead>
                <tr>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    Order No.
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    Date
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    User Details
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    Amount
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    Payment Type
                  </th>
                  <th className="py-3 px-4 text-left text-md font-semibold text-black">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order: Order, index: number) => (
                  <tr key={index}>
                    <td className="py-3 px-4 text-md">{order.order_no}</td>
                    <td className="py-3 px-4 text-md">
                      {new Date(order.created_date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-md">
                      {userDetails?.firstname} {userDetails?.lastname}
                    </td>
                    <td className="py-3 px-4 text-md">{order.grand_total}</td>
                    <td className="py-3 px-4 text-md">
                      {order.payment_type === 0 ? "Cash" : "Card"}
                    </td>
                    <td
                      className={`py-3 px-4 text-md 
                      ${
                        order.order_status === 0
                          ? "text-orange-500"
                          : order.order_status === 1
                            ? "text-red-800"
                            : order.order_status === 3
                              ? "text-green-800"
                              : ""
                      }`}
                    >
                      {order.order_status === 0
                        ? "Preparing"
                        : order.order_status === 1
                          ? "Reject"
                          : order.order_status === 3
                            ? "Completed"
                            : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
