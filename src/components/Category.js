import React from "react";
import { useGetAllCategoryQuery } from "../store/services/categoryApi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { data, isLoading } = useGetAllCategoryQuery();
  const nanigate = useNavigate();
  let i = 1;

  const handleCatPage = (name)=>{
    console.log(name)
    nanigate(`/category-prodect/${name}`)
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-6 gap-6 container mx-auto px-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton
            baseColor="#C0C0C0"
            highlightColor="#a7a6ba"
            height={100}
            key={item}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-3">
        {data?.map((item) => {
          if (i >= 5) {
            i = 1;
          } else {
            i++;
          }
          return (
            <div className="relative cursor-pointer">
              <div className="h-[100px] w-full" onClick={()=>handleCatPage(item.name)}>
                <img
                  src={`./slider/${i}.jpg`}
                  className="h-full w-full rounded"
                  alt=""
                />
                <div className="absolute top-0 left-0 w-full h-full bg-bgColor rounded"></div>
                <h3 className="capitalize text-white font-semibold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  {item.name}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
