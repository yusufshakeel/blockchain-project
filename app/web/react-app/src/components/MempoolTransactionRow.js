function MempoolTransactionRow(props) {
  const {
    timestamp,
    uuid,
    sender,
    receiver,
    transactionValue,
    feeValue
  } = props.transaction;

  return (
    <tr>
      <td>{timestamp}</td>
      <td>
        <p>UUID: {uuid}</p>
        <p>Sender: {sender}</p>
        <p>Receiver: {receiver}</p>
        <p>Transaction Coins: {transactionValue}</p>
        <p>Fee Coins: {feeValue}</p>
      </td>
    </tr>
  );
}

export default MempoolTransactionRow;