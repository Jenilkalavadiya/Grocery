import { apiRequest } from "@/api/ApiCall";
import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { Button } from "@mui/material";
import BannerModal from "@/utils/Banner_post";
import { toast } from "react-toastify";

interface BannerItem {
  id: number;
  image: string;
}

interface BannerProps {
  component: {
    banner: BannerItem[];
  };
  getComponents: () => void;
}

const Banner = ({ component, getComponents }: BannerProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async (itemID: number) => {
    await apiRequest({
      method: "delete",
      url: `/delete_home_management?id=${itemID}&fk_section_id=1`,
    });

    toast.success("Banner Deleted");
    getComponents();
  };

  return (
    <section className="bg-white p-6 rounded shadow mt-5">
      <h2 className="text-lg font-semibold mb-3">Banner Slider</h2>
      <div className="flex gap-4 overflow-x-auto">
        {component?.banner?.map((item: BannerItem, index: number) => (
          <div key={index} className="relative min-w-[250px]">
            <Image
              width={200}
              height={200}
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
              getComponents={getComponents}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
