import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function MixedChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B"],
    stroke: {
      width: [0, 4, 4],
      curve: "smooth",
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: false,
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
    yaxis: [
      {
        title: {
          text: "Revenue",
        },
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
          formatter: (value) => `$${(value / 1000).toFixed(0)}K`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Orders",
        },
        labels: {
          style: { colors: "#6B7280", fontSize: "12px" },
        },
      },
    ],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    tooltip: {
      theme: "dark",
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number, { seriesIndex }: any) => {
          if (seriesIndex === 0) {
            return `$${value.toLocaleString()}`;
          }
          return String(value);
        },
      },
    },
  };

  const series = [
    {
      name: "Revenue",
      type: "column",
      data: [44000, 55000, 41000, 67000, 22000, 43000, 54000, 62000, 58000, 71000, 68000, 79000],
    },
    {
      name: "Orders",
      type: "line",
      data: [1200, 1500, 1100, 1800, 900, 1400, 1600, 1900, 1700, 2100, 2000, 2300],
    },
    {
      name: "Target",
      type: "line",
      data: [50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000, 50000],
    },
  ];

  return <Chart options={options} series={series} type="line" height={350} />;
}

