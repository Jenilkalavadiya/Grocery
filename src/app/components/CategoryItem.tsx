import Image from "next/image";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
const CategoryItem = ({ category }:any) => {
  return (
    <div className="overflow-x-auto shadow-2xl ">
      <table className="min-w-full bg-white  rounded-2xl ">
        <thead className="bg-[#FAFAFA]] ">
          <tr>
            <th className="px-4 py-3  text-left text-sm font-bold text-gray-600  border-gray-300">
              NO
            </th>
            <th className="px-6 py-3 text-left text-sm font-bold text-gray-600  border-gray-300">
              Image
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600  border-gray-300">
              Category
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600  border-gray-300">
              Status
            </th>
            <th className="px-4 py-3 text-left text-sm font-bold text-gray-600  border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {category?.map((item: any) => (
            <tr key={item.id}
              className="hover:bg-gray-50 transition-all duration-200"
            >
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
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
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                {item?.Category_Name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item?.Status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {/* {item?.Status} */}
                  <input type="checkbox" defaultChecked className="toggle bg-gray-500   checked:bg-green-500 checked:text-white-800 checked:border-green-500 " />
                </span>
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
