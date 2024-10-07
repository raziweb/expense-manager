import { GoHome } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="fixed z-40 top-0 w-full bg-stone-900 text-slate-300 flex flex-row justify-between p-4">
      <div className="flex flex-row">
        <div onClick={() => {navigate('/')}} className="mx-10 cursor-pointer text-2xl">
          <GoHome />
        </div>
        <div onClick={() => {navigate('/analysis')}} className="mr-10 cursor-pointer">
          <span className="hidden md:inline">Analysis</span>{" "}
          <FaChartPie className="inline text-2xl md:text-base" />
        </div>
        <div onClick={() => {navigate('/transactions')}} className="mr-10 cursor-pointer">
          <span className="hidden md:inline">Transactions</span>{" "}
          <GrTransaction className="inline text-2xl md:text-base" />
        </div>
        <div onClick={() => {navigate('/categories')}} className="mr-10 cursor-pointer">
          <span className="hidden md:inline">Categories</span>
          <MdCategory className="inline text-2xl md:text-base" />
        </div>
      </div>
      <div className="flex flex-row">
        <div onClick={handleLogout} className="mr-10 cursor-pointer">
          <span className="hidden md:inline mr-1">Logout</span>
          <FiLogOut className="inline text-2xl md:text-base" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
