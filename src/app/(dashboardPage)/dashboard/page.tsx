"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/api/ApiCall";
import { Skeleton } from "@mui/material";
import CountUp from "react-countup";
import { toast } from "react-toastify";
import withAuth from "../../../protected/withAuth";
import Link from "next/link";
import Bar_chart from "@/app/components/(charts)/Bar_chart";
import RadarChart from "@/app/components/(charts)/Radar_chart";

const Dashboard = () => {
  const [num, setNum] = useState<any>([]);

  const cards = useMemo(
    () => [
      { title: "Users", count: num?.user_count, icon: "👤", link: "/users" },
      {
        title: "Products",
        count: num?.product_count,
        icon: "📦",
        link: "/products",
      },
      {
        title: "Brands",
        count: num?.brands_count,
        icon: "🏷️",
        link: "/brands",
      },
      {
        title: "Coupon Management",
        count: num?.coupon_count,
        icon: "🎟️",
        link: "/couponmanagment",
      },
      {
        title: "Category",
        count: num?.category_count,
        icon: "🗂️",
        link: "/category",
      },
      {
        title: "Sub Category",
        count: num?.sub_category_count,
        icon: "🧾",
        link: "/subcategory",
      },
      { title: "Orders", count: num?.order_count, icon: "🛒", link: "/orders" },
    ],
    [num]
  );

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
              <Link href={card.link} key={index}>
                <div
                  key={index}
                  className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl text-[#1E2939] font-semibold">
                      {card.title}
                    </span>
                    <h2 className="text-2xl">{card.icon}</h2>
                  </div>
                  <span className="text-4xl">
                    <CountUp end={card.count} duration={1} useEasing={false} />
                  </span>
                </div>
              </Link>
            ))
          : cards.map((_, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  {/* <Skeleton variant="text" width="60%" /> */}
                  <Skeleton variant="circular" width={20} height={40} />
                </div>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width="100%"
                  height={40}
                />
              </div>
            ))}
      </div>
      <div className="Chartys flex justify-between my-5">
        <Bar_chart num={num} />
        <RadarChart num={num} />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
