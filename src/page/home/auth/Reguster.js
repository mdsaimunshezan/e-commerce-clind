import React, { useEffect } from "react";
import { Link,useNavigate} from "react-router-dom";
import Header from "../../../components/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast"
import {useDispatch} from "react-redux"
import { useUserRegusterMutation } from "../../../store/services/authApi";
import { getUserToken } from "../../../store/features/authReducer";

const schema = yup
  .object({
    name: yup.string().required().min(3).max(30),
    email: yup.string().required().min(5).max(50).email(),
    password: yup.string().required().min(5).max(50),
  })
  .required();

const Reguster = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [regusterUser,{isLoading,isSuccess,error,data}] = useUserRegusterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(data)
  // error message
  useEffect(()=>{
    error && toast.error(error?.data?.message)
  },[error])

  //success message
  useEffect(()=>{
     if(isSuccess){
      toast.success("User Reguster Successfull");
      localStorage.setItem("user-token",data?.token);
      dispatch(getUserToken(data?.token));
      navigate("/user")
     }
  },[isSuccess])


  const onSubmit =async (data) => {
    const user = {
      name:data.name,
      email:data.email,
      password:data.password,
    }
   await regusterUser(user)
  };

  return (
    <div className="">
      <Header className="">
        <h3 className="text-gray-200 text-2xl container mx-auto  px-6 font-semibold">
          Sing Up
        </h3>
      </Header>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:w-6/12 lg:w-4/12 w-11/12 border broder-gray-200 rounded-lg p-5 bg-white -mt-14"
        >
          <h1 className="font-semibold text-xl mb-6">Sing Up</h1>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 block">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              name="name"
              id=""
              className={`w-full outline-none p-2 font-base ${
                errors.name?.message
                  ? "border border-red-500"
                  : "border border-gray-200"
              }`}
              placeholder="Name..."
            />
            <small className="text-red-500 text-base">
              {errors.name?.message}
            </small>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 block">
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              name="email"
              id=""
              className={`w-full outline-none p-2 font-base ${
                errors.name?.message
                  ? "border border-red-500"
                  : "border border-gray-200"
              }`}
              placeholder="Email..."
            />
            <small className="text-red-500 text-base">
              {errors.email?.message}
            </small>
          </div>
          <div className="mb-4">
            <label htmlFor="" className="mb-2 block">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              name="password"
              id=""
              className={`w-full outline-none p-2 font-base ${
                errors.name?.message
                  ? "border border-red-500"
                  : "border border-gray-200"
              }`}
              placeholder="Password..."
            />
            <small className="text-red-500 text-base">
              {errors.password?.message}
            </small>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-indigo-600 w-full p-2 text-white font-semibold rounded"
          >
           {isLoading ? "Pending...": "Sing In"} 
          </button>
          <Link to="/login" className="text-md inline-block py-3">
            Already have an account?{" "}
            <span className="font-semibold">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Reguster;
