import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);
 
  return admin?.admin ? children : <Navigate to="/auth/admin-login" />;
};

export default Private;
