import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./user";

const TransactionContext = createContext();

function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displayedDate, setDisplayedDate] = useState(new Date());

  const navigate = useNavigate();
  const { user } = useContext(UserContext); 

  const API_URL = "https://exp-mngr-env.eba-jqeyayyj.ap-south-1.elasticbeanstalk.com";

  const token = localStorage.getItem("token");

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/hometransactions`,
        authHeader
      );
      setTransactions(response.data);
    } catch (e) {
      navigate("/login");
    }

    try {
      const response = await axios.get(
        `${API_URL}/category`,
        authHeader
      );
      setCategories(response.data);
    } catch (e) {
      console.log("cannot fetch Categories");
      navigate("/login");
    }

    setDisplayedDate(new Date());
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
      `${API_URL}/transactions`,
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
      `${API_URL}/transactions/${id}`,
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
      `${API_URL}/transactions/${id}`,
      authHeader
    );

    const updatedTransactions = transactions.filter((transaction) => {
      return transaction.id != id;
    });

    setTransactions(updatedTransactions);
  };

  const fetchTransactionsForGivenMonth = async (year, month) => {
    try {
      const response = await axios.get(
        `${API_URL}/transactions/${year}/${month}`,
        authHeader
      );
      setTransactions(response.data);
      // console.log(response.data);
    } catch (e) {
      console.log("cannot fetch transactions");
      navigate("/login");
    }
  }

  const previousMonth = () => {
    const previousMonthDate = new Date(displayedDate);
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    setDisplayedDate(previousMonthDate);
    fetchTransactionsForGivenMonth(
      previousMonthDate.getFullYear(),
      previousMonthDate.getMonth() + 1
    );
  };

  const nextMonth = () => {
    const nextMonthDate = new Date(displayedDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setDisplayedDate(nextMonthDate);
    fetchTransactionsForGivenMonth(
      nextMonthDate.getFullYear(),
      nextMonthDate.getMonth() + 1
    );
  };

  const valueToShare = {
    transactions: transactions,
    categories: categories,
    fetchTransactions: fetchTransactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    fetchTransactionsForGivenMonth,
    displayedDate,
    previousMonth,
    nextMonth
  };

  return (
    <TransactionContext.Provider value={valueToShare}>
      {children}
    </TransactionContext.Provider>
  );
}

export { TransactionProvider };
export default TransactionContext;
