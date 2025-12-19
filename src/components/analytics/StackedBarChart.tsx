import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function StackedBarChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444"],
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
    fill: {
      opacity: 1,
    },
  };

  const series = [
    {
      name: "Product A",
      data: [44000, 55000, 41000, 67000, 22000, 43000],
    },
    {
      name: "Product B",
      data: [35000, 41000, 36000, 52000, 31000, 37000],
    },
    {
      name: "Product C",
      data: [28000, 32000, 29000, 41000, 25000, 30000],
    },
    {
      name: "Product D",
      data: [15000, 18000, 16000, 22000, 14000, 17000],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}

