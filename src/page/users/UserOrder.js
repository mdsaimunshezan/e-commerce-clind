import React, { useEffect } from "react";
import AccountList from "../../components/AccountList";
import Header from "../../components/Header";
import Navber from "../../components/Navber";
import toast from "react-hot-toast";
import {
  useUpdateDelevertMutation,
  useUserOrderQuery,
} from "../../store/services/orderApi";
import { useSelector } from "react-redux";
import Spiner from "../../components/Spiner";
import currencyFormatter from "currency-formatter";
import { Link } from "react-router-dom";

const UserOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const id = user?.userId;
  const { data,isLoading:loding } = useUserOrderQuery(id);
  const [update, { isSuccess }] = useUpdateDelevertMutation();
  console.log(data)

  useEffect(() => {
    isSuccess &&
      toast.success("confirm successfull", {
        position: "top-center",
        className: "border border-green-500 px-4 py-2 font-medium",
      });
  }, [isSuccess]);

  const updatedelevery = (id) => {
    update(id);
  };

  return (
    <div>
      <Navber />
      <Header>
        <h1>your orders</h1>
      </Header>
      <div className="grid grid-cols-[1fr_3fr] gap-4 container mx-auto p-6">
        <div className="">
          <AccountList />
        </div>
        {loding ? <Spiner/>: data?.length ?   <div>
          <table className="w-full text-left  mb-10">
            <thead>
              <tr className="">
                <th className="p-3 text-gray-500 uppercase font-medium">
                  image
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  name
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  price
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  quantities
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  total price
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  details
                </th>
                <th className="p-3 text-gray-500 uppercase font-medium">
                  delivery
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.length > 0 ? (
                data?.map((item) => {
                  const parsent = item?.prodectId?.discount / 100;
                  const discountPrice =
                    item?.prodectId?.price - item?.prodectId?.price * parsent;
                  return (
                    <tr key={item._id} className="odd:bg-gray-200 ">
                      <td className="p-2 capitalize font-normal text-md">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          src={`https://e-commerce-arbd.onrender.com/${item?.prodectId?.image1}`}
                          alt="img"
                        />
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {item?.prodectId?.title}
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {currencyFormatter.format(item?.prodectId?.price, {
                          code: "USD",
                        })}
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {item?.quantities}
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {currencyFormatter.format(
                          discountPrice * item?.quantities,
                          { code: "USD" }
                        )}
                      </td>
                      <td>
                        <Link to={`/userOrder-details/${item?._id}`}>
                          <button className="bg-indigo-700 uppercase rounded text-white px-3 py-2">
                            details
                          </button>
                        </Link>
                      </td>
                      <td>
                        {item?.status ? <button
                          disabled={item?.receipet ? true : false}
                          onClick={() => updatedelevery(item?._id)}
                          className={`${
                            item?.receipet && "bg-green-500 cursor-not-allowed"
                          } bg-orange-600  uppercase rounded text-white px-3 py-2`}
                        >
                          {item?.receipet
                            ? "receipt"
                            : "Is receipt ?"}
                        </button>: <span className="text-red-500 text-md font-medium">under process</span>}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Spiner />
              )}
            </tbody>
          </table>
        </div>: <span className="bg-indigo-400 rounded font-medium text-white capitalize h-[50px] p-3">no order</span> }
      </div>
    </div>
  );
};

export default UserOrder;
