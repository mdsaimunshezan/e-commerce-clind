import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link,useNavigate } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { useCreateCategoryMutation } from "../../store/services/categoryApi";
import Wraper from "./Wraper";

const CreateCategory = () => {
    const [name,setName] =useState("");
    const [errorMsg,setErrorMsg] =useState("");

    const [category,{error,isLoading,isSuccess}] = useCreateCategoryMutation();
    const navigate = useNavigate();

    //error message
    useEffect(()=>{
        error && toast.error(error?.data?.message)
    },[error])

       //success message
       useEffect(()=>{
        if(isSuccess){
            toast.success("Category Created Successfully")
            navigate("/deshbord/catagores")
        }
    },[isSuccess])

    //handle form
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!name){
            setErrorMsg("Category is required");
            return;
        }

        //send data
        await category({name})

        //clear input
        setName("");
      
    }
  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/catagores" className="btn-dark">
          category list
        </Link>
      </ScreenHeader>

      {/* catagory from */}
      <form onSubmit={handleSubmit} className="w-full md:w-8/12">
        <h3 className="text-white font-semibold text-lg mb-2">
          Create Category
        </h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter Catagory"
            className={`form-control ${name.length ? null : errorMsg && "border border-red-500"}`}
            onChange={(e)=>setName(e.target.value)}
            value={name}
          />
          <small className="text-red-500">{name.length ? null : errorMsg}</small>
        </div>
        <div className="mb-3 mt-5">
          <button type="submit" className={`indigo-btn ${isLoading && "cursor-not-allowed"}`} defaultValue={isLoading}>{isLoading ? "Pending...": "Create category"}</button>
        </div>
      </form>
    </Wraper>
  );
};

export default CreateCategory;
