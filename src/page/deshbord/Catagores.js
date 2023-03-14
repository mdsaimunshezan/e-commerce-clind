import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagenation from "../../components/Pagenation";
import ScreenHeader from "../../components/ScreenHeader";
import Spiner from "../../components/Spiner";
import toast from "react-hot-toast";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../store/services/categoryApi";
import Wraper from "./Wraper";
import Swal from "sweetalert2";

const Catagores = () => {
  const [page, setPage] = useState(1);
  const { data,error, isLoading } = useGetCategoryQuery(page);
  const [removeItem, { isError, isSuccess }] =
    useDeleteCategoryMutation();

  const navigate = useNavigate();

  //error msg
  useEffect(() => {
    isError && toast.error("something went wring");
  }, [isError]);

    //error msg
    useEffect(() => {
      error && toast.error(error?.data?.message);
    }, [error]);

  //edit category
  const edit = (id) => {
    navigate(`/deshbord/edit-category/${id}`);
  };

  //delete category
  const hanldeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "waring",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        removeItem(id);
      }
    });
  };

  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/create-category" className="btn-dark">
          add category
        </Link>
      </ScreenHeader>

      {/* category content */}
     <div className="overflow-x-auto">
     <table className="w-full bg-gray-900 rounded-md mb-8">
        <thead>
          <tr className="border-b border-gray-800 text-left">
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              Name
            </th>
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              Edit
            </th>
            <th className="px-5 py-4 text-base text-gray-500 uppercase font-medium">
              Delete
            </th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? <Spiner/> : data?.category?.length ? (
            data?.category?.map((category) => (
              <tr key={category._id} className="odd:bg-gray-800">
                <td className="px-5 py-4 text-md text-gray-400 capitalize font-base">
                  {category.name}
                </td>
                <td className="p-3 text-sm text-gray-400 capitalize font-normal">
                  <button
                    className="indigo-btn px-6"
                    onClick={() => edit(category._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-400 capitalize font-normal">
                  <button
                    className="red-btn"
                    onClick={() => hanldeDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <div className="text-gary-500 text-lg font-semibold capitalize p-3">no category</div>
          )}
        </tbody>
      </table>
     </div>
      {/* pagenation */}
     {data?.category?.length > 0 &&  <Pagenation page={page} setPage={setPage} pageCount={data?.pageCount} />}
    </Wraper>
  );
};

export default Catagores;
