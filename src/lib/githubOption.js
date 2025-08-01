export const option = {
  animation: false,
  tooltip: {
    trigger: "axis",
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisLabel: {
      color: "#ccc",
    },
    axisLine: {
      lineStyle: {
        color: "#444",
      },
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#ccc",
    },
    axisLine: {
      lineStyle: {
        color: "#444",
      },
    },
    splitLine: {
      lineStyle: {
        color: "#333",
      },
    },
  },
  series: [
    {
      name: "Contributions",
      type: "line",
      stack: "Total",
      data: [25, 42, 35, 60, 75, 45, 90, 120, 85, 65, 45, 85],
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(64, 158, 255, 0.5)",
            },
            {
              offset: 1,
              color: "rgba(64, 158, 255, 0.1)",
            },
          ],
        },
      },
      lineStyle: {
        width: 2,
        color: "#409EFF",
      },
      itemStyle: {
        color: "#409EFF",
      },
      symbol: "circle",
      symbolSize: 6,
    },
  ],
};
