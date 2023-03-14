import React from "react";
import { Link } from "react-router-dom";
import { useHomeCategoryProdectQuery } from "../../store/services/homeApi";
import currency from "currency-formatter";
import ProdectCart from "../../components/ProdectCart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HomeProdect = ({ category }) => {
  const { data, isLoading } = useHomeCategoryProdectQuery({
    name: category.name,
    page: "",
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-6 gap-6 container mx-auto px-6 mt-[60px]">
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
    <div>
      {data?.prodect?.length > 0 && (
        <>
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold capitalize mb-2 mt-8">
              {category?.name}
            </h3>
            <Link
              to={`/category-prodect/${category?.name}`}
              className="capitalize text-md font-normal hover:underline"
            >
              see all
            </Link>
          </div>
        </>
      )}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 ">
        {data?.prodect?.map((item) => {
          return <ProdectCart item={item} />;
        })}
      </div>
    </div>
  );
};

export default HomeProdect;
