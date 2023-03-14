import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from "react-router-dom"

const UserRoute = () => {
    const { userToken } = useSelector(state =>state.auth)
  return userToken ? <Outlet/> : <Navigate to="/login"/>
}

export default UserRoute