import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "../page/auth/AdminLogin";
import { Toaster } from "react-hot-toast";
import Prodects from "../page/deshbord/Prodects";
import Private from "./Private";
import Catagores from "../page/deshbord/Catagores";
import CreateCategory from "../page/deshbord/CreateCategory";
import EditCategory from "../page/deshbord/EditCategory";
import CreateProdect from "../page/deshbord/CreateProdect";
import View from "../page/deshbord/View";
import UpdateProdect from "../page/deshbord/UpdateProdect";
import Home from "../page/home/Home";
import Login from "../page/home/auth/Login";
import Navber from "../components/Navber";
import Reguster from "../page/home/auth/Reguster";
import Deshbord from "../page/users/Deshbord";
import UserRoute from "./UserRoute";
import CatProdect from "../page/home/CatProdect";
import ProdectDetailes from "../page/home/ProdectDetailes";
import SearchProdect from "../page/home/SearchProdect";
import Cart from "../page/home/Cart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotal } from "../store/features/cartReducer";
import Order from "../page/deshbord/Order";
import OrderDetails from "../page/deshbord/OrderDetails";
import UserOrder from "../page/users/UserOrder";
import Details from "../page/users/Details";
import Customer from "../page/deshbord/Customer";
import NotFoundPage from "../components/NotFoundPage";

const Routing = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);
  return (
    <Router>
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reguster" element={<Reguster />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category-prodect/:name" element={<CatProdect />} />
        <Route path="/search-prodect/:keyword" element={<SearchProdect />} />
        <Route path="/prodect-details/:id" element={<ProdectDetailes />} />
        <Route element={<UserRoute />}>
          <Route path="/user" element={<Deshbord />} />
          <Route path="/user-order" element={<UserOrder />} />
          <Route path="/userOrder-details/:id" element={<Details />} />
        </Route>

        <Route path="auth">
          <Route path="admin-login" element={<AdminLogin />} />
        </Route>
        <Route path="deshbord">
          <Route
            path="products"
            element={
              <Private>
                <Prodects />
              </Private>
            }
          />
          <Route
            path="create-products"
            element={
              <Private>
                <CreateProdect />
              </Private>
            }
          />
          <Route
            path="view-products/:id"
            element={
              <Private>
                <View />
              </Private>
            }
          />
          <Route
            path="update-products/:id"
            element={
              <Private>
                <UpdateProdect />
              </Private>
            }
          />
          <Route
            path="catagores"
            element={
              <Private>
                <Catagores />
              </Private>
            }
          />
          <Route
            path="create-category"
            element={
              <Private>
                <CreateCategory />
              </Private>
            }
          />
          <Route
            path="edit-category/:id"
            element={
              <Private>
                <EditCategory />
              </Private>
            }
          />

          <Route
            path="order"
            element={
              <Private>
                <Order />
              </Private>
            }
          />

          <Route
            path="order-details/:id"
            element={
              <Private>
                <OrderDetails />
              </Private>
            }
          />

          <Route
            path="customer"
            element={
              <Private>
                <Customer />
              </Private>
            }
          />
        </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        
      </Routes>
    </Router>
  );
};

export default Routing;
