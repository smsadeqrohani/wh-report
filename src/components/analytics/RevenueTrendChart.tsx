import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function RevenueTrendChart() {
  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 0,
      hover: { size: 6 },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
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
      fontSize: "14px",
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
      name: "Revenue",
      data: [45000, 52000, 48000, 61000, 55000, 67000, 63000, 72000, 68000, 79000, 75000, 85000],
    },
    {
      name: "Profit",
      data: [28000, 32000, 30000, 38000, 34000, 42000, 39000, 45000, 43000, 49000, 47000, 53000],
    },
    {
      name: "Expenses",
      data: [17000, 20000, 18000, 23000, 21000, 25000, 24000, 27000, 25000, 30000, 28000, 32000],
    },
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
}

