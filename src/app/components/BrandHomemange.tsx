import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { Button } from "@mui/material";
import Brands_post from "@/utils/Brands_post";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

const BrandHomemange = ({ component, getComponents }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (itemID: number) => {
    console.log("res", itemID);
    const res = await apiRequest({
      method: "delete",
      url: `/delete_home_management?id=${itemID}&fk_section_id=3`,
    });
    toast.success("Banner Deleted");
    getComponents();
  };
  console.log("brandsss", component);
  return (
    <section className="bg-white p-4 rounded shadow mt-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Brands</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {component[0]?.section_brand?.map((item: any, index: any) => (
          <div
            key={index}
            className="w-[160px] bg-white rounded-sm relative shadow-sm h-[150px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-[150px] h-[100px] object-contain mx-auto mb-2 border-gray-500 "
            />
            {/* <h3 className="text-sm font-medium !text-left text-black">
              {cat.name}
            </h3> */}
            {/* <p className="text-sm text-gray-500 text-left ">{item.discount}</p> */}
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
          </div>
        ))}
        <div className="w-[160px] bg-[#FAFAFA] border-0 flex items-center justify-center  cursor-pointer">
          <Button onClick={handleOpen}>
            <Image src={plus} alt="plus" width={50} height={55} />
          </Button>
          {open && (
            <Brands_post
              open={open}
              handleClose={handleClose}
              getComponents={getComponents}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default BrandHomemange;
