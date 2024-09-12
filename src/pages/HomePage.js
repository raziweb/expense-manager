import Dashboard from "../components/Dashboard";
import { FaPlus } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import TransactionModal from "../components/TransactionModal";
import TransactionContext from "../context/transactions";
import TransactionList from "../components/TransactionList";
import Navbar from "../components/Navbar";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const { fetchTransactions, transactions } = useContext(TransactionContext);
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    fetchTransactions();
  }, []);

  const handleOpenModal = () => {
    setShowTransactionModal(true);
  };

  const handleCloseModal = () => {
    setShowTransactionModal(false);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex justify-center">
        <Dashboard />
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleOpenModal}
          className="fixed lg:bottom-8 bottom-4 rigth-0 border shadow rounded-full bg-yellow-400 p-4 mt-2 flex flex-row"
        >
          <span className="hidden lg:block">Add Transaction</span>
          <span className="lg:ml-2 text-2xl">
            <FaPlus />
          </span>
        </button>
        {showTransactionModal && (
          <TransactionModal handleCloseModal={handleCloseModal} />
        )}
      </div>
      <div className="mt-24 lg:mt-32">
        <div className="mt-2 flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2 mx-2 flex flex-row justify-between">
            <div className="text-md lg:text-lg">This month</div>
            <div onClick={() => {navigate('/transactions')}} className="text-blue-500 underline cursor-pointer text-md lg:text-lg">
              see all
            </div>
          </div>
        </div>
        <div>
          <TransactionList transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
