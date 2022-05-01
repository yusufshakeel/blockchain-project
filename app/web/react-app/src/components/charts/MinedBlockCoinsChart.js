import Chart from "react-apexcharts";

function MinedBlockCoinsChart(props) {
  const { blocks } = props;

  const { categories, coins, colors } = blocks.reduce((result, block) => {
    const { index, coins } = block;
    return {
      categories: [`Block ${index}`, ...result.categories],
      coins: [coins, ...result.coins],
      colors: ['#00b412', ...result.colors],
    };
  }, { categories: [], coins: [], colors: [] });

  const data = {
    options: {
      chart: {
        id: "Coins/Block"
      },
      xaxis: {
        categories
      },
      colors,
      dataLabels: {
        enabled: false
      }
    },
    series: [
      {
        name: "Coins",
        data: coins
      }
    ]
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="bar"
    />
  );
}

export default MinedBlockCoinsChart;