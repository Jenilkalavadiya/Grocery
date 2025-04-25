"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { apiRequest } from "@/api/ApiCall";

// Dynamically import the chart to prevent SSR issues
const MyChart = dynamic(() => import("../../components/MyChart"), {
  ssr: false,
});
const Dashboard = () => {
  const [num, setNum] = useState([]);
  const cards = [
    { title: "Users", count: num?.user_count, icon: "👤" },
    { title: "Products", count: num?.product_count, icon: "📦" },
    { title: "Brands", count: num?.brands_count, icon: "🏷️" },
    { title: "Coupon Management", count: num?.coupon_count, icon: "🎟️" },
    { title: "Category", count: num?.category_count, icon: "🗂️" },
    { title: "Sub Category", count: num?.sub_category_count, icon: "🧾" },
  ];

  const getDashboard = async () => {
    const res = await apiRequest({
      method: "get",
      url: "/get_dashboard_detail",
    });
    setNum(res?.data?.data);
  };

  useEffect(() => {
    getDashboard();
  }, []);
  console.log("response", num);

  return (
    <>
      <div className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{card.icon}</span>
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>
              <span className="text-2xl">{card.count}</span>
              <div className="text-3xl font-bold text-gray-700"></div>
            </div>
          ))}
          {/* <MyChart /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
