import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useHomeCategoryProdectQuery } from "../../store/services/homeApi";
import currency from "currency-formatter";
import { useNavigate } from "react-router-dom";
import Skeliton from "../../components/Skeliton";
import Pagenation from "../../components/Pagenation";
import Navber from "../../components/Navber";
import { AiFillStar } from "react-icons/ai";
import ProdectCart from "../../components/ProdectCart";
import Footer from "../../components/Footer";

const CatProdect = () => {
  const { name } = useParams();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useHomeCategoryProdectQuery({ name, page });
  const theme = "light";


  return (
  
    <div>
      <Navber />
      <Header>{"#" + name}</Header>

      {/* prodect show */}
      <div className="container mx-auto px-6">
        {/* count number by category */}
        {isLoading ? (
          <Skeliton size={200} />
        ) : data?.prodect?.length > 0 ? (
          <div className="font-bold py-6 px-2 capitalize">
            {data?.count} prodects found in #{name}
          </div>
        ) : (
          <div className="bg-red-200 text-red-500 capitalize font-medium border-l-2 p-2 border-red-500 mt-6 w-[400px]">
            no prodect found in #{name}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
          {data?.prodect?.length > 0
            ? data?.prodect?.map((item) => {
                return <ProdectCart item={item} />;
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

export default CatProdect;
