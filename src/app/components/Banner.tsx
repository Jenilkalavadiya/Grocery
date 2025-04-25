import { apiRequest } from "@/api/ApiCall";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { Button } from "@mui/material";
import BannerModal from "@/utils/Banner_post";
import { toast } from "react-toastify";

const Banner = ({ banner, getBanners }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (itemID: number) => {
    console.log("res", itemID);
    const res = await apiRequest({
      method: "delete",
      url: `/delete_slider_with_banner?id=${itemID}`,
    });
    getBanners();
    toast.success("Banner Deleted");
  };

  // console.log("Addsection", banner);
  return (
    <section className="bg-white p-6 rounded shadow mt-5">
      <h2 className="text-lg font-semibold mb-3">Banner Slider</h2>
      <div className="flex gap-4 overflow-x-auto">
        {banner?.map((item: any, index: any) => (
          <div key={index} className="relative min-w-[250px]">
            <img
              src={item?.image}
              alt={`Banner ${index + 1}`}
              className="rounded-md h-40 w-full object-contain"
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
        {/* Add new banner */}
        <div className="flex items-center justify-center min-w-[250px] h-40 bg-[#FAFAFA] rounded-md cursor-pointer">
          <Button onClick={handleOpen}>
            <Image src={plus} alt="plus" width={50} height={55} />
          </Button>
          {open && (
            <BannerModal
              open={open}
              handleClose={handleClose}
              getBanners={getBanners}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
