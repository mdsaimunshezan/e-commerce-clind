import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAdminLoginMutation } from "../../store/services/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAdminToken } from "../../store/features/authReducer";

const schema = yup
  .object({
    email: yup.string().required().min(5).max(50).email(),
    password: yup.string().required().min(5).max(50),
  })
  .required();

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, { isLoading, isSuccess, error, data }] =
    useAdminLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //error message
  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  //success message
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("admin-token", data?.token);
      dispatch(getAdminToken(data?.token));
      toast.success("Login Successfull");
      navigate("/deshbord/products")
    }
  }, [isSuccess]);

  //handle from
  const onSubmit = async (data) => {
    const loginUser = {
      email: data.email,
      password: data.password,
    };

    //send data
    await login(loginUser);
  };
  return (
    <div className="bg-black1 h-screen flex justify-center items-center">
      <form className="bg-black2 w-full m-4 sm:w-1/2 md:w-1/4 p-3" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-lg text-white font-semibold capitalize mb-3">
          admin login
        </h3>
        <div className="mb-3">
          <input
            type="text"
            className={`w-full text-white bg-black1 p-3 outline-none rounded ${
              errors.email && "border border-red-500"
            }`}
            placeholder="Enter Email"
            {...register("email")}
          />
          <p className="text-red-500 font-semibold">{errors.email?.message}</p>
        </div>
        <div className="mb-5">
          <input
            type="password"
            className={`w-full text-white bg-black1 p-3 outline-none rounded ${
              errors.email && "border border-red-500"
            }`}
            placeholder="Enter Password"
            {...register("password")}
          />
          <p className="text-red-500 font-semibold">
            {errors.password?.message}
          </p>
        </div>
        <div className="mb-3">
          <button
            disabled={isLoading}
            type="submit"
            className={`text-white bg-indigo-600 w-full rounded p-2 font-semibold ${
              isLoading && "cursor-not-allowed"
            }`}
          >
            {isLoading ? "Pending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
