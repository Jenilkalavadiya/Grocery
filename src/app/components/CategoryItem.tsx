import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Greenswitch from "@/utils/Greenswitch";
const CategoryItem = ({ filteredCategories }: any) => {
  
  return (
    <div className="overflow-x-auto shadow-2xl ">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-gray-300">
            <th className="px-4 py-3 w-[150px]">No.</th>
            <th className="px-6 py-3 text-left w-[205px]">Image</th>
            <th className="px-4 py-3 text-left min-w-[500px]">Category</th>

            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories?.map((item: any) => (
            <tr
              key={item.No}
              className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
            >
              <td className="px-4 py-3 text-sm border-b border-gray-200">
                {item?.No}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                <Image
                  src={item.Image}
                  width={80}
                  height={40}
                  alt="category_image"
                  className="rounded-full"
                />
              </td>
              <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                {item?.Category_Name}
              </td>
              <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                <Greenswitch item={item} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                <div className="flex gap-4 items-center">
                  <span className="text-2xl cursor-pointer">
                    <CiEdit />
                  </span>
                  <span className="text-2xl cursor-pointer">
                    <RiDeleteBin6Line />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryItem;

//  <span
//                   className={`inline-block rounded-full text-xs font-semibold ${item?.Status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
//                 >
//                   {/* {item?.Status} */}
//                   <input
//                     type="checkbox"
//                     // defaultChecked
//                     checked={item?.Status}
//                     onChange={(e) =>
//                       handleStatusChange(item?.No, e.target.checked)
//                     }
//                     className="toggle bg-gray-500 checked:bg-green-500 checked:text-white-800 checked:border-green-500 "
//                   />
//                 </span>

// const handleStatusChange = async (
//   categoryId: number,
//   currentStatus: boolean
// ) => {
//   try {
//     // Call an API to update the status on the backend (POST or PUT request)
//     await axios.post(
//       `${process.env.NEXT_PUBLIC_BASEAPI}/getcategory?id=${categoryId}`,
//       {
//         categoryId: categoryId,
//         status: currentStatus ? 1 : 0,
//       },
//       {
//         headers: {
//           Authorizations: `${jwt}`,
//           refresh_token: refresh,
//         },
//       }
//     );

//     // Update the UI optimistically
//     setCategories((prevCategories: any) =>
//       prevCategories.map((item: any) =>
//         item.No === categoryId
//           ? { ...item, Status: currentStatus ? 1 : 0 }
//           : item
//       )
//     );
//     console.log("Category status updated successfully.");
//   } catch (error) {
//     console.error("Error updating category status:", error);
//   }
// };
