"use client";

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
            {!order && (
              // Show loading
              <tr>
                <td colSpan={8} className="py-6">
                  <div className="flex justify-center items-center w-full">
                    <TableLoading />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderItems;
