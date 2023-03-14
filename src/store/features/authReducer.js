import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const storeToken = localStorage.getItem("admin-token");
const storeUserToken = localStorage.getItem("user-token");
const customerToken = localStorage.getItem("user-token");

const authReducer = createSlice({
  name: "auth",
  initialState: {
    adminToken: storeToken ? storeToken : null,
    userToken: storeUserToken ? storeUserToken : null,
    user: customerToken ? jwtDecode(customerToken) : null,
    admin: storeToken ? jwtDecode(storeToken) : null,
    searchBer:false
  },
  reducers: {
    getAdminToken: (state, action) => {
      state.adminToken = action.payload;
      state.admin = jwtDecode(action.payload);
    },
    getUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logOutAdmin: (state, action) => {
      state.adminToken = null;
      state.admin = null
      localStorage.removeItem("admin-token");
    },
    userLogOut: (state, action) => {
      state.userToken = null;
      localStorage.removeItem("user-token");
    },
    toggleSearchBer:(state,action)=>{
      state.searchBer = !state.searchBer;
    }

  },
});

export const { getAdminToken, logOutAdmin, getUserToken, userLogOut,toggleSearchBer } =
  authReducer.actions;
export default authReducer.reducer;
