import { apiRequest } from "@/api/ApiCall";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
interface Banners {
  Image: string;
  Section_Name: string;
  Id: number;
}

const Banner = () => {
  const [banner, setBanner] = useState<Banners[]>([]);
  const getBanners = async () => {
    const res = await apiRequest({
      method: "get",
      url: `/get_slider_with_banner`,
    });
    const response = res?.data?.data?.result;
    console.log("response", response);
    setBanner(response);
  };

  const handleDelete = async (itemID: number) => {
    const res = await apiRequest({
      method: "delete",
      url: `/delete_slider_with_banner?id=${itemID}`,
    });
    getBanners();
    console.log("res", res);
  };

  useEffect(() => {
    getBanners();
  }, []);
  return (
    <section className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Banner Slider</h2>
      <div className="flex gap-4 overflow-x-auto">
        {banner?.map((item, index) => (
          <div key={index} className="relative min-w-[250px]">
            <img
              src={item?.Image}
              alt={`Banner ${index + 1}`}
              className="rounded-md h-40 w-full object-contain"
            />
            <button
              onClick={() => {
                handleDelete(item?.Id);
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
          <Image src={plus} alt="plus" width={50} height={55} />
        </div>
      </div>
    </section>
  );
};

export default Banner;
