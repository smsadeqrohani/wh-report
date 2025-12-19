import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function PolarAreaChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "polarArea",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    labels: ["Marketing", "Sales", "Support", "Development", "Operations"],
    fill: {
      opacity: 0.8,
    },
    stroke: {
      width: 2,
      colors: ["#fff"],
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 1,
        },
        spokes: {
          strokeWidth: 1,
        },
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
  };

  const series = [14, 23, 21, 17, 15];

  return <Chart options={options} series={series} type="polarArea" height={350} />;
}

