import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { Button } from "@mui/material";
import Brands_post from "@/utils/Brands_post";
import { apiRequest } from "@/api/ApiCall";
import { toast } from "react-toastify";

const BrandHomemange = ({ component, getComponents }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (itemID: number) => {
    await apiRequest({
      method: "delete",
      url: `/delete_home_management?id=${itemID}&fkSectionId=3`,
    });
    toast.success("Banner Deleted");
    getComponents();
  };
  return (
    <section className="bg-white p-4 rounded shadow mt-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Brands</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {component[0]?.section_brand[0]?.section_brand?.map((item, index) => (
          <div
            key={index}
            className="w-[160px] bg-white rounded-sm relative shadow-md border border-gray-300 flex items-center justify-center cursor-pointer"
          >
            <Image
              src={item.image}
              width={150}
              height={100}
              alt={item.name || ""}
              className=" object-contain mx-auto border-gray-500 "
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
