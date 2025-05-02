import { Bar } from "react-chartjs-2";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Bar_chart = ({ num }: any) => {
  return (
    <div className="w-[750px] my-10">
      <h1 className="text-2xl text-black text-center font-bold">Bar Chart</h1>
      <Bar
        className=""
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
              backgroundColor: [
                "#3b82f6",
                "#facc15",
                "#10b981",
                "#f97316",
                "#a855f7",
                "#ef4444",
                "#0ea5e9",
              ],
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default Bar_chart;
