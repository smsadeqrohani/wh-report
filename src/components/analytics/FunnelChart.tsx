import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function FunnelChart() {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
        colors: ["#fff"],
      },
    },
    xaxis: {
      categories: ["Visitors", "Leads", "Qualified", "Proposals", "Closed"],
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  const series = [
    {
      name: "Conversion",
      data: [100, 75, 50, 35, 20],
    },
  ];

  return <Chart options={options} series={series} type="bar" height={350} />;
}

