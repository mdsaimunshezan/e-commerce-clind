import React from "react";
import { useSingleGetProdectQuery } from "../../store/services/prodectApi";
import { Link, useParams } from "react-router-dom";
import Wraper from "./Wraper";
import ScreenHeader from "../../components/ScreenHeader";
import Spiner from "../../components/Spiner";
const View = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleGetProdectQuery(id);

  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/products" className="btn-dark">
          category list
        </Link>
      </ScreenHeader>
      {!isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="">
            <h3 className="text-gray-400 font-semibold text-xl capitalize mb-1">
              Name : {data?.title}
            </h3>
            <h3 className="text-gray-400 font-semibold text-xl mb-1">
              Price : ${data?.price}
            </h3>
            <h3 className="text-gray-400 font-semibold text-xl mb-1">
              Stock : {data?.stock}
            </h3>
            <h3 className="text-gray-400 font-semibold text-xl mb-1">
              Discount : {data?.discount}
            </h3>
            <h3 className="text-gray-400 font-semibold text-xl capitalize mb-2">
              Category : {data?.category}
            </h3>
            <span className="text-gray-400 text-justify">
              <span dangerouslySetInnerHTML={{ __html: data?.value }} />
            </span>
          </div>
          <div className="">
            <div className="flex gap-3 mt-4">
              {data?.colors?.map((color) => (
                <div
                  style={{ background: color.color }}
                  className="w-[30px] h-[30px] rounded-full"
                ></div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {data?.size?.map((sz) => (
                <div className="border uppercase text-gray-400 broder-gray-500 px-3 py-2 rounded">
                  {sz.name}
                </div>
              ))}
            </div>

            <div className="mt-4">
              <div className="md:flex lg:flex gap-2 md:w-[250px] lg:w-full">
                <img
                  className="h-[200px] lg:w-[250px] w-full object-cover rounded mb-2"
                  src={`https://e-commerce-arbd.onrender.com/${data?.image1}`}
                  alt=""
                />
                <img
                  className="h-[200px] lg:w-[250px] w-full object-cover rounded mb-2"
                  src={`https://e-commerce-arbd.onrender.com/${data?.image2}`}
                  alt=""
                />
              </div>
              <img
                className="h-[250px] w-full object-cover rounded"
                src={`https://e-commerce-arbd.onrender.com/${data?.image3}`}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        <Spiner />
      )}
    </Wraper>
  );
};

export default View;
