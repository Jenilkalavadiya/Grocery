"use client";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex justify-end">
      <div className="navbar fixed bg-white shadow-lg  w-full h-[80px] z-10">
        <div className="flex justify-end">
          {/* <Image src="#" alt="pp" width={25} height={25} /> */}
          <span className="mr-4 text-2xl p-5">Admin</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
