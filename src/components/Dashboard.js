import { useContext } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import TransactionContext from "../context/transactions";


function Dashboard() {

  const {transactions} = useContext(TransactionContext);

  let income=0, expense=0, balance=0;

  for(const transaction of transactions) {
    if(transaction.category.type === "income"){
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  }

  balance = income - expense;

  return (
    <div className="fixed w-full mx-2 lg:w-2/3 flex flex-row justify-between">
      <div className="w-1/3 mx-1 lg:mx-2 px-2 py-4 lg:py-8 rounded-lg bg-red-200 border shadow flex flex-row justify-center">
        <div className="my-auto text-2xl lg:text-4xl mr-1 lg:mr-4">
          <FaArrowCircleDown />
        </div>
        <div>
          <div className="text-xs">Spending</div>
          <div className="text-xl lg:text-3xl">{expense}</div>
        </div>
      </div>
      <div className="w-1/3 mx-1 lg:mx-2 px-2 py-4 lg:py-8 rounded-lg bg-blue-200 border shadow flex flex-row justify-center">
      <div className="my-auto text-2xl lg:text-4xl mr-1 lg:mr-4">
          <IoWallet />
        </div>
        <div>
          <div className="text-xs">Balance</div>
          <div className="text-xl lg:text-3xl">{balance}</div>
        </div>
      </div>
      <div className="w-1/3 mx-1 lg:mx-2 px-2 py-4 lg:py-8 rounded-lg bg-green-200 border shadow flex flex-row justify-center">
      <div className="my-auto text-2xl lg:text-4xl mr-1 lg:mr-4">
          <FaArrowCircleUp />
        </div>
        <div>
          <div className="text-xs">Income</div>
          <div className="text-xl lg:text-3xl">{income}</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
