import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navber from "../../components/Navber";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import currencyFormet from "currency-formatter";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  decrementCart,
  incrementCart,
  removeCart,
} from "../../store/features/cartReducer";
import { Link, useNavigate } from "react-router-dom";
import { usePaymentMutation } from "../../store/services/paymentApi";

const Cart = () => {
  const { cartItem, cartTotalPrice } = useSelector((state) => state.cart);
  const { userToken, user } = useSelector((state) => state.auth);
  const [doPayment, { isLoading, isSuccess, error, data }] =
    usePaymentMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hanldeDec = (item) => {
    dispatch(decrementCart(item));
  };

  const handleInc = (item) => {
    dispatch(incrementCart(item));
  };

  const hanldeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(removeCart(id));
      }
    });
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data?.url;
    }
  }, [isSuccess]);

  const hanldePayment = async () => {
    if (userToken) {
      await doPayment({
        cartItem,
        user: { email: user?.email, userId: user?.userId },
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navber />

      {cartItem?.length ? (
        <div className="container mx-auto px-6">
          <table className="w-full text-left">
            <thead>
              <tr className="">
                <th className="p-3 text-md">image</th>
                <th className="p-3 text-md">name</th>
                <th className="p-3 text-md">price</th>
                <th className="p-3 text-md">size</th>
                <th className="p-3 text-md">color</th>
                <th className="p-3 text-md text-center">quantity</th>
                <th className="p-3 text-md">total</th>
                <th className="p-3 text-md">Delete</th>
              </tr>
            </thead>

            <tbody className="">
              {cartItem?.map((item) => {
                const parsent = item.discount / 100;
                const discountPrice = item.price - item.price * parsent;
                return (
                  <tr key={item._id} className="border-b border-gray-300">
                    <td>
                      <img
                        src={`https://e-commerce-arbd.onrender.com/${item.image1}`}
                        className="w-[70px] h-[70px] rounded-full mt-4 mb-4"
                        alt=""
                      />
                    </td>
                    <td className="font-medium">{item.title}</td>
                    <td className="font-medium">
                      {currencyFormet.format(discountPrice, { code: "USD" })}
                    </td>
                    <td className="font-medium">{item.size}</td>
                    <td className="font-medium">
                      <div
                        className="w-[30px] h-[30px] rounded-full"
                        style={{ background: item.color }}
                      ></div>
                    </td>
                    <td className="font-medium flex mt-4">
                      <span
                        className="bg-indigo-500 px-4 py-3 text-white flex rounded-l-xl cursor-pointer"
                        onClick={() => hanldeDec(item)}
                      >
                        <FaMinus />
                      </span>
                      <span className="flex-1 flex justify-center items-center">
                        {item.quantaty}
                      </span>
                      <span
                        className="bg-indigo-500 flex px-4 py-3 text-white mr-16 rounded-r-xl cursor-pointer"
                        onClick={() => handleInc(item)}
                      >
                        <FaPlus />
                      </span>
                    </td>
                    <td className="font-medium">
                      {currencyFormet.format(discountPrice * item.quantaty, {
                        code: "USD",
                      })}
                    </td>
                    <td className="">
                      <div
                        className="cursor-pointer ml-6 inline-block p-2"
                        onClick={() => hanldeDelete(item._id)}
                      >
                        <FaTrashAlt size={20} className="text-red-500 " />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* checkout total and button */}
          <div className="flex justify-end mt-16">
            <div className="w-[300px] flex justify-between border-t-2 border-indigo-500">
              <h2 className="capitalize text-xl font-medium mt-2">total</h2>
              <h3 className="text-xl font-medium mt-2">
                {currencyFormet.format(cartTotalPrice, { code: "USD" })}
              </h3>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={hanldePayment}
              defaultValue={isLoading}
              className="bg-indigo-500 text-white capitalize font-medium px-10 py-3 rounded hover:bg-indigo-800 duration-500"
            >
             {isLoading ? "loading":  userToken ? "checkout" : "login and checkout"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center mt-16">
          <h3 className="text-2xl font-medium capitalize">
            your cart is empty
          </h3>
          <Link
            to="/"
            className="text-indigo-500 capitalize underline font-medium mt-2 inline-block"
          >
            Continue shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
