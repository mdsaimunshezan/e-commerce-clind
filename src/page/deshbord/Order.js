import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagenation from "../../components/Pagenation";
import ScreenHeader from "../../components/ScreenHeader";
import Spiner from "../../components/Spiner";
import { useGetOrderQuery } from "../../store/services/orderApi";
import Wraper from "./Wraper";

const Order = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOrderQuery(page);
  console.log(data);
  return (
    <Wraper>
      <ScreenHeader>
        <h3 className="text-lg capitalize font-semibold">order list</h3>
      </ScreenHeader>

      {/* show order */}

   <div className="overflow-x-auto">
   <table className="w-full text-left bg-gray-900 mb-10">
        <thead>
          <tr>
            <th className="p-3 text-gray-500 uppercase font-medium">name</th>
            <th className="p-3 text-gray-500 uppercase font-medium">
              quantites
            </th>
            <th className="p-3 text-gray-500 uppercase font-medium">image</th>
            <th className="p-3 text-gray-500 uppercase font-medium">
              received
            </th>
            <th className="p-3 text-gray-500 uppercase font-medium">
              delivert
            </th>
            <th className="p-3 text-gray-500 uppercase font-medium">details</th>
          </tr>
        </thead>

        <tbody>
          {data?.order?.length ? (
            data?.order?.map((item) => (
              <tr key={item._id} className="odd:bg-gray-800">
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  {item?.prodectId?.title}
                </td>
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  ${item.quantities}
                </td>
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  <img
                    className="w-12 h-12 rounded object-cover"
                    src={`https://e-commerce-arbd.onrender.com/${item?.prodectId?.image1}`}
                    alt="img"
                  />
                </td>
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  {item.receipet ? "yes" : "no"}
                </td>
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  {item.status ? "yes" : "no"}
                </td>
                <td className="p-3 text-gray-400 capitalize font-normal text-md">
                  <Link to={`/deshbord/order-details/${item._id}`}>
                    <button className="indigo-btn bg-indego-600">
                      detailes
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <Spiner />
          )}
        </tbody>
      </table>

   </div>

      {/* pagenation */}
      {data?.order?.length > 0 && (
        <Pagenation page={page} setPage={setPage} pageCount={data?.pageCount} />
      )}
    </Wraper>
  );
};

export default Order;
