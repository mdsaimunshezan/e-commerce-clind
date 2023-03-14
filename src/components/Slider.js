import React from "react";
import image from "../assets/image-1.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useRandomCategoryQuery } from "../store/services/categoryApi";
import Spiner from "./Spiner";
import { Link } from "react-router-dom";

const Slider = () => {
  const { data, isLoading } = useRandomCategoryQuery();

  if (isLoading)
    return (
      <div className="w-full h-[450px] flex justify-center items-center">
        <Spiner />
      </div>
    );
  return (
    <div>
      <Swiper
        className="relative group"
        modules={[Navigation, Autoplay, Pagination]}
        autoplay={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        style={{zIndex:"-9999999999px",overflow:"hidden"}}
        navigation={{
          nextEl: ".button-next-slide",
          prevEl: ".button-prev-slide",
        }}
       
      >
        {data?.map((item, index) => (
          <SwiperSlide>
            <div className="relative w-full h-[450px] z-[-999px] ">
              <img
                src={`./slider/${index + 1}.jpg`}
                alt="no image"
                className="object-cover -z-50 h-full w-full"
              />
              <div className="absolute top-0 overflow-hidden left-0 w-full h-full bg-bgColor z-[-999px]"></div>

              <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-center">
                <h1 className="font-semibold text-2xl capitalize mb-3">
                  {item.name}
                </h1>
                <button  className="bg-indigo-600 px-3 md:px-6 py-2 rounded capitalize">
                  <Link to={`category-prodect/${item?.name}`}>Browse collection</Link>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="button-next-slide top-[50%] absolute z-10 w-[40px] h-[40px] bg-black group-hover:left-0 -left-[500px] duration-300 cursor-pointer text-white grid place-items-center">
          <FaArrowRight />
        </div>
        <div className="button-prev-slide top-[50%] absolute z-10  w-[40px] h-[40px] bg-black group-hover:right-0 -right-[500px] duration-300 cursor-pointer text-white grid place-items-center">
          <FaArrowLeft />
        </div>
      </Swiper>
    </div>
  );
};

export default Slider;
