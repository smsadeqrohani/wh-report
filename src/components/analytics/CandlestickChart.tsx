import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function CandlestickChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "candlestick",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#10B981", "#EF4444"],
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: { colors: "#6B7280", fontSize: "12px" },
        formatter: (value) => `$${value.toFixed(0)}`,
      },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      data: [
        {
          x: new Date("2024-01-01").getTime(),
          y: [6629.81, 6650.5, 6623.04, 6633.33],
        },
        {
          x: new Date("2024-01-02").getTime(),
          y: [6632.01, 6643.59, 6620, 6630.11],
        },
        {
          x: new Date("2024-01-03").getTime(),
          y: [6630.71, 6648.95, 6623.34, 6635.65],
        },
        {
          x: new Date("2024-01-04").getTime(),
          y: [6635.65, 6651, 6629.67, 6638.24],
        },
        {
          x: new Date("2024-01-05").getTime(),
          y: [6638.24, 6640, 6620, 6624.47],
        },
        {
          x: new Date("2024-01-06").getTime(),
          y: [6624.53, 6636.03, 6621.68, 6624.31],
        },
        {
          x: new Date("2024-01-07").getTime(),
          y: [6624.61, 6632.2, 6617, 6626.02],
        },
        {
          x: new Date("2024-01-08").getTime(),
          y: [6627, 6627.62, 6584.22, 6603.02],
        },
        {
          x: new Date("2024-01-09").getTime(),
          y: [6603.02, 6605, 6581, 6583.16],
        },
        {
          x: new Date("2024-01-10").getTime(),
          y: [6583.16, 6598, 6570, 6588.1],
        },
        {
          x: new Date("2024-01-11").getTime(),
          y: [6588.1, 6598, 6576.39, 6589.02],
        },
        {
          x: new Date("2024-01-12").getTime(),
          y: [6589.02, 6614.38, 6587.99, 6609.99],
        },
        {
          x: new Date("2024-01-13").getTime(),
          y: [6609.99, 6618.99, 6605.99, 6610.69],
        },
        {
          x: new Date("2024-01-14").getTime(),
          y: [6610.69, 6616.99, 6605.99, 6612.58],
        },
        {
          x: new Date("2024-01-15").getTime(),
          y: [6612.58, 6615.13, 6605.09, 6612.01],
        },
      ],
    },
  ];

  return <Chart options={options} series={series} type="candlestick" height={350} />;
}

