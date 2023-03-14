import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { HiOutlineMagnifyingGlassCircle } from "react-icons/hi2";
import { toggleSearchBer } from "../store/features/authReducer";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [search,setSearch] =useState("");
    const { searchBer } = useSelector(state =>state.auth);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    const searchTerm = ()=>{
      if(!search) return;
   
      navigate(`/search-prodect/${search}`)
      dispatch(toggleSearchBer())
    }

 
  return (
    <div className="w-1/2">
      <Modal
        open={searchBer}
        onClose={()=>dispatch(toggleSearchBer())}
        closeIcon={dispatchEvent}
        styles={{
          modal: { marginTop: "100px", width: "700px", padding: "0px" },
        }}
      >
        <div className="flex rounded">
          <input
            type="text"
            className="w-full outline-none py-4 px-4 font-semibold"
            placeholder="Search Prodect..."
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
          />
          <span className="pr-2 flex items-center rounded cursor-pointer" onClick={searchTerm}>
            <HiOutlineMagnifyingGlassCircle size={40} />
          </span>
        </div>
      </Modal>
    </div>
  );
};

export default Search;
