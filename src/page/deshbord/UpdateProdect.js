import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wraper from "./Wraper";
import { TwitterPicker } from "react-color";
import { useGetAllCategoryQuery } from "../../store/services/categoryApi";
import Spiner from "../../components/Spiner";
import { v4 as uuidv4 } from "uuid";
import ShowColor from "../../components/ShowColor";
import ShowSize from "../../components/ShowSize";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  useSingleGetProdectQuery,
  useUpdateProdectMutation,
} from "../../store/services/prodectApi";
import toast from "react-hot-toast";

const UpdateProdect = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    title: "",
    category: "",
    discount: 0,
    price: 0,
    stock: 0,
    colors: [],
  });
  const [sizeList, setSizeList] = useState([]);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [value, setValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [size, setSize] = useState([
    //prodect size
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "xxl" },
    { name: "1 year" },
    { name: "2 years" },
    { name: "3 years" },
    { name: "4 years" },
    { name: "5 years" },
  ]);

  const { data, isLoading } = useGetAllCategoryQuery();
  const { data: singleData } = useSingleGetProdectQuery(id);
  const [update,{error,isLoading:loding,isSuccess}] = useUpdateProdectMutation();

  //update input api data
  useEffect(() => {
    setState({
      title: singleData?.title,
      category: singleData?.category,
      discount: singleData?.discount,
      price: singleData?.price,
      stock: singleData?.stock,
      colors: singleData?.colors,
    });
    setValue(singleData?.value);
    setSizeList(singleData?.size);
  }, [singleData, id]);

  const navigate = useNavigate();


  //error message
  useEffect(() => {
    error && toast.error(error?.data?.message);
  }, [error]);

  //error message
  useEffect(() => {
    if (isSuccess) {
      toast.success("Prodect Update Successfull");
      navigate("/deshbord/products");
    }
  }, [isSuccess]);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const hanldeColor = (color) => {
    const filterColor = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filterColor, { color: color.hex, id: uuidv4() }],
    });
  };

  const removeColor = (color) => {
    const remove = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: remove });
  };

  const choseSize = (sizeObject) => {
    const filterSize = sizeList.filter((item) => item.name !== sizeObject.name);
    setSizeList([...filterSize, sizeObject]);
  };

  const removeSize = (size) => {
    const remove = sizeList.filter((item) => item.name !== size);
    setSizeList(remove);
  };

  //submit form
  const hanldeForm =  (e) => {
    e.preventDefault();

    //input validation
    if (
      !state.title ||
      !state.price ||
      !state.category ||
      !state.discount ||
      !state.stock ||
      !value ||
      !state.colors.length ||
      !sizeList.length
    ) {
      setErrorMsg("all field is required");
      return;
    }

    if (
      (image1 && image1.type !== "image/jpg" &&
      image1 && image1.type !== "image/jpeg" &&
      image1 &&  image1.type !== "image/png") ||
      (image2 && image2.type !== "image/jpg" &&
        image2 && image2.type !== "image/jpeg" &&
        image2 && image2.type !== "image/png") ||
      (image3 && image3.type !== "image/jpg" &&
        image3 && image3.type !== "image/jpeg" &&
        image3 && image3.type !== "image/png")
    ) {
      setErrorMsg("Only Allow Jpg Jpeg and Png");
      return;
    }

    //hanlde data
    const formData = new FormData();
    formData.append("title", state.title);
    formData.append("category", state.category);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("stock", state.stock);
    formData.append("colors", JSON.stringify(state.colors));
    formData.append("value", value);
    formData.append("size", JSON.stringify(sizeList));
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);

    // submit form data
     update({id,formData});

    //clear error message
    setErrorMsg("");
  };

  return (
    <Wraper>
      <ScreenHeader>
        <Link to="/deshbord/products" className="btn-dark">
          products add
        </Link>
      </ScreenHeader>

      {/* create prodects */}
      <form onSubmit={hanldeForm}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="">
            <div className="mb-6">
              <label htmlFor="" className="text-gray-400 text">
                Name
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInput}
                value={state.title}
                placeholder="Name..."
                className={`w-full p-2 bg-gray-900 focus:outline-none mt-2 rounded `}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="" className="text-gray-400 ">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                onChange={handleInput}
                value={state.discount}
                placeholder="Discount..."
                className="w-full p-2 bg-gray-900 focus:outline-none mt-2 rounded"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="" className="text-gray-400">
                Category
              </label>
              {!isLoading ? (
                <select
                  name="category"
                  onChange={handleInput}
                  value={state.category}
                  className="w-full p-2 bg-gray-900 focus:outline-none mt-2 rounded"
                >
                  <option value="">Chose Category</option>
                  {data?.map((item) => (
                    <option
                      value={item.name}
                      className="font-base mt-2 capitalize p-3"
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              ) : (
                <Spiner />
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="" className="text-gray-400 ">
                Chose Size
              </label>
              <div className="flex flex-wrap gap-x-2 gap-y-3 mt-2">
                {size.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-400 px-3 py-1 text-gray-400 rounded cursor-pointer"
                    onClick={() => choseSize(item)}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="">
            <div className="mb-6">
              <label htmlFor="" className="text-gray-400 ">
                Price
              </label>
              <input
                type="number"
                name="price"
                onChange={handleInput}
                value={state.price}
                placeholder="Price..."
                className="w-full p-2 bg-gray-900 focus:outline-none mt-2 rounded"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="" className="text-gray-400 ">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                onChange={handleInput}
                value={state.stock}
                placeholder="Stock..."
                className="w-full p-2 bg-gray-900 focus:outline-none mt-2 rounded"
              />
            </div>

            <div className="">
              <span className="text-gray-400">Chose Color</span>
              <TwitterPicker onChangeComplete={hanldeColor} className="mt-3" />
            </div>
          </div>

          <div>
            <ShowColor color={state.colors} removeColor={removeColor} />
            <ShowSize sizeList={sizeList} removeSize={removeSize} />
            {/* show image */}
            {image1 && (
              <div className="text-gray-400 font-semibold mb-2">
                select image
              </div>
            )}
            {image1 && (
              <img
                src={URL.createObjectURL(image1)}
                alt="first image"
                className="h-[200px] w-full object-fill mb-4 rounded"
              />
            )}
            {image2 && (
              <img
                src={URL.createObjectURL(image2)}
                alt="second image"
                className="h-[200px] w-full object-fill mb-4 rounded"
              />
            )}
            {image3 && (
              <img
                src={URL.createObjectURL(image3)}
                alt="third image"
                className="h-[200px] w-full object-fill mb-4 rounded"
              />
            )}
          </div>
        </div>
        <div className="md:w-[400px] lg:w-[600px]">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>

        {/* error message */}
        {errorMsg ? (
          <div className="md:w-[400px] lg:w-[600px]">
            <div className="mt-6 text-semibold uppercase rounded text-red-600 border border-red-500 px-3  py-3 w-full">
              {errorMsg}
            </div>
          </div>
        ) : null}

        <button
          type="submit"
          defaultValue={loding}
          className="bg-indigo-700 block px-6 py-3 font-semibold capitalize rounded mt-10"
        >
          {loding ? "Pending..." : "Update Product"}
        </button>
      </form>
    </Wraper>
  );
};

export default UpdateProdect;
