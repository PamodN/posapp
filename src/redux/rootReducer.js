// src/redux/rootReducer.js

import { message } from "antd";

// Initial state for rootReducer
const initialState = {
  loading: false,
  cartItems: [],
};

// Reducer function for rootReducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SHOW_LOADING":
      return{
        ...state,
        loading:true,
      }
      case "HIDE_LOADING":
        return{
          ...state,
          loading:false,
        }
    /*     case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      }; */
    case "ADD_TO_CART":
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
    
      if (existingItem) {
        // If the item already exists in the cart, increment the quantity
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
              ),
        };
      } else {
        // If the item doesn't exist, add it to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
       
      }
      case "UPDATE_CART":
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: action.payload.quantity } // Corrected this line
              : item
          
              ),
          
        };

        case "DELETE_FROM_CART":
          return{
            ...state,
            cartItems: state.cartItems.filter(
              item => item._id !== action.payload._id )
          }
      
    default:
      return state;
  }
};

export default rootReducer;
