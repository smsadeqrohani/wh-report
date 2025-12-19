import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function QuarterlyRevenueChart() {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      height: 350,
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444"],
    labels: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
    legend: {
      position: "bottom",
      fontSize: "14px",
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val.toFixed(1)}%`,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: (value: number, { w }: any) => {
          const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
          return `$${((value / total) * 1000000).toLocaleString()}`;
        },
      },
    },
  };

  const series = [280000, 320000, 350000, 420000];

  return <Chart options={options} series={series} type="pie" height={350} />;
}

