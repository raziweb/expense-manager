import { useEffect } from "react";
import ReactDOM from "react-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function TransactionModal({ handleCloseModal }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={handleCloseModal}
        className="fixed inset-0 bg-gray-300 opacity-30"
      ></div>
      <div className="fixed top-[15%] left-[5%] lg:left-[30%] md:left-[30%] bg-white p-6 w-[90%] lg:w-2/5 md:w-2/5 h-3/4 shadow">
        <div className="flex flex-row justify-start">
          <IoMdArrowRoundBack
            onClick={handleCloseModal}
            className="text-2xl my-auto mr-2 cursor-pointer"
          />
          <p className="text-xl">Add transaction</p>
        </div>
        <form>
          <div className="mt-4 flex flex-row justify-start">
            <div className="border-2 mr-2 p-1">
              <label htmlFor="expense" className="mr-1 cursor-pointer">Expense</label>
              <input
                type="radio"
                id="expense"
                name="transactionType"
                value="expense"
              />
            </div>
            <div className="border-2 mr-2 p-1">
              <label htmlFor="income" className="mr-1 cursor-pointer">Income</label>
              <input
                type="radio"
                id="income"
                name="transactionType"
                value="income"
              />
            </div>
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Amount:</label>
            <input type="number" name="amount" className="border-2 p-1" placeholder="Rupees"/>
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Note:</label>
            <input type="text" name="note" className="border-2 p-1" placeholder="Add a note"/>
          </div>
          <div className="mt-4 grid">
            <label className="mr-2">Category:</label>
            <select name="category" className="border-2 p-1">
              <option value="">select</option>
              <option>Utilities</option>
              <option>Entertainment</option>
              <option>Rent</option>
              <option>Food and dining</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="mr-2">Date</label>
            <DatePicker selected={new Date()} className="border-2 p-1"/>
          </div>
          <div className="mt-4 flex flex-row justify-center">
            <button className="border shadow-md px-4 py-1 bg-blue-500 rounded-md text-lg">Add</button>
          </div>
        </form>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default TransactionModal;
