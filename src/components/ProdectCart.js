import React from "react";
import currency from "currency-formatter";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ProdectCart = ({item}) => {
    const persent = item.discount / 100;
    const discountPrice = item.price - item.price * persent;
    console.log("item",item)

    const navigate = useNavigate();
                  
  let result = 0;
  let one = 0,
    two = 0,
    three = 0,
    four = 0,
    five = 0,
    total = 0;
  if (item?.reviews?.length > 0) {
    item?.reviews?.forEach((item) => {
      if (item.rating === 1) {
        one += 1;
      }
      if (item.rating === 2) {
        two += 1;
      }
      if (item.rating === 3) {
        three += 1;
      }
      if (item.rating === 4) {
        four += 1;
      }
      if (item.rating === 5) {
        five += 1;
      }
    });
    total = one + two + three + four + five;
    result = (1 * one + 2 * two + 3 * three + 4 * four + 5 * five) / total;
  } else {
    total = 0;
    result = 0;
  }
  const finalResult = parseFloat(result).toFixed(1);

  const handlePage = (id) => {
    navigate(`/prodect-details/${id}`);
  };


  return (
    <div
      className="p-2 hover:shadow-lg cursor-pointer duration-700 hover:scale-105"
      onClick={() => handlePage(item._id)}
    >
      <img
        src={`https://e-commerce-arbd.onrender.com/${item.image1}`}
        className="h-[200px] w-full object-cover"
        alt=""
      />
      <div className="">
        <h2 className="font-semibold text-sm md:text-[16px] capitalize mt-2">{item.title?.slice(0,50)}...</h2>

        <div className="flex items-center">
          <div className="flex items-center space-x-2 mb-1">
            <span>{finalResult}</span>
            <AiFillStar color="orange" />
            <span>{total}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <h3 className="font-medium">
            {currency.format(discountPrice, { code: "USD" })}
          </h3>
          <h3 className="font-medium line-through">
            {currency.format(item.price, { code: "USD" })}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProdectCart;
