import { productSource } from "./firebaseConnect";

var redux = require("redux");

const InitialState = {
  productItem: [],
  cart: [],
};

const allReducer = (state = InitialState, action) => {
  const product = action.payload;
  switch (action.type) {
    case "GET_PRODUCT":
      return { ...state, productItem: action.getItem };

    case "ADD_ITEM":
      const productExist = state.cart.find((x) => x.id === product.id);
      if (productExist) {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...product, qty: 1 }],
        };
      }

    case "DEL_ITEM":
      const productExist1 = state.cart.find((x) => x.id === product.id);
      // if qty = 1, filter cart
      if (productExist1.qty === 1) {
        return {
          ...state,
          cart: state.cart.filter((x) => x.id !== product.id),
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((x) =>
            x.id === product.id ? { ...x, qty: x.qty - 1 } : x
          ),
        };
      }

    default:
      return state;
  }
};

var Store = redux.createStore(allReducer);
Store.subscribe(function () {
  console.log(JSON.stringify(Store.getState()));
});

export default Store;
