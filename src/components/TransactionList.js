import TransactionShow from "../components/TransactionShow";

function TransactionList({ transactions }) {
  console.log(transactions);

  const renderedTransactions = transactions.map((transaction)=>{
      return <TransactionShow key={transaction.id} transaction={transaction} />
  })

  return (
    <div>
      {renderedTransactions}
    </div>
  );
}

export default TransactionList;
