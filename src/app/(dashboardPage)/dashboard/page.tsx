"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { apiRequest } from "@/api/ApiCall";
import { Skeleton } from "@mui/material";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import withAuth from "../../../protected/withAuth";
// Dynamically import the chart to prevent SSR issues

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
    try {
      const res = await apiRequest({
        method: "get",
        url: "/get_dashboard_detail",
      });
      setNum(res?.data?.data);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);
  // console.log("response", Object.keys(num).length);

  // const skeletonLength = Object.keys(num).length;
  return (
    <div className="p-6 h-[calc(100vh-80px)]">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.keys(num).length > 0
          ? cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{card.icon}</span>
                  <h2 className="text-lg font-semibold">{card.title}</h2>
                </div>
                <span className="text-2xl">
                  <CountUp end={card.count} duration={1} useEasing={false} />
                </span>
              </div>
            ))
          : cards.map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                animation="wave"
                width="100%"
                height={100}
                className="rounded-lg"
              />
            ))}
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
