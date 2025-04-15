import Image from "next/image";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import Greenswitch from "@/utils/Greenswitch";
import { _delete } from "@/api/ApiCall";
import DeleteDialog from "@/utils/DeleteDialog";

const CategoryItem = ({
  filteredCategories,
  getAllCategory,
  handleOpen,
}: any) => {
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    const res = await _delete(`/deletecategory?id=${itemID}`);
    getAllCategory();
    handleClose();
    console.log(res);
  };
  return (
    <div className="overflow-x-auto shadow-2xl mt-10">
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
          {filteredCategories?.result?.map((item: any) => (
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
                  width={60}
                  height={40}
                  alt="category_image"
                  className="rounded-full"
                />
              </td>
              <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                {item?.Category_Name}
              </td>
              <td className="px-4 py-3 text-md  border-b border-gray-200 text-left">
                <Greenswitch Status={item.Status} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                <div className="flex gap-4 items-center">
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      handleOpen(), setItemID(item.No);
                    }}
                  >
                    <CiEdit />
                  </span>
                  <span
                    className="text-2xl cursor-pointer"
                    onClick={() => {
                      handleClickOpen(), setItemID(item.No);
                    }}
                  >
                    <RiDeleteBin6Line />
                  </span>
                  {open && (
                    <DeleteDialog
                      open={open}
                      handleClose={handleClose}
                      handleDelete={handleDelete}
                    />
                  )}
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
