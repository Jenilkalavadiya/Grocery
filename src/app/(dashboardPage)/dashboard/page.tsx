"use client";
import React, { useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/api/ApiCall";
import Link from "next/link"; // Import Link for routing

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
      <div className="p-8 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Link key={index} href={card.link}>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-all transform hover:scale-105 ease-in-out w-full max-w-[450px]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{card.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-700">
                    {card.title}
                  </h2>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {card.count ? card.count : 0}
                </div>
                <div className="text-sm text-gray-500">Details</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
