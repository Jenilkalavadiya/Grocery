// components/MyChart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart data
const data = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3, 5],
      backgroundColor: ["#f87171", "#60a5fa", "#facc15", "#34d399"],
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: "Sample Bar Chart" },
  },
};

const MyChart = () => {
  return <Bar data={data} options={options} />;
};

export default MyChart;
