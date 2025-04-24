"use client";
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the chart to prevent SSR issues
const MyChart = dynamic(() => import("../../components/MyChart"), {
  ssr: false,
});
const Dashboard = () => {
  const cards = [
    { title: "Users", count: 1200, icon: "👤" },
    { title: "Products", count: 320, icon: "📦" },
    { title: "Brands", count: 45, icon: "🏷️" },
    { title: "Coupon Management", count: 12, icon: "🎟️" },
  ];

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
              <div className="text-3xl font-bold text-gray-700">
                {card.count}
              </div>
            </div>
          ))}
          {/* <MyChart /> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
