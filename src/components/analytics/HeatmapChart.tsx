import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function HeatmapChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "heatmap",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    colors: ["#465FFF"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 8,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: "#E5E7EB",
            },
            {
              from: 51,
              to: 100,
              color: "#9CA3AF",
            },
            {
              from: 101,
              to: 200,
              color: "#465FFF",
            },
          ],
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "Week 1",
      data: [
        { x: "Mon", y: 65 },
        { x: "Tue", y: 59 },
        { x: "Wed", y: 80 },
        { x: "Thu", y: 81 },
        { x: "Fri", y: 56 },
        { x: "Sat", y: 55 },
        { x: "Sun", y: 40 },
      ],
    },
    {
      name: "Week 2",
      data: [
        { x: "Mon", y: 62 },
        { x: "Tue", y: 59 },
        { x: "Wed", y: 90 },
        { x: "Thu", y: 81 },
        { x: "Fri", y: 56 },
        { x: "Sat", y: 55 },
        { x: "Sun", y: 50 },
      ],
    },
    {
      name: "Week 3",
      data: [
        { x: "Mon", y: 65 },
        { x: "Tue", y: 59 },
        { x: "Wed", y: 80 },
        { x: "Thu", y: 81 },
        { x: "Fri", y: 56 },
        { x: "Sat", y: 55 },
        { x: "Sun", y: 40 },
      ],
    },
    {
      name: "Week 4",
      data: [
        { x: "Mon", y: 72 },
        { x: "Tue", y: 69 },
        { x: "Wed", y: 95 },
        { x: "Thu", y: 91 },
        { x: "Fri", y: 66 },
        { x: "Sat", y: 65 },
        { x: "Sun", y: 60 },
      ],
    },
  ];

  return <Chart options={options} series={series} type="heatmap" height={350} />;
}

