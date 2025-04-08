import Greenswitch from "@/utils/Greenswitch";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const Subcategoryitem = ({ subcategory }: any) => {
  console.log("subcategory", subcategory);

  return (
    <div className="overflow-x-auto shadow-2xl ">
      <table className="min-w-full bg-white rounded-2xl ">
        <thead className="bg-[#FAFAFA] text-[#202020]">
          <tr className="text-md  font-bold border-gray-300">
            <th className="px-4 py-3 w-[150px]">No.</th>
            <th className="px-6 py-3 text-left w-[205px]">Image</th>
            <th className="px-6 py-3 text-left w-[205px]">Name</th>
            <th className="px-4 py-3 text-left min-w-[500px]">Category</th>

            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategory?.map((item: any) => (
            <tr
              key={item.No}
              className="hover:bg-gray-50 w-[90px] text-center transition-all duration-200"
            >
              <td className="px-4 py-3 text-sm border-b border-gray-200">
                {item?.No}
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                <Image
                  src={item?.Image}
                  width={80}
                  height={40}
                  alt="category_image"
                  className="rounded-full object-contain"
                />
              </td>
              <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                {item?.SubCategory_Name}
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

export default Subcategoryitem;
