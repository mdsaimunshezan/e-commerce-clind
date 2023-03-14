import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useSearchCategoryProdectQuery } from "../../store/services/homeApi";
import currency from "currency-formatter";
import { useNavigate } from "react-router-dom";
import Skeliton from "../../components/Skeliton";
import Pagenation from "../../components/Pagenation";
import Navber from "../../components/Navber";
import Footer from "../../components/Footer";

const SearchProdect = () => {
  const { keyword } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useSearchCategoryProdectQuery({ keyword, page });
  const theme = "light";
  console.log(data);
  const navigate = useNavigate();

  const handlePage = (id) => {
    navigate(`/prodect-details/${id}`);
  };

  // loder skeliton

  return (
    <div>
      <Navber />
      <Header>{"#" + keyword}</Header>

      {/* prodect show */}
      <div className="container mx-auto px-6">
        {/* loder skileton */}

        {/* count number by category */}
        {isLoading ? (
          <Skeliton size={200} />
        ) : data?.prodect?.length > 0 ? (
          <div className="font-bold py-6 px-2 capitalize">
            {data?.count} prodects found in #{keyword}
          </div>
        ) : (
          <div className="bg-red-200 text-red-500 capitalize font-medium border-l-2 p-2 border-red-500 mt-6 w-[400px]">
            no prodect found in #{keyword}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
          {data?.prodect?.length > 0
            ? data?.prodect?.map((item) => {
                const persent = item.discount / 100;
                const discountPrice = item.price - item.price * persent;

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
                      <h2 className="font-semibold text-lg capitalize mt-2">
                        {item.title}
                      </h2>
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
              })
            : null}
        </div>
        {data?.prodect?.length > 0 && (
          <Pagenation
            page={page}
            setPage={setPage}
            theme={theme}
            pageCount={data?.pageCount}
          />
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchProdect;
