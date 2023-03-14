import React from "react";
import { BsShieldFillCheck,BsStarFill,BsStar } from "react-icons/bs";
import Rating from "react-rating";

const UserReview = ({ review, loading }) => {
   
  return (
    <div>

      <Rating
        className="text-yellow-500"
       emptySymbol={<BsStar/>}
        fullSymbol={<BsStarFill/>}
        initialRating={review?.rating}
        readonly
      />
      <div className="flex">
        <div className="mb-8">
          <div className="flex gap-3">
            <h2 className="text-gray-500 capitalize mb-1 font-semibold text-sm">
              by {review?.user?.name}
            </h2>
            <span className="text-green-600 capitalize text-sm flex items-center gap-1">
              <BsShieldFillCheck />
              Verified Purchase
            </span>
          </div>
          <h3 className="text-md font-medium text-gray-700">{review?.message}</h3>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
