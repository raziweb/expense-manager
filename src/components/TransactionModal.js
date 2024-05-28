import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TransactionContext from "../context/transactions";

function TransactionModal({ handleCloseModal, transaction }) {
  const [formData, setFormData] = useState({
    transactionType: "expense",
    category: "",
    amount: "",
    note: "",
    date: new Date(),
  });

  const headingText = transaction ? "Edit transaction" : "Add transaction";
  const buttonText = transaction ? "Edit" : "Add";

  const { categories, addTransaction, editTransaction, deleteTransaction } =
    useContext(TransactionContext);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
  };

  const handleDateChange = (newDate) => {
    const updatedFormData = { ...formData, date: newDate };
    setFormData(updatedFormData);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (transaction) {
      editTransaction(transaction.id, formData);
    } else {
      addTransaction(formData);
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    handleCloseModal();
  }

  useEffect(() => {
    if (transaction) {
      const updatedFormData = {
        transactionType: transaction.category.type,
        category: transaction.category.id,
        amount: transaction.amount,
        note: transaction.note,
        date: transaction.date,
      };
      setFormData(updatedFormData);
    }
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const renderedExpenseCategories = categories.map((category) => {
    if (category.type === "expense") {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    }
  });

  const renderedIncomeCategories = categories.map((category) => {
    if (category.type === "income") {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    }
  });

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed inset-0 bg-gray-300 opacity-30"
      ></div>
      <div className="fixed top-[15%] left-[5%] lg:left-[30%] md:left-[30%] bg-white p-6 w-[90%] lg:w-2/5 md:w-2/5 h-3/4 shadow rounded-lg">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row justify-start">
            <IoMdArrowRoundBack
              onClick={handleCloseModal}
              className="text-2xl my-auto mr-2 cursor-pointer"
            />
            <p className="text-xl">{headingText}</p>
          </div>
          {transaction && <MdDelete onClick={handleDelete} className="text-2xl my-auto cursor-pointer"/>}
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="mt-4 flex flex-row justify-start">
            <div
              className={`${
                formData.transactionType === "expense" && "bg-red-400"
              } mr-2 border-1 p-1 rounded-lg shadow`}
            >
              <label htmlFor="expense" className="mx-1 cursor-pointer">
                Expense
              </label>
              <input
                type="radio"
                id="expense"
                name="transactionType"
                value="expense"
                checked={formData.transactionType === "expense"}
                onChange={handleFormChange}
                className="appearance-none"
              />
            </div>
            <div
              className={`${
                formData.transactionType === "income" && "bg-green-400"
              } border-1 mr-2 p-1 rounded-lg shadow`}
            >
              <label htmlFor="income" className="mx-1 cursor-pointer">
                Income
              </label>
              <input
                type="radio"
                id="income"
                name="transactionType"
                value="income"
                checked={formData.transactionType === "income"}
                onChange={handleFormChange}
                className="appearance-none"
              />
            </div>
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Category:</label>
            <select
              name="category"
              className="border-2 p-1"
              value={formData.category}
              onChange={handleFormChange}
              required
            >
              <option value="">select</option>
              {formData.transactionType === "expense" &&
                renderedExpenseCategories}
              {formData.transactionType === "income" &&
                renderedIncomeCategories}
            </select>
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Amount:</label>
            <input
              type="number"
              name="amount"
              className="border-2 p-1"
              placeholder="Rupees"
              value={formData.amount}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Note:</label>
            <input
              type="text"
              name="note"
              className="border-2 p-1"
              placeholder="Add a note"
              value={formData.note}
              onChange={handleFormChange}
            />
          </div>
          <div className="mt-4">
            <label className="mr-2">Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="border-2 p-1"
            />
          </div>
          <div className="mt-4 flex flex-row justify-center">
            <button className="border shadow-md px-4 py-1 bg-blue-500 rounded-md text-lg">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default TransactionModal;
