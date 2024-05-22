import { createContext, useState } from "react";

const TransactionContext = createContext();

function TransactionProvider({children}) {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = () => {
    setTransactions([
      { id: 1, amount: 199, note: "Netflix", date: "10-03-2024", category: {id:1, type:"expense", name: "entertainment"} },
      { id: 2, amount: 540, note: "Electricity bill", date: "10-03-2024", category: {id:2, type:"expense", name: "utilities"} },
      { id: 3, amount: 8500, note: "May Rent", date: "11-03-2024", category: {id:3, type:"expense", name: "rent"} },
      { id: 4, amount: 250, note: "Shawarma", date: "12-03-2024", category: {id:4, type:"expense", name: "food and dining"} },
      { id: 5, amount: 150, note: "Uber", date: "13-03-2024", category: {id:5, type:"expense", name: "transport"} },
      { id: 6, amount: 52000, note: "Salary", date: "14-03-2024", category: {id:6, type:"income", name: "salary"} },
      { id: 7, amount: 5000, note: "consulting", date: "15-03-2024", category: {id:7, type:"income", name: "freelancing"} },
      { id: 8, amount: 400, note: "dividends", date: "16-03-2024", category: {id:8, type:"income", name:"others"} },
    ]);
  }

  const valueToShare = {
    transactions: transactions,
    fetchTransactions: fetchTransactions
  }

  return <TransactionContext.Provider value={valueToShare}>
    {children}
  </TransactionContext.Provider>
}

export {TransactionProvider}
export default TransactionContext;
