import React,{useRef} from "react";
import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import { FaArrowLeft } from "react-icons/fa";
import {
  useGetSingleOrderQuery, useUpdateStatusMutation,
} from "../../store/services/orderApi";
import Wraper from "./Wraper";
import currencyFormatter from "currency-formatter";
import Spiner from "../../components/Spiner";
import ReactToPrint from 'react-to-print';

const OrderDetails = () => {
  const { id } = useParams();
  const { data,isLoading,isFetching } = useGetSingleOrderQuery(id);
  const componentRef = useRef();
  const [setStatusUpdate,{isLoading:loding,}] = useUpdateStatusMutation();

  const update = ()=>{
    setStatusUpdate(id)
  }
  const parsent = data?.prodectId?.discount / 100;
  const discountPrice =
    data?.prodectId?.price - data?.prodectId?.price * parsent;

  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/order" className="inline-block"><h2 className="font-semibold text-md capitalize flex items-center gap-2 px-3 py-3 rounded  bg-gray-900 "><FaArrowLeft/> order details</h2></Link>
        <ReactToPrint
        trigger={() => <button className="font-semibold text-md capitalize ml-4  gap-2 px-4 py-2 rounded  bg-indigo-500">Print</button>}
        content={() => componentRef.current}
      />
      {!isFetching && !data?.status && <button onClick={update} className="bg-orange-500 px-3 py-2 ml-4 rounded uppercase">{loding ? "Loding...":"deleverd"}</button>}
      </ScreenHeader>

      {/* show order details */}
      {!isLoading ?  
      <div className="" >
       <div ref={componentRef} className="grid md:grid-cols-[1fr_1fr]  lg:grid-cols-[2fr_1fr] gap-6">
       <table className=" rounded-none md:rounded-md h-[150px]">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="p-3 text-left text-gray-500 uppercase font-medium">name</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">image</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">quantities</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">price</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">size</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">color</th>
            <th className="p-3 text-left text-gray-500 uppercase font-medium">total</th>
          </tr>
        </thead>
       
          <tbody>
            <tr>
            <td className="p-3 text-gray-400 capitalize font-normal text-md">
                {data?.prodectId?.title}
              </td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">
                <img
                  src={`https://e-commerce-arbd.onrender.com/${data?.prodectId?.image1}`}
                  alt="image name"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">{data?.quantities}</td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">
                {currencyFormatter.format(discountPrice, { code: "USD" })}
              </td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">{data?.size}</td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">
                <span
                  className="block w-[30px] h-[30px] rounded-full"
                  style={{ background: data?.color }}
                ></span>
              </td>
              <td className="p-3 text-gray-400 capitalize font-normal text-md">
                {currencyFormatter.format(discountPrice * data?.quantities, {
                  code: "USD",
                })}
              </td>
             
            </tr>
          </tbody>
        </table>

        <div className=" rounded-lg p-3">
          <h5 className="text-gray-500 capitalize text-md">customer name</h5>
          <h3 className="text-gray-300 text-lg font-semibold capitalize">{data?.userId?.name}</h3>
          <span className="border-b border-gray-500 block mt-2 mb-1"></span>
          <p className="text-gray-500 capitalize text-md mb-1 mt-2">shipping address</p>
          <h5 className="text-gray-300 mb-1">{data?.address?.country}</h5>
          <h5 className="text-gray-300 mb-1">{data?.address?.city}</h5>
          <h5 className="text-gray-300 mb-1">{data?.address?.line1}</h5>
          <h5 className="text-gray-300 mb-1">{data?.address?.postal_code}</h5>


        </div>
       </div>
      </div>:<Spiner/>}
    </Wraper>
  );
};

export default OrderDetails;
