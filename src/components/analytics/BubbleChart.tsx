import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BubbleChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bubble",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B"],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    xaxis: {
      tickAmount: 12,
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
      z: {
        formatter: (value) => `Orders: ${value}`,
      },
    },
  };

  const series = [
    {
      name: "Product A",
      data: [
        [16.4, 5.4, 120],
        [21.7, 2, 150],
        [25.4, 3, 180],
        [19, 2, 200],
        [10.9, 1, 90],
        [13.6, 3.2, 140],
        [10.9, 7.4, 110],
        [10.9, 0, 100],
        [16.4, 1.8, 130],
        [13.6, 0.3, 120],
        [13.6, 0, 110],
        [29.9, 0, 250],
        [27.1, 2.3, 220],
        [16.4, 0, 140],
        [13.6, 3.7, 130],
        [10.9, 5.2, 120],
        [16.4, 6.5, 150],
        [10.9, 0, 100],
        [24.5, 7.1, 200],
        [10.9, 0, 90],
        [8.1, 4.7, 80],
        [19, 0, 160],
        [21.7, 1.8, 180],
        [27.1, 0, 220],
        [24.5, 0, 200],
        [27.1, 0, 220],
        [29.9, 1.5, 250],
        [27.1, 0.8, 220],
        [22.1, 2, 190],
      ],
    },
    {
      name: "Product B",
      data: [
        [36.4, 13.4, 300],
        [1.7, 11, 50],
        [5.4, 8, 100],
        [9, 17, 150],
        [1.9, 4, 40],
        [3.6, 12.2, 80],
        [1.9, 14.4, 50],
        [1.9, 9, 40],
        [6.4, 11.8, 120],
        [3.6, 10.3, 80],
        [9, 10, 150],
        [39.9, 9, 350],
        [7.1, 12.3, 140],
        [1.4, 10, 30],
        [3.6, 13.7, 80],
        [1.9, 15.2, 50],
        [6.4, 16.5, 120],
        [0.9, 10, 20],
        [4.5, 17.1, 90],
        [10.9, 10, 200],
        [8.1, 14.7, 160],
        [9, 10, 150],
        [1.7, 11.8, 40],
        [7.1, 10, 140],
        [4.5, 10, 90],
        [7.1, 10, 140],
        [9.9, 11.5, 200],
        [7.1, 10.8, 140],
        [2.1, 12, 50],
      ],
    },
    {
      name: "Product C",
      data: [
        [21.7, 3, 180],
        [23.6, 3.5, 200],
        [29.9, 5, 250],
        [21.7, 3, 180],
        [19, 2, 160],
        [22.4, 2.5, 190],
        [24.5, 2, 210],
        [19, 1, 160],
        [21.7, 2, 180],
        [29.9, 3, 250],
        [19, 2, 160],
        [21.7, 1, 180],
        [19, 3, 160],
        [21.7, 2, 180],
        [19, 1, 160],
        [19, 1.5, 160],
        [21.7, 2.5, 180],
        [19, 2, 160],
        [21.7, 3, 180],
        [19, 2, 160],
        [19, 1, 160],
        [21.7, 2, 180],
        [19, 2, 160],
        [21.7, 1, 180],
        [19, 2, 160],
        [21.7, 2.5, 180],
        [19, 2, 160],
        [21.7, 3, 180],
        [19, 2, 160],
      ],
    },
  ];

  return <Chart options={options} series={series} type="bubble" height={350} />;
}

