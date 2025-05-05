import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="flex !bg-white ">
        <Sidebar />
        <div className="mt-[80px] px-[56px] overflow-x-hidden w-full bg-[#F0F0F0] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
