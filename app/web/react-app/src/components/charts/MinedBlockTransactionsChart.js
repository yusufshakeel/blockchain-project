import Chart from "react-apexcharts";

function MinedBlockTransactionsChart(props) {
  const { blocks } = props;

  const { categories, numberOfTransactions, colors } = blocks.reduce((result, block) => {
    const { index, numberOfTransactions } = block;
    return {
      categories: [`Block Index ${index}`, ...result.categories],
      numberOfTransactions: [numberOfTransactions, ...result.numberOfTransactions],
      colors: ["#4673ff", ...result.colors]
    };
  }, { categories: [], numberOfTransactions: [], colors: [] });

  const data = {
    options: {
      chart: {
        id: "Transaction/Block"
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
        name: "Transactions",
        data: numberOfTransactions
      }
    ]
  };

  return (
    <div>
      <h4>Transactions/Block</h4>
      <p>Average: {Number(numberOfTransactions.reduce((sum, txn) => txn + sum, 0) / numberOfTransactions.length)}</p>
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
      />
    </div>
  );
}

export default MinedBlockTransactionsChart;