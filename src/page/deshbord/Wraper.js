import React, { useState } from "react";
import AdminNav from "../../components/AdminNav";
import SideBer from "../../components/SideBer";

const Wraper = ({children}) => {
    const [side,setSide] =useState("-left-64");
    const openSideBer = ()=>{
        setSide("left-0")
    }

    const onClose = ()=>{
        setSide("-left-64")
    }
  return (
    <div>
      <SideBer side={side} onClose={onClose}/>
      <AdminNav openSideBer={openSideBer} />
      <section className="ml-0 sm:ml-64 bg-gray-900 min-h-screen pt-28 px-4">
        <div className="bg-gray-800 text-white p-4">
         {children}
        </div>
      </section>
    </div>
  );
};

export default Wraper;
