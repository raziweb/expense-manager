import { useContext, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TransactionContext from "../context/transactions";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";

function TransactionsPage() {
  const [displayedDate, setDisplayedDate] = useState(new Date());

  const { transactions, fetchTransactionsForGivenMonth } =
    useContext(TransactionContext);

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
      <div className="flex justify-center mt-4">
        <p className="w-full md:w-1/2 mx-2 font-semibold">All Transactions</p>
      </div>

      <div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default TransactionsPage;
