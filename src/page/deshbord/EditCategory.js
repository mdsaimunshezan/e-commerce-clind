import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Spiner from "../../components/Spiner";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "../../store/services/categoryApi";
import Wraper from "./Wraper";

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { data, isError, isLoading } = useGetSingleCategoryQuery(id);
  const [update, { isLoading: loding, isSuccess, error }] =
    useUpdateCategoryMutation();

  const navigate = useNavigate();

  //fetch data and update input
  useEffect(() => {
    setName(data?.name);
  }, [data, id]);

  //get data error message
  useEffect(() => {
    isError && toast.error("something went wrong");
  }, [isError]);

  //update data error message
  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  //success message
  useEffect(() => {
    if (isSuccess) {
      toast.success("Update Created Successfully");
      navigate("/deshbord/catagores");
    }
  }, [isSuccess]);

  //handle form
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg("Category is required");
      return;
    }

    const updateName = {
      name: name,
    };
    //send data
    await update({ updateName, id });
  };

  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/catagores" className="btn-dark">
          category list
        </Link>
      </ScreenHeader>

      {/* catagory from */}
      {isLoading ? (
        <Spiner />
      ) : (
        <form onSubmit={handleUpdate} className="w-full md:w-8/12">
          <h3 className="text-white capitalize font-semibold text-lg mb-2">
            update category
          </h3>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Catagory"
              className={`form-control ${
                name?.length ? null : errorMsg && "border border-red-500"
              }`}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <small className="text-red-500">
              {name?.length ? null : errorMsg}
            </small>
          </div>
          <div className="mb-3 mt-5">
            <button
              type="submit"
              className={`indigo-btn ${loding && "cursor-not-allowed"}`}
              defaultValue={loding}
            >
              {loding ? "Pending..." : "update category"}
            </button>
          </div>
        </form>
      )}
    </Wraper>
  );
};

export default EditCategory;
