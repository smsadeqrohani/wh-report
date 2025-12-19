import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function ProductDistributionChart() {
  const options: ApexOptions = {
    chart: {
      type: "donut",
      height: 350,
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
    labels: ["Product A", "Product B", "Product C", "Product D", "Others"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(0)}%`,
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
  };

  const series = [35, 25, 20, 15, 5];

  return <Chart options={options} series={series} type="donut" height={350} />;
}

