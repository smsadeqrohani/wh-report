import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function SalesByRegionChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 8,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    xaxis: {
      categories: ["North", "South", "East", "West", "Central"],
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
      show: false,
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
      name: "Sales",
      data: [450000, 380000, 420000, 350000, 290000],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}

