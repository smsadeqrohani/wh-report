import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function TreemapChart() {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "treemap",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontWeight: 600,
      },
      formatter: (text: string, op: any) => {
        return [text, op.value];
      },
      offsetY: -4,
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: "#EF4444",
            },
            {
              from: 0.001,
              to: 6,
              color: "#10B981",
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
      data: [
        {
          x: "Product A",
          y: 218,
        },
        {
          x: "Product B",
          y: 149,
        },
        {
          x: "Product C",
          y: 184,
        },
        {
          x: "Product D",
          y: 55,
        },
        {
          x: "Product E",
          y: 84,
        },
        {
          x: "Product F",
          y: 31,
        },
        {
          x: "Product G",
          y: 70,
        },
        {
          x: "Product H",
          y: 30,
        },
      ],
    },
  ];

  return <Chart options={options} series={series} type="treemap" height={350} />;
}

