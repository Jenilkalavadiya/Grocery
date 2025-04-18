import Image from "next/image";
import React from "react";
import off from "../../../public/off.svg";
import plus from "../../../public/plus.png";
const categories = [
  {
    name: "Vegetables & Fruits",
    discount: "Min 23% OFF",
    image: "./hm10.png",
  },
  {
    name: "Foodgrains, Oil & Masala",
    discount: "Up to 30% OFF",
    image: "./hm11.png",
  },
  {
    name: "Eggs, Meat & Fish",
    discount: "Up to 25% OFF",
    image: "./hm12.png",
  },
  {
    name: "Kitchen, Garden & Pets",
    discount: "Up to 60% OFF",
    image: "./hm13.png",
  },
  {
    name: "Cleaning & Household",
    discount: "Up to 25% OFF",
    image: "./hm14.png",
  },
  {
    name: "Beverages",
    discount: "Up to 35% OFF",
    image: "./hm15.png",
  },
];
const BrandHomemange = () => {
  return (
    <section className="bg-white p-4 rounded shadow mt-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Brands</h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 w-full">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="min-w-[120px] bg-white rounded-md p-4 text-center relative shadow-sm"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-[150px] h-25 object-contain mx-auto mb-2 border-gray-500 p-3"
            />
            <h3 className="text-sm font-medium !text-left text-black">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-500 text-left ">{cat.discount}</p>
            <button className="absolute top-1 right-1 bg-white rounded-full p-1 ">
              <Image src={off} alt="close" width={35} height={25} />
            </button>
          </div>
        ))}
        Add new category
        <div className="min-w-[150px] h-[180px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
          <Image src={plus} alt="plus" width={50} height={55} />
        </div>
      </div>
    </section>
  );
};

export default BrandHomemange;
