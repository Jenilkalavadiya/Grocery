import TableLoading from "./TableLoading";

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

interface OrderTableProps {
  orderTable: OrderTableItem[];
  total: OrderTotal;
}

const OrderTable = ({ orderTable, total }: OrderTableProps) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead className="text-[#202020]">
          <tr className="text-md font-bold border-b border-gray-300">
            <th className="px-4 py-2 ">No.</th>
            <th className="px-4 py-2 ">Product Name</th>
            <th className="px-4 py-2 ">Variation</th>
            <th className="px-4 py-2 ">Price</th>
            <th className="px-4 py-2 ">Qty</th>
            <th className="px-4 py-2 ">Total</th>
          </tr>
        </thead>
        <tbody>
          {!orderTable ? (
            // Loading state
            <tr>
              <td colSpan={6} className="py-6">
                <div className="flex justify-center items-center w-full">
                  <TableLoading />
                </div>
              </td>
            </tr>
          ) : orderTable?.length === 0 ? (
            // No data found state
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          ) : (
            // Show data
            orderTable?.map((item: OrderTableItem) => (
              <tr
                key={item.order_product_Id}
                className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
              >
                <td className="px-4 py-3 text-sm ">{item?.order_product_Id}</td>
                <td className="px-4 py-3 text-md  ">{item?.product_name}</td>
                <td className="px-4 py-3 text-md  ">{item?.Variation}</td>
                <td className="px-4 py-3 text-md  ">{item?.product_price}</td>
                <td className="px-4 py-3 text-md  ">
                  {item?.product_quantity}
                </td>
                <td className="px-4 py-3 text-md  ">{item?.Total}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Total Grand Total */}
      <div className="w-full mt-2">
        <div className="flex w-full justify-between p-2 ">
          <p className="font-bold text-md">Total</p>
          <p className="font-bold text-md">{total?.total}</p>
        </div>
        <div className="flex w-full justify-between p-2 text-green-700">
          <p className="font-bold text-md">Shipping Charge</p>
          <p className="font-bold text-md">{total?.shipping_charge}</p>
        </div>
        <div className="flex w-full justify-between p-2 ">
          <p className="font-bold text-md">Tax</p>
          <p className="font-bold text-md">{total?.total_tax}</p>
        </div>
        <div className="flex w-full justify-between p-2 ">
          <p className="font-bold text-md">Grand Total</p>
          <p className="font-bold text-md">{total?.Grand_Total}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
