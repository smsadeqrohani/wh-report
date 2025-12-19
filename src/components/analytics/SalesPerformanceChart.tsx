import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function SalesPerformanceChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["Q1", "Q2", "Q3", "Q4"],
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
        formatter: (value) => `$${(value / 1000).toFixed(0)}K`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "2023",
      data: [240000, 280000, 320000, 380000],
    },
    {
      name: "2024",
      data: [260000, 300000, 350000, 420000],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}

