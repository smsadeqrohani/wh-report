import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function CustomerGrowthChart() {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981"],
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
    markers: {
      size: 4,
      hover: { size: 6 },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
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
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "14px",
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "New Customers",
      data: [120, 190, 300, 500, 200, 300, 450, 350, 400, 500, 600, 700],
    },
    {
      name: "Active Users",
      data: [800, 950, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
}

