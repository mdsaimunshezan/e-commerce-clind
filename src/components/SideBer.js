import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { FaRegListAlt,FaCartPlus,FaUserFriends,FaTimes,FaRegChartBar } from "react-icons/fa";

const SideBer = ({side,onClose}) => {
  return (
    <div className={`fixed ${side} sm:left-0 w-64 bg-gray-800 h-screen z-10 transition-all`}>
      <div className="bg-white p-4 flex justify-between items-center">
        <img src={logo} alt="Logo" />
        <FaTimes style={{fontSize:"20px",cursor: "pointer"}} onClick={onClose} className="sm:hidden block"/>
      </div>

      <ul className="mt-4">
        <li className="text-white text-lg hover:bg-gray-600 transition-all">
          <Link to="/deshbord/products" className="w-full text-base p-4 flex gap-4 items-center">
            <FaRegListAlt />
            Products
          </Link>
        </li>
        <li className="text-white text-lg hover:bg-gray-600 transition-all">
          <Link to="/deshbord/order" className="w-full p-4 text-base flex gap-4 items-center">
            <FaCartPlus/>
            Oders
          </Link>
        </li>
        <li className="text-white text-lg hover:bg-gray-600 transition-all">
          <Link to="/deshbord/customer" className="w-full p-4 flex gap-4 items-center">
            <FaUserFriends/>
            Customers
          </Link>
        </li>
        <li className="text-white text-lg hover:bg-gray-600 transition-all">
          <Link to="/deshbord/catagores" className="w-full p-4 flex gap-4 items-center">
            <FaRegChartBar/>
            Catagores
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBer;
