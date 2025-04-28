"use client";

import Link from "next/link";
import TableLoading from "./TableLoading";
const OrderItems = ({ order }: any) => {
  return (
    <div>
      <div className="overflow-x-auto shadow-2xl ">
        <table className="min-w-full bg-white rounded-2xl ">
          <thead className="bg-[#FAFAFA] text-[#202020]">
            <tr className="text-md border-b  font-bold border-gray-300">
              <th className="px-4 py-3 ">Order No</th>
              <th className="px-6 py-3  ">Date</th>
              <th className="px-6 py-3  ">User Details</th>
              <th className="px-4 py-3 ">Amount</th>
              <th className="px-4 py-3 ">Payment Type</th>
              <th className="px-4 py-3  ">Status</th>
            </tr>
          </thead>

          <tbody>
            {!order ? (
              //  Loading state
              <tr>
                <td colSpan={8} className="py-6">
                  <div className="flex justify-center items-center w-full">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            ) : order?.result?.length === 0 ? (
              //  No data found state
              <tr>
                <td colSpan={8} className="py-6 text-center text-gray-500">
                  No brands found.
                </td>
              </tr>
            ) : (
              // Show data
              order?.result?.map((item: any) => (
                <tr
                  key={item.Order_no}
                  className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
                >
                  <td className="px-4 py-3 text-sm  border-gray-200">
                    <Link href={`/orders/${item?.Order_no}`}>
                      {item?.Order_no}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-md  border-gray-200 ">
                    {new Date(item?.Date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-md  border-gray-200 ">
                    {item?.Firstname} {item?.Lastname}
                  </td>
                  <td className="px-4 py-3 text-md  border-gray-200 ">
                    ${item?.Total_Amount}
                  </td>
                  <td className="px-4 py-3 text-md  border-gray-200 ">
                    {item?.Payment_type === 0 ? "Cash" : "Card"}
                  </td>

                  <td
                    className={`py-3 px-4 text-md 
       ${ item.Status === 0? "text-orange-500": item.Status === 1 ? "text-red-800": item.Status === 3 ? "text-green-800" : ""
       }`}
                  >
                    {item.Status === 0? "Preparing": item.Status === 1? "Reject" : item.Status === 3 ? "Completed" : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItems;
