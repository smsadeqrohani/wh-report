import { useMemo } from "react";
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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function PerformanceMetricsChart() {
  const data = useMemo(
    () => ({
      labels: ["Sales", "Marketing", "Support", "Development", "Operations", "Finance"],
      datasets: [
        {
          label: "Current Period",
          data: [85, 75, 90, 80, 70, 88],
          backgroundColor: "rgba(70, 95, 255, 0.2)",
          borderColor: "#465FFF",
          borderWidth: 2,
          pointBackgroundColor: "#465FFF",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#465FFF",
        },
        {
          label: "Previous Period",
          data: [70, 65, 75, 70, 60, 75],
          backgroundColor: "rgba(16, 185, 129, 0.2)",
          borderColor: "#10B981",
          borderWidth: 2,
          pointBackgroundColor: "#10B981",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#10B981",
        },
      ],
    }),
    []
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: 12, family: "Outfit, sans-serif" },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#6B7280",
          font: { size: 11, family: "Outfit, sans-serif" },
        },
        grid: {
          color: "#E5E7EB",
        },
        pointLabels: {
          color: "#6B7280",
          font: { size: 12, family: "Outfit, sans-serif" },
        },
      },
    },
  };

  return (
    <div style={{ height: "400px" }}>
      <Radar key="performance-metrics-radar" data={data} options={options} redraw={false} />
    </div>
  );
}

