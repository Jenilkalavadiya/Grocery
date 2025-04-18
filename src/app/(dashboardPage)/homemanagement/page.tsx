"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ModalHome from "@/utils/ModalHome";
import off from "../../../../public/off.svg";
import Image from "next/image";
import plus from "../../../../public/plus.png";
import { apiRequest } from "@/api/ApiCall";
import Banner from "@/app/components/Banner";
import CustomSeparator from "@/app/components/Bradcrumbs";
const bannerImages = ["./hm1.png", "./hm2.png"];

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
const page = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <div className="flex justify-between items-center w-[100%] mt-[30px]"> */}

      <div className="flex items-center justify-center px-7 py-5 mt-15 h-[75vh] ">
        <div className="flex flex-col justify-center items-center bg-white shadow-md w-[420px] py-10">
          <div>
            <h1 className="text-[30px] font-bold tracking-wide">
              Home Management
            </h1>
          </div>
          <div className="flex flex-row justify-center px-5 py-2">
            <div className="mt-2">
              <CustomSeparator
                value1={"dashboard"}
                value2={"homemanagement"}
                className="flex text-md"
              />
            </div>
          </div>
          <div className="py-4 px-2">
            <img
              src="./basket.png"
              alt="Basket-img"
              className="grayscale-100"
            />
          </div>
          <div className="py-3">
            <div>
              <Button
                className="!bg-[#FCC827] !text-black font-semibold h-[55px] p-1 w-[230px]"
                onClick={handleOpen}
              >
                Add Section
              </Button>
              {open && <ModalHome open={open} handleClose={handleClose} />}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <div className="mt-10 overflow-hidden">
        {/* {Banner Slider} */}
        {/* <Banner /> */}

        {/* Shop by Category */}
        {/* <section className="bg-white p-4 rounded shadow mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Shop by Category</h2>
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
                <p className="text-sm text-gray-500 text-left ">
                  {cat.discount}
                </p>
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
        </section> */}

        {/* {Advertisment} */}

        {/* <section className="bg-white p-4 rounded shadow mt-5">
          <h2 className="text-lg font-semibold mb-3">Advertisement</h2>
          <div className="flex gap-4 overflow-x-auto">
            {bannerImages.map((src, index) => (
              <div key={index} className="relative min-w-[300px]">
                <img
                  src={src}
                  alt={`Banner ${index + 1}`}
                  className="rounded-md h-40 w-full object-cover"
                />
                <button>
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
            Add new advertisment
            <div className="flex items-center justify-center min-w-[300px] h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"></div>
          </div>
        </section> */}

        {/* Brands */}
        {/* <section className="bg-white p-4 rounded shadow mt-5">
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
                <p className="text-sm text-gray-500 text-left ">
                  {cat.discount}
                </p>
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
        </section> */}
      </div>
    </div>
  );
};

export default page;
