import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cartItem: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    cartTotalQty: 0,
    cartTotalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const check = state.cartItem.find(
        (item) => item._id === action.payload._id
      );
      if (!check) {
        state.cartItem.push(action.payload);
        toast.success(`${action.payload.title} is Add to cart`,{
          position:"top-right",
          className:"px-8 py-2 border border-green-500 capitalize font-medium"
        });

        //add local storage
        localStorage.setItem("cart", JSON.stringify(state.cartItem));
      } else {
        toast.error(`${action.payload.title} Already is in cart`,{
          position:"top-right",
          className:"capitalize font-medium border border-red-500 px-8 py-2"
        });
        return;
      }
    },

    incrementCart: (state, action) => {
      const itemIndex = state.cartItem.findIndex(
        (cart) => cart._id === action.payload._id
      );
      state.cartItem[itemIndex].quantaty += 1;

      //add local storage
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    decrementCart: (state, action) => {
      const itemIndex = state.cartItem.findIndex(
        (cart) => cart._id === action.payload._id
      );
      if (state.cartItem[itemIndex].quantaty > 1) {
        state.cartItem[itemIndex].quantaty -= 1;
      }
      //add local storage
      localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload
      );
     //add local storage
     localStorage.setItem("cart", JSON.stringify(state.cartItem));
    },

    getTotal:(state,action)=>{
    const { total,quantatys } = state.cartItem.reduce((cartTotal,cartItems)=>{

     

        const { price,quantaty,discount } = cartItems
         const parsent =discount / 100;
      const discountPrice = price - price * parsent;
        const itemTotal =discountPrice * quantaty;
        cartTotal.total += itemTotal
        cartTotal.quantatys += quantaty

        return cartTotal;

      },{
        total:0,
        quantatys:0
      })

      state.cartTotalQty = quantatys;
      state.cartTotalPrice = total
      console.log("-->",state.cartTotalPrice)
      
    },

    emptyCart:(state,action)=>{
      state.cartItem = [];
      state.cartTotalPrice = 0;
      state.cartTotalQty = 0;
      localStorage.removeItem("cart")
    }
    


  },
});

export const { addToCart, incrementCart, decrementCart, removeCart,getTotal,emptyCart } =
  cartReducer.actions;
export default cartReducer.reducer;
