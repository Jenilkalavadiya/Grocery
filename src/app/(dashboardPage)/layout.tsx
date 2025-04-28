import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const layout = ({ children }: any) => {
  return (
    <div>
      <Header />

      <div className="flex !bg-white ">
        <Sidebar />
        <div className="mt-[80px] px-[56px] w-full bg-[#F0F0F0] h-[885px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
