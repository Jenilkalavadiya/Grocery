"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import ModalHome from "@/utils/ModalHome";

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
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div className="flex justify-between items-center w-[100%] mt-[30px]">
        <div>
          <h2 className="text-3xl font-bold !text-[#202020]">
            Home Management
          </h2>
        </div>

        <div className="searchfiled flex ">
          <Button
            className="!bg-[#FCC827] !text-black font-semibold h-[45px] p-1"
            onClick={handleOpen}
            // variant="outlined"
          >
            {" "}
            Add Section
          </Button>
          {open && <ModalHome open={open} handleClose={handleClose} />}
        </div>
      </div>

      <div className="mt-10">
        <section className="bg-white p-4 rounded shadow ">
          <h2 className="text-lg font-semibold mb-3">Banner Slider</h2>
          <div className="flex gap-4 overflow-x-auto">
            {bannerImages.map((src, index) => (
              <div key={index} className="relative min-w-[300px]">
                <img
                  src={src}
                  alt={`Banner ${index + 1}`}
                  className="rounded-md h-40 w-full object-cover"
                />
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                  {/* <X className="h-4 w-4 text-gray-600" /> */}
                </button>
              </div>
            ))}
            {/* Add new banner */}
            <div className="flex items-center justify-center min-w-[300px] h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
              {/* <Plus className="h-8 w-8 text-gray-400" /> */}
            </div>
          </div>
        </section>

        {/* Shop by Category */}
        <section className="bg-white p-4 rounded shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Shop by Category</h2>
          
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 w-full">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="min-w-[120px] bg-white border rounded-md p-2 text-center relative shadow-sm"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-20 object-contain mx-auto mb-2"
                />
                <h3 className="text-sm font-medium">{cat.name}</h3>
                <p className="text-xs text-gray-500">{cat.discount}</p>
                <button className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                  {/* <X className="h-4 w-4 text-gray-600" /> */}
                </button>
              </div>
            ))}
            {/* Add new category */}
            <div className="min-w-[120px] h-[150px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer">
              {/* <Plus className="h-6 w-6 text-gray-400" />     */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default page;
