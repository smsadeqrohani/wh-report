import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function AreaChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
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
      name: "Online",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
    {
      name: "Retail",
      data: [33, 52, 45, 37, 53, 32, 27, 41, 32, 32, 22, 26],
    },
    {
      name: "Wholesale",
      data: [13, 22, 15, 7, 23, 2, -3, 11, 2, 2, -8, -4],
    },
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
}

