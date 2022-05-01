function MinedTransactionRow(props) {
  const {
    timestamp,
    minedAt,
    transaction: {
      uuid,
      sender,
      receiver,
      transactionValue,
      feeValue,
      message
    }
  } = props.transaction;

  return (
    <tr>
      <td>{minedAt}</td>
      <td>
        <p>UUID: {uuid}</p>
        <p>Created At: {timestamp}</p>
        <p>Mined At: {minedAt}</p>
        <p>Sender: {sender}</p>
        <p>Receiver: {receiver}</p>
        <p>Transaction Coins: {transactionValue}</p>
        <p>Fee Coins: {feeValue}</p>
        <p>Message: {message}</p>
      </td>
    </tr>
  );
}

export default MinedTransactionRow;