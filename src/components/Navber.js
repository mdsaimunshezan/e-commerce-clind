import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.svg";
import { useSelector,useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBer } from "../store/features/authReducer";

const Navber = () => {
  const { user, userToken } = useSelector((state) => state.auth);
  const { cartTotalQty } = useSelector(state =>state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeItem = ()=>{
    navigate("/cart")
  }
 
  return (
    <div className="">
    <nav className="container mx-auto flex justify-between px-6 h-[60px] items-center -z-50">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <ul className="flex items-center gap-2 sm:gap-4">
        <li onClick={()=>dispatch(toggleSearchBer())}>
          <FaSearch className="cursor-pointer" size="20px" />
        </li>
        <li>
          {userToken ? (
            <Link to="/user" className="font-semibold p-2 text-sm sm:text-[16px] capitalize">
              {user?.name}
            </Link>
          ) : (
            <Link to="/login" className="font-semibold p-2 text-sm sm:text-[16px]">
              Sign In
            </Link>
          )}
        </li>
        <li className="relative cursor-pointer" onClick={hanldeItem}>
          <FaShoppingCart className="cursor-pointer" size="22px" />
          <div className="w-[22px] h-[22px] bg-indigo-600 text-xs font-semibold flex justify-center items-center text-white rounded-full absolute -top-2 -right-3">
            {cartTotalQty}
          </div>
        </li>
      </ul>
    </nav>

    {/* search bet */}
    <Search/>
    </div>
  );
};

export default Navber;
