import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useParams } from "react-router-dom";
import { useSingleGetProdectQuery } from "../../store/services/prodectApi";
import CartDetails from "../../components/CartDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navber from "../../components/Navber";
import { useSingleReviewQuery } from "../../store/services/reviewApi";
import UserReview from "../../components/UserReview";
import Footer from "../../components/Footer";

const ProdectDetailes = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleGetProdectQuery(id);
  const { data: reviewData, isLoading: loding } = useSingleReviewQuery(id);
  console.log(reviewData);

  return (
    <div>
      <Navber />
      <div className="container mx-auto px-6 mt-[40px]">
        {isLoading ? (
          <Skeleton width={300} height={20} />
        ) : (
          <ul className="flex font-semibold gap-1 capitalize text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            /
            <li>
              <Link to={`/category-prodect/${data?.category}`}>
                {data?.category}
              </Link>
            </li>
            /
            <li>
              <Link>{data?.title}</Link>
            </li>
          </ul>
        )}

        {/* show details */}
        <CartDetails data={data} isLoading={isLoading} />

        {/* show review by user */}
        <h1 className="mt-20 mb-5 font-semibold text-xl text-gary-600">
          Product Reviews
        </h1>
        {reviewData?.length > 0
          ? reviewData?.map((review) => {
              return <UserReview review={review} loding={loding} />;
            })
          : <span className="capitalize">no review</span>}
      </div>
      <Footer/>
    </div>
  );
};

export default ProdectDetailes;
