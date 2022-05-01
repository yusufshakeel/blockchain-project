import Chart from "react-apexcharts";

function MinedBlockCoinsChart(props) {
  const { blocks } = props;

  const { categories, coins, colors } = blocks.reduce((result, block) => {
    const { index, coins } = block;
    return {
      categories: [`Block Index ${index}`, ...result.categories],
      coins: [coins, ...result.coins],
      colors: ["#00b412", ...result.colors]
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
    <div>
      <h4>Coins Involved/Block</h4>
      <p>Average: {Number((coins.reduce((sum, coin) => coin + sum, 0) / coins.length).toFixed(4))}</p>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
      />
    </div>
  );
}

export default MinedBlockCoinsChart;