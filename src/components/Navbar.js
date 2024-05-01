import { GoHome } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-stone-900 text-slate-300 flex flex-row justify-between md:justify-start p-4">
      <div className="mx-10 cursor-pointer text-2xl">
        <GoHome />
      </div>
      <div className="mr-10 cursor-pointer">
        <span className="hidden md:inline">Spending Analysis</span> <FaChartPie className="inline text-2xl md:text-base" />
      </div>
      <div className="mr-10 cursor-pointer">
        <span className="hidden md:inline">Transactions</span> <GrTransaction className="inline text-2xl md:text-base" />
      </div>
      <div className="mr-10 cursor-pointer">
        <span className="hidden md:inline">Categories</span>
        <MdCategory className="inline text-2xl md:text-base" />
      </div>
    </nav>
  );
}

export default Navbar;
