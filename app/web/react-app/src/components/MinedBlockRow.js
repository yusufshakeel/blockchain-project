function MinedBlockRow(props) {
  const { index, coins, numberOfTransactions, timestamp } = props.block;
  return (
    <tr>
      <td>{index}</td>
      <td>{timestamp}</td>
      <td>{coins}</td>
      <td>{numberOfTransactions}</td>
    </tr>
  );
}

export default MinedBlockRow;