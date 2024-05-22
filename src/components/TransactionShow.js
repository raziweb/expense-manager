import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

function TransactionShow({transaction}) {
  return (
    <div className="mt-2 flex justify-center">
    <div className="w-full mx-2 md:w-3/4 lg:w-1/2 flex border shadow p-2 justify-between bg-gray-200">
      <div className="mx-4 flex flex-row ">
        {transaction.category.type === "expense" && <div className="my-auto mr-4 lg:text-2xl text-lg"><FaArrowDown /></div>}
        {transaction.category.type === "income" && <div className="my-auto mr-4 lg:text-2xl text-lg"><FaArrowUp /></div>}
        <div>
          <div className="lg:text-2xl text-lg">&#8377; {transaction.amount}</div>
          <div className="text-sm">{transaction.note}</div>
        </div>
        {/* <div className="ml-4 my-auto text-xl">Netflix</div> */}
      </div>
      <div className="mx-4 my-auto text-sm">{transaction.date}</div>
    </div>
    </div>
  );
}

export default TransactionShow;
