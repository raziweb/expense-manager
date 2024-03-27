import { GoHome } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

function Navbar() {
  return (
    <nav className="sticky w-full bg-stone-900 text-slate-300 flex flex-row p-4">
      <div className="mx-10 cursor-pointer text-2xl">
        <GoHome />
      </div>
      <div className="mr-10 cursor-pointer">
        <span>Spending Analysis</span> <FaChartPie className="inline" />
      </div>
      <div className="mr-10 cursor-pointer">
        <span>Transactions</span> <GrTransaction className="inline" />
      </div>
      <div className="mr-10 cursor-pointer">
        <span>Categories</span>
        <MdCategory className="inline" />
      </div>
    </nav>
  );
}

export default Navbar;
