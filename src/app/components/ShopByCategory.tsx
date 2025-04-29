import Image from "next/image";
import React, { useState } from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
import { apiRequest } from "@/api/ApiCall";
import { Button } from "@mui/material";

const ShopByCategory = ({ component, getComponents }: any) => {
  const [shopCategogy, setShopCategogy] = useState([]);

  console.log("Compo Catgeoty", component);
  return (
    <div>
      <section className="bg-white p-4 rounded shadow mt-5 ">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold ">Shop by Category</h2>
        </div>
        <div className="flex gap-4 pb-2 w-full ">
          {component[0]?.shop_by_category?.map((item: any, index: any) => (
            <div
              key={index}
              className="w-[140px] bg-white overflow-y-hidden rounded-md  text-center relative shadow-sm"
            >
              <img
                src={item.image}
                alt={index + 1}
                className=" object-contain mx-auto mb-2 border-gray-500 p-3"
              />
              <h3 className="text-sm font-medium !text-left text-black">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 text-left ">
                {item.discount}
              </p>
              <button className="absolute top-1 right-1 bg-white rounded-full p-1 ">
                <Image src={off} alt="close" width={35} height={25} />
              </button>
            </div>
          ))}

          <div className="w-[120px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
            {/* <Button onClick={handleDelete}> */}
              <Image src={plus} alt="plus" width={50} height={55} />
            {/* </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopByCategory;
