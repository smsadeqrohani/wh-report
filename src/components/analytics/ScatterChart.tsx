import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function ScatterChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "scatter",
      zoom: {
        enabled: true,
        type: "xy",
      },
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B"],
    xaxis: {
      tickAmount: 10,
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
        formatter: (value) => `$${value}`,
      },
      title: {
        text: "Marketing Spend",
        style: { color: "#6B7280", fontSize: "14px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
        formatter: (value) => `$${value}K`,
      },
      title: {
        text: "Revenue",
        style: { color: "#6B7280", fontSize: "14px" },
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: (value) => `Marketing: $${value}`,
      },
      y: {
        formatter: (value) => `Revenue: $${value}K`,
      },
    },
  };

  const series = [
    {
      name: "Q1",
      data: [
        [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2],
      ],
    },
    {
      name: "Q2",
      data: [
        [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [6.4, 11.8], [3.6, 10.3], [9, 10], [39.9, 9], [7.1, 12.3], [1.4, 10], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [8.1, 14.7], [9, 10], [1.7, 11.8], [7.1, 10], [4.5, 10], [7.1, 10], [9.9, 11.5], [7.1, 10.8], [2.1, 12],
      ],
    },
    {
      name: "Q3",
      data: [
        [21.7, 3], [23.6, 3.5], [29.9, 5], [21.7, 3], [19, 2], [22.4, 2.5], [24.5, 2], [19, 1], [21.7, 2], [29.9, 3], [19, 2], [21.7, 1], [19, 3], [21.7, 2], [19, 1], [19, 1.5], [21.7, 2.5], [19, 2], [21.7, 3], [19, 2], [19, 1], [21.7, 2], [19, 2], [21.7, 1], [19, 2], [21.7, 2.5], [19, 2], [21.7, 3], [19, 2],
      ],
    },
  ];

  return <Chart options={options} series={series} type="scatter" height={350} />;
}

