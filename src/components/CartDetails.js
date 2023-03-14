import React, { useEffect, useState } from "react";
import currency from "currency-formatter";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { addToCart } from "../store/features/cartReducer";

const CartDetails = ({ data, isLoading }) => {
  const [quentaty, setQuentaty] = useState(1);


  const [sizeState, setSizeState] = useState("");
  const [colorState, SetColorState] = useState("");
  const dispatch = useDispatch();  

  useEffect(() => {
    setSizeState(data?.size[0].name);
    SetColorState(data?.colors[0].color);
  }, [data]);

  const incQuentaty = () => {
    if (quentaty < 10) {
      setQuentaty((prev) => prev + 1);
    }
  };

  const decQuentaty = () => {
    if (quentaty > 1) {
      setQuentaty((prev) => prev - 1);
    }
  };

  //culculate discount
  const persent = data?.discount / 100;
  const discountPrice = data?.price - data?.price * persent;

  const addCard = ()=>{
    const {size,colors,createdAt,updatedAt,...newProdect} = data;
    newProdect["size"] = sizeState
    newProdect["color"] = colorState
    newProdect["quantaty"] = quentaty

      dispatch(addToCart(newProdect))
    
    
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[20px]">
        <div className="grid grid-cols-2 gap-2 ">
          {isLoading ? (
            <Skeleton height={300} />
          ) : (
            <img
              src={`https://e-commerce-arbd.onrender.com/${data?.image1}`}
              className="w-full h-[300px] object-cover rounded"
              alt=""
            />
          )}
          {isLoading ? (
            <Skeleton height={300} />
          ) : (
            <img
              src={`https://e-commerce-arbd.onrender.com/${data?.image2}`}
              className="w-full h-[300px] object-cover rounded"
              alt=""
            />
          )}
          {isLoading ? (
            <Skeleton height={300} />
          ) : (
            <img
              src={`https://e-commerce-arbd.onrender.com/${data?.image3}`}
              className="w-full h-[300px] object-cover rounded"
              alt=""
            />
          )}
        </div>
        <div className="">
          {isLoading ? (
            <Skeleton width={350} height={20} />
          ) : (
            <h1 className="text-3xl font-semibold mb-3 capitalize">
              {data?.title}
            </h1>
          )}

          {isLoading ? (
            <Skeleton
              width={150}
              height={20}
              mar
              style={{ marginTop: "20px" }}
            />
          ) : (
            <div className="flex justify-between">
              <div className="text-2xl font-semibold">
                {currency.format(discountPrice, { code: "USD" })}
              </div>
              <div className="text-lg line-through font-medium text-gray-500">
                {currency.format(data?.price, { code: "USD" })}
              </div>
            </div>
          )}

          {isLoading ? (
            <Skeleton width={250} height={20} style={{ marginTop: "20px" }} />
          ) : (
            <div className="">
              <div className="capitalize font-lg font-semibold mt-4 mb-4">
                sizes
              </div>
              <div className="">
                {data?.size.map((item) => (
                  <span
                    onClick={() => setSizeState(item.name)}
                    className={`border  border-gray-400 px-3 ${
                      sizeState === item.name && "bg-indigo-500 text-white"
                    } py-2 ml-2 cursor-pointer rounded capitalize`}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <Skeleton width={300} height={20} style={{ marginTop: "20px" }} />
          ) : (
            <div className="">
              <div className="capitalize font-lg mb-1 font-semibold mt-6 ">
                colors
              </div>
              <div className="flex">
                {data?.colors.map((item) => (
                  <div
                    onClick={() => SetColorState(item.color)}
                    style={{ background: item.color }}
                    className={`w-[40px] h-[40px] ml-2 rounded flex justify-center items-center cursor-pointer`}
                  >
                    {colorState === item.color && (
                      <div className="">
                        <FaCheck className="text-white" size={18} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading ? (
            <Skeleton
              width={300}
              height={20}
              style={{ marginTop: "30px", marginBottom: "10px" }}
            />
          ) : (
          
             <div className="flex flex-wrap items-center mt-6">
              <button
                onClick={decQuentaty}
                className="border border-gray-300 border-r-0 px-4 py-2 cursor-pointer text-xl"
              >
                <HiMinusSm />
              </button>
              <button className="border md:flex border-gray-300 border-r-0 px-12 py-1 cursor-pointer text-xl font-medium">
                {quentaty}
              </button>
              <span
                onClick={incQuentaty}
                className="border border-gray-300 px-4 py-2 cursor-pointer text-xl"
              >
                <HiPlusSm />
              </span>
              <button onClick={addCard} className="bg-indigo-600 text-white px-4 py-2 block border-0 rounded ml-10 capitalize">
                add to cart
              </button>
              
            </div>
          
        
          )}

          <div className="">
            {isLoading ? (
              <Skeleton
                width={100}
                height={20}
                style={{ marginTop: "30px", marginBottom: "10px" }}
              />
            ) : (
              <span className="capitalize font-semibold mb-1 mt-8 inline-block text-md">
                description
              </span>
            )}
            {isLoading ? (
              <Skeleton height={15} count={5} />
            ) : (
              <p dangerouslySetInnerHTML={{ __html: data?.value }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
