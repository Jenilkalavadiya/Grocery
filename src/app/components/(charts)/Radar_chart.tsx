import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register required components for radar charts
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ num }: any) => {
  return (
    <div className="w-[470px] my-10">
      <h1 className="text-2xl text-black text-center font-bold">Radar Chart</h1>
      <Radar
        data={{
          labels: [
            "Users",
            "Brands",
            "Products",
            "Categories",
            "Sub-Categories",
            "Orders",
            "Coupons",
          ],
          datasets: [
            {
              label: "Total Count",
              data: [
                num.user_count,
                num.brands_count,
                num.product_count,
                num.category_count,
                num.sub_category_count,
                num.order_count,
                num.coupon_count,
              ],
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "#3b82f6",
              pointBackgroundColor: "#3b82f6",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
            },
          },
          scales: {
            r: {
              ticks: {
                beginAtZero: true,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RadarChart;
