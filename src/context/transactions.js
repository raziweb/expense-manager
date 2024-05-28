import { createContext, useState } from "react";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTransactions = () => {
    setTransactions([
      {
        id: 1,
        amount: 199,
        note: "Netflix",
        date: new Date(),
        category: { id: 1, type: "expense", name: "entertainment" },
      },
      {
        id: 2,
        amount: 540,
        note: "Electricity bill",
        date: new Date(),
        category: { id: 2, type: "expense", name: "utilities" },
      },
      {
        id: 3,
        amount: 8500,
        note: "May Rent",
        date: new Date(),
        category: { id: 3, type: "expense", name: "rent" },
      },
      {
        id: 4,
        amount: 250,
        note: "Shawarma",
        date: new Date(),
        category: { id: 4, type: "expense", name: "food and dining" },
      },
      {
        id: 5,
        amount: 150,
        note: "Uber",
        date: new Date(),
        category: { id: 5, type: "expense", name: "transport" },
      },
      {
        id: 6,
        amount: 52000,
        note: "Salary",
        date: new Date(),
        category: { id: 6, type: "income", name: "salary" },
      },
      {
        id: 7,
        amount: 5000,
        note: "consulting",
        date: new Date(),
        category: { id: 7, type: "income", name: "freelancing" },
      },
      {
        id: 8,
        amount: 400,
        note: "dividends",
        date: new Date(),
        category: { id: 8, type: "income", name: "others" },
      },
    ]);
    setCategories([
      { id: 1, type: "expense", name: "entertainment" },
      { id: 2, type: "expense", name: "utilities" },
      { id: 3, type: "expense", name: "rent" },
      { id: 4, type: "expense", name: "food and dining" },
      { id: 5, type: "expense", name: "transport" },
      { id: 6, type: "income", name: "salary" },
      { id: 7, type: "income", name: "freelancing" },
      { id: 8, type: "income", name: "others" },
    ]);
  };

  const addTransaction = (formData) => {
    const category = categories.find((category) => {
      if (formData.category == category.id) {
        return category;
      }
    });

    const newTransaction = {
      id: Math.round(Math.random() * 100000),
      amount: formData.amount,
      note: formData.note,
      date: formData.date,
      category: category,
    };

    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
  };

  const editTransaction = (id, formData) => {
    const category = categories.find((category) => {
      if (formData.category == category.id) {
        return category;
      }
    });

    const editedTransaction = {
      id: id,
      amount: formData.amount,
      note: formData.note,
      date: formData.date,
      category: category,
    };

    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id == editedTransaction.id) {
        return editedTransaction;
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => {
      return transaction.id != id;
    });

    setTransactions(updatedTransactions);
  };

  const valueToShare = {
    transactions: transactions,
    categories: categories,
    fetchTransactions: fetchTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={valueToShare}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionProvider };
export default TransactionContext;
