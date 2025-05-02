import Image from "next/image";
import React, { useState } from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { apiRequest } from "@/api/ApiCall";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import Shop_by_Category_post from "@/utils/Shop_by_Category_post";

const ShopByCategory = ({ component, getComponents }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (itemID: number) => {
    console.log("res", itemID);
    const res = await apiRequest({
      method: "delete",
      url: `/delete_home_management?id=${itemID}&fk_section_id=2`,
    });
    toast.success("Banner Deleted");
    getComponents();
  };

  console.log("Compo Catgeoty", component);
  return (
    <div>
      <section className="bg-white p-4 rounded shadow mt-5  ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold ">Shop by Category</h2>
        </div>
        <div className="flex gap-4 p-3.5">
          {component[0]?.shop_by_category?.map((item: any, index: any) => (
            <div
              key={index}
              className="w-[160px] bg-white overflow-y-hidden  text-center p-2 relative shadow-sm"
            >
              <img
                src={item.image}
                alt={index + 1}
                className="w-[140] h-[90px] object-contain mx-auto mb-2 border-gray-500 p-3"
              />
              <button
                onClick={() => {
                  handleDelete(item?.id);
                }}
              >
                <Image
                  src={off}
                  alt="close"
                  width={35}
                  height={25}
                  className="absolute top-1 right-1"
                />
              </button>
              <h3 className="text-sm font-medium !text-left text-black">
                {item.category?.category_name}
              </h3>
              <p className="text-sm text-gray-500 text-left ">{item.offer}</p>
            </div>
          ))}

          <div className="w-[160px] bg-[#FAFAFA] border-0 flex items-center justify-center  cursor-pointer">
            <Button onClick={handleOpen}>
              <Image src={plus} alt="plus" width={50} height={55} />
            </Button>
            {open && (
              <Shop_by_Category_post
                open={open}
                handleClose={handleClose}
                getComponents={getComponents}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopByCategory;
