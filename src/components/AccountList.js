import React from "react";
import { NavLink } from "react-router-dom";
import { FaRegUserCircle, FaCartArrowDown, FaPowerOff } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userLogOut } from "../store/features/authReducer";
const AccountList = () => {
  const dispatch = useDispatch();
  const hanldeLogOut = () => {
    dispatch(userLogOut());
  };
  return (
    <div>
      <NavLink to="/user" className="py-3 px-2 flex gap-4 items-center font-medium capitalize">
        <FaRegUserCircle size="22px" />
        <span>my account</span>
      </NavLink>
      <NavLink to="/user-order" className="py-3 px-2 flex gap-4 items-center font-medium capitalize">
        <FaCartArrowDown size="22px" />
        <span>orders</span>
      </NavLink>
      <NavLink
        className="py-3 px-2 flex gap-4 items-center font-medium capitalize"
        onClick={hanldeLogOut}
      >
        <FaPowerOff size="22px" />
        <span>logOut</span>
      </NavLink>
    </div>
  );
};

export default AccountList;
