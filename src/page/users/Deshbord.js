import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import AccountList from "../../components/AccountList";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useVarifayPaymentQuery } from "../../store/services/paymentApi";
import toast from "react-hot-toast";
import { emptyCart } from "../../store/features/cartReducer";
import Navber from "../../components/Navber";

const Deshbord = () => {
  const { user } = useSelector((state) => state.auth);
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = params.get("session_id");
  const { data, isSuccess } = useVarifayPaymentQuery(id, {
    skip: id ? false : true,
  });
console.log("id user",id)
  useEffect(() => {
    if (isSuccess) {
      dispatch(emptyCart());
      toast.success("your payment successfull",{
        position:"top-right",
        className:"border border-green-500 px-6 py-3 text-md font-medium"
      });
      navigate("/user-order");
    }
  }, [isSuccess]);

  return (
    <div>
      <Navber />
      <Header>
        <h1>my account</h1>
      </Header>

      <div className="grid grid-cols-[1fr_3fr] gap-4 container mx-auto p-6">
        <div className="">
          <AccountList />
        </div>
        <div className="">
          <h1 className="text-xl font-semibold mb-1">Name</h1>
          <h3 className="font-medium capitalize">{user?.name}</h3>
        </div>
      </div>

    </div>
  );
};

export default Deshbord;
