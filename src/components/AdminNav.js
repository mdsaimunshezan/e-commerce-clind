import React from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { logOutAdmin } from "../store/features/authReducer";

const AdminNav = ({ openSideBer }) => {
    const dispatch = useDispatch();

    const handleLogOut = ()=>{
        dispatch(logOutAdmin())
    }
  return (
    <div className="fixed left-0 sm:left-64 right-0 mx-4 top-4">
      <div className="bg-gray-800 w-full flex sm:justify-end justify-between items-center p-4">
        <FaBars
          className="text-white cursor-pointer sm:hidden block"
          style={{ fontSize: "20px" }}
          onClick={openSideBer}
        />
        <button onClick={handleLogOut} className="px-4 py-2  bg-indigo-600 rounded text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNav;
