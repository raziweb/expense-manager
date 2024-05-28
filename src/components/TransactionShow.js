import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import TransactionModal from "../components/TransactionModal";

function TransactionShow({ transaction }) {
  const [showEditTransactionModal, setShowEditTransactionModal] =
    useState(false);

  const handleOpenModal = () => {
    setShowEditTransactionModal(true);
  };

  const handleCloseModal = () => {
    setShowEditTransactionModal(false);
  };

  return (
    <div className="mt-2 flex justify-center">
      <div
        onClick={handleOpenModal}
        className="w-full mx-2 md:w-3/4 lg:w-1/2 flex border shadow p-2 justify-between bg-gray-200 cursor-pointer"
      >
        <div className="mx-4 flex flex-row ">
          {transaction.category.type === "expense" && (
            <div className="my-auto mr-4 lg:text-2xl text-lg">
              <FaArrowDown />
            </div>
          )}
          {transaction.category.type === "income" && (
            <div className="my-auto mr-4 lg:text-2xl text-lg">
              <FaArrowUp />
            </div>
          )}
          <div>
            <div className="lg:text-2xl text-lg">
              &#8377; {transaction.amount}
            </div>
            <div className="text-sm">{transaction.note}</div>
          </div>
          {/* <div className="ml-4 my-auto text-xl">Netflix</div> */}
        </div>
        <div className="mx-4 my-auto text-sm">
          {transaction.date.toDateString()}
        </div>
      </div>
      {showEditTransactionModal && (
        <TransactionModal
          handleCloseModal={handleCloseModal}
          transaction={transaction}
        />
      )}
    </div>
  );
}

export default TransactionShow;
