import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./user";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext); 

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/hometransactions",
        authHeader
      );
      setTransactions(response.data);
    } catch (e) {
      console.log("cannot fetch transactions");
      navigate("/login");
    }

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

  function sqlFormatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const addTransaction = async (formData) => {
    const newTransaction = {
      amount: Number(formData.amount),
      note: formData.note,
      date: sqlFormatDate(formData.date),
      categoryId: Number(formData.category),
      userId: user.userId
    };

    const response = await axios.post(
      "http://localhost:8080/transactions",
      newTransaction,
      authHeader
    );

    const updatedTransactions = [response.data, ...transactions];
    setTransactions(updatedTransactions);
  };

  const editTransaction = async (id, formData) => {
    const date =
      typeof formData.date === "object"
        ? sqlFormatDate(formData.date)
        : formData.date;

    const editedTransaction = {
      amount: Number(formData.amount),
      note: formData.note,
      date: date,
      categoryId: Number(formData.category),
      userId: user.userId
    };

    const response = await axios.put(
      `http://localhost:8080/transactions/${id}`,
      editedTransaction,
      authHeader
    );

    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id == response.data.id) {
        return response.data;
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
  };

  const deleteTransaction = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/transactions/${id}`,
      authHeader
    );

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
