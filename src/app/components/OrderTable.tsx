import TableLoading from "./TableLoading";

const OrderTable = ({ orderDetails }: any) => {
  return (
    <table className="w-full">
      <thead className="text-[#202020]">
        <tr className="text-md font-bold border-b border-gray-300">
          <th className="px-4 py-3">No.</th>
          <th className="px-4 py-3 text-left">Product Name</th>
          <th className="px-4 py-3 text-left">Variation</th>
          <th className="px-4 py-3 text-left">Price</th>
          <th className="px-4 py-3 text-left">Qty</th>
          <th className="px-4 py-3 text-left">Total</th>
        </tr>
      </thead>
      <tbody>
        {!orderDetails ? (
          //  Loading state
          <tr>
            <td colSpan={8} className="py-6">
              <div className="flex justify-center items-center w-full">
                <TableLoading />
              </div>
            </td>
          </tr>
        ) : orderDetails?.result?.length === 0 ? (
          //  No data found state
          <tr>
            <td colSpan={8} className="py-6 text-center text-gray-500">
              No brands found.
            </td>
          </tr>
        ) : (
          // Show data
          orderDetails?.result?.map((item: any) => (
            <tr
              key={item.No}
              className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
            >
              <td className="px-4 py-3 text-sm border-b border-gray-200">
                {item?.No}
              </td>

              <td className="px-4 py-3 text-md border-b border-gray-200 ">
                {item?.Brand_Name}
              </td>
              <td className="px-4 py-3 text-md border-b border-gray-200 ">
                {item?.Category_Name}
              </td>
              <td className="px-4 py-3 text-md border-b border-gray-200 ">
                {item?.SubCategory_Name}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
