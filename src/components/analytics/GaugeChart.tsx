import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function GaugeChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "radialBar",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF"],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#E5E7EB",
          strokeWidth: "67%",
          margin: 0,
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#6B7280",
            fontSize: "17px",
          },
          value: {
            formatter: (val: number) => `${Math.round(val)}%`,
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#10B981"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Performance"],
  };

  const series = [75];

  return <Chart options={options} series={series} type="radialBar" height={350} />;
}

