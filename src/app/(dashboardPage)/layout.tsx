import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const layout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="flex !bg-white">
        <Sidebar />
        <div className="mt-[80px]  ">{children}</div>
      </div>
    </div>
  );
};

export default layout;
