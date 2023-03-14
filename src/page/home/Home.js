import React from "react";
import Category from "../../components/Category";
import Footer from "../../components/Footer";
import Navber from "../../components/Navber";
import Slider from "../../components/Slider";
import { useRandomCategoryQuery } from "../../store/services/categoryApi";
import HomeProdect from "./HomeProdect";

const Home = () => {
  const { data } = useRandomCategoryQuery();
  return (
    <div>
      <Navber />
      <Slider />
      <h2 className="capitalize font-semibold text-2xl container mx-auto px-6 mt-[60px] mb-[20px]">categories</h2>
      <Category />
      <div className="container mx-auto px-6 mt-[50px]">
        <h1 className="capitalize font-semibold text-2xl mb-6">prodects</h1>
        {data?.map((category) => (
          <HomeProdect category={category} />
        ))}
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
