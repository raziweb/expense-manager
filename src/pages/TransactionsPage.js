import { useContext, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TransactionContext from "../context/transactions";
import Navbar from "../components/Navbar";
import TransactionList from "../components/TransactionList";
import { useNavigate } from "react-router-dom";

function TransactionsPage() {
  const {
    transactions,
    fetchTransactionsForGivenMonth,
    displayedDate,
    previousMonth,
    nextMonth,
  } = useContext(TransactionContext);

  const navigate = useNavigate();

  const noData = transactions.length === 0 ? true : false;

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="flex justify-center my-4">
        <div className="flex justify-around w-full md:w-3/4">
          <FaChevronLeft
            onClick={() => {
              previousMonth();
            }}
            className="text-2xl my-auto cursor-pointer"
          />
          <p className="text-xl">
            {displayedDate.toLocaleString("default", { month: "long" })}{" "}
            {displayedDate.getFullYear()}
          </p>
          <FaChevronRight
            onClick={() => {
              nextMonth();
            }}
            className="text-2xl my-auto cursor-pointer"
          />
        </div>
      </div>

      {noData && (
        <div className="flex justify-center">
          <div className="mt-6 italic">No transactions for this month</div>
        </div>
      )}

      <div
        className={`${noData ? "hidden" : "block"} flex justify-center mt-4`}
      >
        <div className="w-full md:w-3/4 lg:w-1/2 mx-2 flex justify-between">
          <p className="font-semibold">All Transactions</p>
          <p
            onClick={() => {
              navigate("/analysis");
            }}
            className="text-blue-500 underline cursor-pointer"
          >
            Analysis
          </p>
        </div>
        {/* <p className="w-full md:w-1/2 mx-2 font-semibold">All Transactions</p>
        <p>Analysis</p> */}
      </div>
      <div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default TransactionsPage;
