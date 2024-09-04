import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TransactionContext from "../context/transactions";
import { ResponsiveContainer, Tooltip, PieChart, Pie } from "recharts";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function SpendingAnalysis() {
  const [displayedDate, setDisplayedDate] = useState(new Date());

  const { transactions, fetchTransactionsForGivenMonth } =
    useContext(TransactionContext);

  const expenseData = transactions
    .filter((transaction) => {
      return transaction.category.type === "expense";
    })
    .map((transaction) => {
      return {
        amount: transaction.amount,
        name: transaction.category.name,
      };
    });

  const groupedExpensesObj = expenseData.reduce((acc, expense) => {
    if (!acc[expense.name]) {
      acc[expense.name] = 0;
    }
    acc[expense.name] += expense.amount;
    return acc;
  }, {});

  const groupedExpensesData = Object.keys(groupedExpensesObj).map((name) => ({
    name,
    amount: groupedExpensesObj[name],
  }));

  let totalExpense = 0;
  groupedExpensesData.forEach((expense) => {
    totalExpense += expense.amount;
  });

  const incomeData = transactions
    .filter((transaction) => {
      return transaction.category.type === "income";
    })
    .map((transaction) => {
      return {
        amount: transaction.amount,
        name: transaction.category.name,
      };
    });

  const groupedIncomeObj = incomeData.reduce((acc, income) => {
    if (!acc[income.name]) {
      acc[income.name] = 0;
    }
    acc[income.name] += income.amount;
    return acc;
  }, {});

  const groupedIncomeData = Object.keys(groupedIncomeObj).map((name) => ({
    name,
    amount: groupedIncomeObj[name],
  }));

  let totalIncome = 0;
  groupedIncomeData.forEach((income) => {
    totalIncome += income.amount;
  });

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

  const expenseTable = groupedExpensesData.map((data, index) => (
    <div key={index} className="flex justify-between px-16">
      <p> {data.name}</p>
      <p> {data.amount}</p>
    </div>
  ));

  const incomeTable = groupedIncomeData.map((data, index) => (
    <div key={index} className="flex justify-between px-16">
      <p> {data.name}</p>
      <p> {data.amount}</p>
    </div>
  ));

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex justify-center my-4">
        <div className="flex justify-around w-full md:w-3/4">
          <FaChevronLeft
            onClick={previousMonth}
            className="text-2xl my-auto cursor-pointer"
          />
          <p className="text-xl">
            {displayedDate.toLocaleString("default", { month: "long" })}{" "}
            {displayedDate.getFullYear()}
          </p>
          <FaChevronRight
            onClick={nextMonth}
            className="text-2xl my-auto cursor-pointer"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-lg font-semibold mt-6 underline underline-offset-1">
          Spending Analysis
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:justify-around w-full md:w-3/4 mt-4">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  isAnimationActive={false}
                  data={groupedExpensesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-col w-full md:w-1/2 py-16">
            <div className="flex justify-between px-16 mb-2">
              <p className="text-lg font-bold">Category</p>
              <p className="text-lg font-bold">Amount</p>
            </div>
            {expenseTable}
            <div className="flex justify-between px-16 mb-2">
              <p className="font-semibold">Total Spending</p>
              <p className="font-semibold">{totalExpense}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <p className="text-lg font-semibold mt-6 underline underline-offset-1">
          Income Analysis
        </p>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row md:justify-around w-full md:w-3/4 mt-4">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  isAnimationActive={false}
                  data={groupedIncomeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-col w-full md:w-1/2 py-16">
            <div className="flex justify-between px-16 mb-2">
              <p className="text-lg font-bold">Category</p>
              <p className="text-lg font-bold">Amount</p>
            </div>
            {incomeTable}
            <div className="flex justify-between px-16 mb-2">
              <p className="font-semibold">Total Income</p>
              <p className="font-semibold">{totalIncome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendingAnalysis;
