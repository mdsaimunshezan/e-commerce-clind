import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountList from "../../components/AccountList";
import Header from "../../components/Header";
import Navber from "../../components/Navber";
import { useGetSingleOrderQuery } from "../../store/services/orderApi";
import currencyFormatter from "currency-formatter";
import Spiner from "../../components/Spiner";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";
import toast from "react-hot-toast"
import { useAddReviewMutation } from "../../store/services/reviewApi";

const Details = () => {
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);
  const { id } = useParams();

  
  const { data, isLoading } = useGetSingleOrderQuery(id);
  const parsent = data?.prodectId?.discount / 100;
  const discountPrice =
    data?.prodectId?.price - data?.prodectId?.price * parsent;
  const navigate = useNavigate();
  const hanldeBack = () => {
    navigate(-1);
  };


  const [review, { isLoading: loding, error: err, isSuccess }] =
    useAddReviewMutation();

    useEffect(()=>{
      if(isSuccess){
        toast.success("Review Added Successfull",{
          position:"top-right",
          className:"px-6 py-2 font-semibold border border-green-500 rounded"
        })
        navigate("/user-order")
      }
    },[isSuccess])

 

  const hanldeSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !message) {
      setError("all field are required");
      return;
    }
    setError("");

    //add review
    const reviewData = {
      rating,
      message,
      prodect: data?.prodectId?._id,
      user: data?.userId?._id,
      id: data?._id,
    };

    await review(reviewData);

    //close model
    setOpen(false);

    //clear input
    setRating("");
    setMessage("");
  };

  return (
    <div>
      {open && (
        <div className="fixed w-full h-screen flex justify-center items-center bg-black/50">
          <div className="w-1/3 bg-white rounded p-4">
            <h3 className="capitalize font-semibold text-lg">add review</h3>
            <form onSubmit={hanldeSubmit}>
              <div className="mt-4">
                <label htmlFor="" className="capitalize font-medium mb-2 block">
                  rating
                </label>
                <select
                  onChange={(e) => setRating(e.target.value)}
                  name=""
                  id=""
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" className="capitalize">
                    chose a rating
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="" className="capitalize font-medium mb-2 block">
                  message
                </label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  name=""
                  id=""
                  placeholder="write a message"
                  cols="30"
                  rows="5"
                  className="w-full border border-gray-300 p-2 rounded"
                ></textarea>
              </div>

              <div className="flex justify-between mt-4">
                <button className="bg-indigo-700 text-white px-4 py-2 rounded capitalize">
                  add review
                </button>
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-red-700 text-white px-4 py-2 rounded capitalize"
                >
                  close
                </button>
              </div>
            </form>
            {error ? (
              <div className="bg-red-300 text-red-700 font-medium text-md capitalize p-3 rounded mt-3">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      )}

      <Navber />
      <Header>
        <h1>order details</h1>
      </Header>
      <div className="grid grid-cols-[1fr_3fr] gap-4 container mx-auto p-6">
        <div className="">
          <AccountList />
        </div>

        {/* show order details */}

        {!isLoading ? (
          <div>
            <button
              onClick={hanldeBack}
              className="capitalize  font-semibold py-2 text-lg mb-2 rounded flex items-center gap-2"
            >
              <FaArrowLeft /> details
            </button>
            <div className="flex flex-wrap gap-4">
              <div className="w-[200px] ">
                <img
                  src={`https://e-commerce-arbd.onrender.com/${data?.prodectId?.image1}`}
                  alt=""
                  className="w-full h-[200px] object-cover rounded"
                />
              </div>
              <div className="flex-1">
                <div className="capitalize text-gray-700 font-base mb-2">
                  order number:
                  <span className="font-semibold ml-2 text-md text-black">
                    {id}
                  </span>
                </div>
                <div className="capitalize text-gray-700 font-base">
                  prodect name:
                  <span className="font-semibold ml-2 text-lg text-black">
                    {data?.prodectId?.title}
                  </span>
                </div>
                <div className="capitalize text-gray-700 font-base">
                  order received:
                  <span className="font-semibold ml-2 text-lg text-black">
                    {data?.receipet ? "Yes" : "No"}
                  </span>
                </div>
                <div className="capitalize text-gray-700 font-base">
                  order date:
                  <span className="font-semibold ml-2 text-lg text-black">
                    {moment(data?.createdAt).format("MMMM Do YYYY")}
                  </span>
                </div>

                {data?.receipet && (
                  <div className="capitalize text-gray-700 font-base">
                    receiped date:
                    <span className="font-semibold ml-2 text-lg text-black">
                      {moment(data?.updatedAt).format("MMMM Do YYYY")}
                    </span>
                  </div>
                )}

                 {data?.receipet && (
                  <div>
                    <button
                    disabled={data?.confirmReview}
                      onClick={() => setOpen(!open)}
                      className={`${data?.confirmReview ? "bg-red-500": "bg-indigo-700" } px-4 py-2 text-white rounded capitalize mt-4`}                 >
                     {data?.confirmReview ? "already review": "add review"} 
                    </button>
                  </div>
                )}

                <table className="w-full text-left  mb-10 mt-6">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="p-3 text-gray-800 uppercase font-base text-sm">
                        color
                      </th>
                      <th className="p-3 text-gray-800 uppercase font-medium text-sm">
                        size
                      </th>
                      <th className="p-3 text-gray-800 uppercase font-medium text-sm">
                        price
                      </th>
                      <th className="p-3 text-gray-800 uppercase font-medium text-sm">
                        quantities
                      </th>
                      <th className="p-3 text-gray-800 uppercase font-medium text-sm">
                        total
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className=" ">
                      <td className="p-2 capitalize font-normal text-md">
                        <span
                          style={{ backgroundColor: data?.color }}
                          className="block w-[20px] h-[20px] rounded-full"
                        ></span>
                      </td>

                      <td className="p-3  capitalize font-normal text-md">
                        {data?.size}
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {currencyFormatter.format(data?.prodectId?.price, {
                          code: "USD",
                        })}
                      </td>
                      <td className="p-3  capitalize font-normal text-md">
                        {data?.quantities}
                      </td>
                      <td>
                        {currencyFormatter.format(
                          discountPrice * data?.quantities,
                          { code: "USD" }
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <Spiner />
        )}
      </div>
    </div>
  );
};

export default Details;
