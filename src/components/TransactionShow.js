import { FaArrowDown } from "react-icons/fa";

function TransactionShow() {
  return (
    <div className="w-full mx-2 md:w-3/4 lg:w-1/2 flex border shadow p-2 justify-between bg-red-200">
      <div className="mx-4 flex flex-row ">
        <div className="my-auto mr-4 text-2xl"><FaArrowDown /></div>
        <div>
          <div className="text-2xl">&#8377; 199</div>
          <div className="text-sm">Netflix</div>
        </div>
        {/* <div className="ml-4 my-auto text-xl">Netflix</div> */}
      </div>
      <div className="mx-4 my-auto text-sm">10 Mar 2024</div>
    </div>
  );
}

export default TransactionShow;
